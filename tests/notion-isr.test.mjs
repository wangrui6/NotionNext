import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'
import ts from 'typescript'

const quietConsole = { log() {}, warn() {}, error() {}, debug() {} }

// Compile the real application modules with their existing TypeScript dependency.
// Only external boundaries are mocked; exports and cache control flow run unchanged.
function loadModule(modulePath, mocks, env = {}) {
  const filename = new URL(`../${modulePath}`, import.meta.url)
  const source = fs.readFileSync(filename, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.React
    }
  })
  const module = { exports: {} }
  const requireMock = name => {
    assert.ok(name in mocks, `Unexpected dependency ${name} in ${modulePath}`)
    return mocks[name]
  }
  vm.runInThisContext(
    `(function(require, module, exports, console, process, __dirname) {${outputText}\n})`,
    { filename: filename.pathname }
  )(requireMock, module, module.exports, quietConsole, { env }, path.dirname(fileURLToPath(filename)))
  return module.exports
}

function databaseResponse(ids = ['post-id']) {
  return {
    block: {
      'database-id': {
        value: {
          id: 'database-id',
          type: 'collection_view_page',
          collection_id: 'collection-id',
          view_ids: ['view-id']
        }
      },
      ...Object.fromEntries(ids.map(id => [id, { value: { id, type: 'page' } }]))
    },
    collection: { 'collection-id': { value: { id: 'collection-id', schema: {} } } },
    collection_view: { 'view-id': { value: { id: 'view-id', type: 'table' } } },
    collection_query: {
      'collection-id': {
        'view-id': { collection_group_results: { blockIds: ids, hasMore: false } }
      }
    }
  }
}

function siteHarness(getPage) {
  const writes = []
  const blog = {
    NOTION_PAGE_ID: 'database-id',
    NOTION_PROPERTY_NAME: { tags: 'tags', category: 'category' },
    ENABLE_CACHE: 'true',
    isProd: false
  }
  const cacheBackend = {
    getCache: async () => null,
    setCache: async (key, value) => writes.push({ key, value })
  }
  const cache = loadModule('lib/cache/cache_manager.js', {
    '@/blog.config': { default: blog },
    './local_file_cache': { default: cacheBackend },
    './memory_cache': { default: cacheBackend },
    './redis_cache': { default: cacheBackend }
  })
  const pageIds = loadModule('lib/notion/getAllPageIds.js', {})
  const postBlocks = { getPage, fetchInBatches: async () => ({}) }
  const tags = { getAllTags: () => [] }
  const site = loadModule('lib/db/getSiteData.js', {
    '@/blog.config': { default: blog },
    '@/lib/cache/cache_manager': cache,
    '@/lib/notion/getAllCategories': { getAllCategories: () => [] },
    '@/lib/notion/getAllPageIds': pageIds,
    '@/lib/notion/getAllTags': tags,
    '../notion/getAllTags': tags,
    '../notion/getNotionPost': {},
    '@/lib/notion/getNotionConfig': { getConfigMapFromConfigPage: async () => ({}) },
    '@/lib/notion/getPageProperties': {
      default: async id => ({
        id,
        title: 'A real published post',
        slug: 'real-post',
        type: 'Post',
        status: 'Published',
        tagItems: []
      }),
      adjustPageProperties() {}
    },
    '@/lib/notion/getPostBlocks': postBlocks,
    '../notion/getPostBlocks': postBlocks,
    '@/lib/notion/mapImage': { compressImage: value => value, mapImgUrl: value => value },
    '@/lib/utils': { deepClone: value => JSON.parse(JSON.stringify(value)) },
    'notion-utils': { idToUuid: value => value },
    '../config': { siteConfig: (_key, fallback) => fallback },
    '../utils/pageId': {
      extractLangId: value => value,
      extractLangPrefix: () => '',
      getShortId: value => value
    }
  })
  return { site, writes }
}

test('getGlobalData returns real published content and permits caching successful data', async () => {
  const { site, writes } = siteHarness(async () => databaseResponse())
  const data = await site.getGlobalData({ from: 'isr-test' })
  assert.equal(data.allPages[0].title, 'A real published post')
  assert.equal(data.postCount, 1)
  assert.equal(writes.length, 1)
  assert.equal(writes[0].key, 'site_data_database-id')
  assert.equal(data.block, undefined)
  assert.ok(writes[0].value.block, 'client cleanup must not mutate cached data')
})

test('getGlobalData rejects transport failures instead of returning an oops placeholder', async () => {
  const outage = new Error('Notion unavailable')
  const { site, writes } = siteHarness(async () => { throw outage })
  await assert.rejects(site.getGlobalData({}), error => error === outage)
  assert.equal(writes.length, 0)
})

test('a failed refresh leaves the last successfully cached site data unchanged', async () => {
  let fail = false
  const { site, writes } = siteHarness(async () => fail ? null : databaseResponse())
  await site.getGlobalData({})
  const lastGood = writes[0].value
  fail = true

  await assert.rejects(site.getGlobalData({}), /Unable to refresh Notion database/)
  assert.equal(writes.length, 1)
  assert.equal(writes[0].value, lastGood)
  assert.equal(lastGood.allPages[0].title, 'A real published post')
})

test('exhausted Notion retries cannot cache empty site data through either exported entry point', async () => {
  const { site, writes } = siteHarness(async () => null)
  await assert.rejects(
    site.getSiteDataByPageId({ pageId: 'database-id' }),
    /Unable to refresh Notion database/
  )
  await assert.rejects(site.getGlobalData({}), /Unable to refresh Notion database/)
  assert.equal(writes.length, 0)
})

test('a denied root or a swallowed collection query failure rejects without a cache write', async () => {
  for (const response of [
    { block: {} },
    { ...databaseResponse(), collection_query: {} },
    { ...databaseResponse(), collection: {} }
  ]) {
    const { site, writes } = siteHarness(async () => response)
    await assert.rejects(
      site.getGlobalData({}),
      /not an accessible database|Incomplete Notion database response/
    )
    assert.equal(writes.length, 0)
  }
})

test('a genuinely empty database query is still a successful refresh', async () => {
  const { site, writes } = siteHarness(async () => databaseResponse([]))
  const data = await site.getGlobalData({})
  assert.deepEqual(data.allPages, [])
  assert.equal(data.postCount, 0)
  assert.equal(writes.length, 1)
})

function homeHarness(lifecycle, getGlobalData) {
  const writes = []
  const generate = name => async () => writes.push(name)
  const home = loadModule('pages/index.js', {
    '@/blog.config': { default: { NEXT_REVALIDATE_SECOND: 60 } },
    '@/lib/config': {
      siteConfig: (key, fallback) => key === 'UUID_REDIRECT' ? true : fallback
    },
    '@/lib/db/getSiteData': { getGlobalData },
    '@/lib/robots.txt': { generateRobotsTxt: generate('robots') },
    '@/lib/rss': { generateRss: generate('rss') },
    '@/lib/sitemap.xml': { generateSitemapXml: generate('sitemap') },
    '@/lib/redirect': { generateRedirectJson: generate('redirect') },
    '@/themes/theme': {}
  }, { npm_lifecycle_event: lifecycle })
  return { home, writes }
}

test('homepage runtime regeneration performs no filesystem generation', async () => {
  const { home, writes } = homeHarness('start', async () => ({ allPages: [] }))
  const result = await home.getStaticProps({})
  assert.equal(result.revalidate, 60)
  assert.deepEqual(writes, [])
})

test('homepage build still generates public files and propagates refresh failures', async () => {
  const build = homeHarness('build', async () => ({ allPages: [] }))
  await build.home.getStaticProps({})
  assert.deepEqual(build.writes, ['robots', 'rss', 'redirect'])

  const outage = new Error('Notion unavailable')
  const runtime = homeHarness('start', async () => { throw outage })
  await assert.rejects(runtime.home.getStaticProps({}), error => error === outage)
  assert.deepEqual(runtime.writes, [])
})

test('only static exports generate a sitemap file, leaving normal builds to the dynamic route', async () => {
  const staticExport = homeHarness('export', async () => ({ allPages: [] }))
  await staticExport.home.getStaticProps({})
  assert.deepEqual(staticExport.writes, ['robots', 'rss', 'sitemap', 'redirect'])

  const developmentBuild = homeHarness('build-all-in-dev', async () => ({ allPages: [] }))
  await developmentBuild.home.getStaticProps({})
  assert.deepEqual(developmentBuild.writes, ['robots', 'rss', 'redirect'])
})

test('Next config removes stale sitemaps during builds without deleting files on runtime reload', () => {
  for (const lifecycle of ['build', 'build-all-in-dev', 'export', 'start', undefined]) {
    const removed = []
    loadModule('next.config.js', {
      './blog.config': { THEME: 'nobelium', LANG: 'en-US', NOTION_PAGE_ID: 'database-id' },
      fs: {
        readdirSync: () => [],
        existsSync: () => true,
        unlinkSync: filename => removed.push(filename)
      },
      path,
      './lib/utils/pageId': { extractLangPrefix: () => '' },
      '@next/bundle-analyzer': () => value => value
    }, { npm_lifecycle_event: lifecycle })

    const shouldClean = ['build', 'build-all-in-dev', 'export'].includes(lifecycle)
    assert.equal(removed.length, shouldClean ? 2 : 0, `lifecycle ${lifecycle}`)
    if (shouldClean) {
      assert.ok(removed[0].endsWith('/public/sitemap.xml'))
      assert.ok(removed[1].endsWith('/sitemap.xml'))
    }
  }
})

function postHarness(getPage, cachedPage = null) {
  const writes = []
  const delays = []
  const post = loadModule('lib/notion/getPostBlocks.js', {
    '@/blog.config': { default: { NOTION_PAGE_ID: 'database-id' } },
    '@/lib/cache/cache_manager': {
      getDataFromCache: async key => key.startsWith('page_block_') ? cachedPage : null,
      getOrSetDataWithCache: async (_key, fetch, ...args) => fetch(...args),
      setDataToCache: async (key, data) => writes.push({ key, data })
    },
    '../utils': {
      deepClone: value => JSON.parse(JSON.stringify(value)),
      delay: async milliseconds => delays.push(milliseconds)
    },
    '@/lib/notion/getNotionAPI': { default: { getPage } }
  })
  return { post, writes, delays }
}

test('article getPage retries three times then rejects without publishing empty content', async () => {
  let calls = 0
  const { post, writes, delays } = postHarness(async () => {
    calls++
    throw new Error('Notion unavailable')
  })

  await assert.rejects(post.getPage('post-id', 'slug'), /Unable to refresh Notion page post-id/)
  assert.equal(calls, 3)
  assert.equal(delays.length, 3)
  assert.deepEqual(writes, [])
})

test('article retries still recover and permit a genuinely empty article', async () => {
  let calls = 0
  const emptyArticle = { block: { 'post-id': { value: { id: 'post-id', type: 'page', content: [] } } } }
  const { post } = postHarness(async () => {
    if (++calls === 1) throw new Error('Temporary Notion outage')
    return emptyArticle
  })

  const result = await post.getPage('post-id', 'slug')
  assert.equal(calls, 2)
  assert.equal(result.block['post-id'].value.type, 'page')
  assert.deepEqual(result.block['post-id'].value.content, [])
})

test('article retry fallback can still return an available last-good block cache', async () => {
  const cachedPage = { block: { 'post-id': { value: { id: 'post-id', type: 'page' } } } }
  const { post } = postHarness(async () => { throw new Error('Notion unavailable') }, cachedPage)
  assert.equal(await post.getPageWithRetry('post-id', 'slug'), cachedPage)
})

function postUtilityHarness() {
  let requests = 0
  const utilities = loadModule('lib/utils/post.js', {
    '.': { checkStartWithHttp: value => /^https?:/.test(value) },
    '@/lib/db/getSiteData': { getPostBlocks: async () => { requests++; return null } },
    '@/lib/notion/getPageTableOfContents': {},
    '@/lib/config': { siteConfig: (_key, fallback) => fallback },
    '@/lib/cache/cache_manager': {},
    '@/pages/search/[keyword]': {},
    '@/lib/plugins/aiSummary': {},
    '@/blog.config': { default: {} },
    '@/lib/plugins/algolia': {},
    '@/lib/plugins/wordCount': {}
  })
  return { utilities, requestCount: () => requests }
}

test('production slug guards exclude placeholder and malformed rows from static paths', () => {
  const { utilities } = postUtilityHarness()
  const checks = [
    utilities.checkSlugHasNoSlash,
    utilities.checkSlugHasOneSlash,
    utilities.checkSlugHasMorThanTwoSlash
  ]
  for (const check of checks) {
    for (const row of [null, {}, { id: 1, slug: 'oops', type: 'Post' },
      { id: 'a'.repeat(32), slug: null, type: 'Post' },
      { id: 'a'.repeat(32), slug: 'article/title', type: null }]) {
      assert.equal(check(row), false)
    }
  }
})

test('production slug guards preserve valid article routing depths', () => {
  const { utilities } = postUtilityHarness()
  const row = { id: 'aa49da4e-8f03-4687-b568-1df64568d5e2', type: 'Post' }
  assert.equal(utilities.checkSlugHasNoSlash({ ...row, slug: 'title' }), true)
  assert.equal(utilities.checkSlugHasOneSlash({ ...row, slug: 'article/title' }), true)
  assert.equal(utilities.checkSlugHasMorThanTwoSlash({ ...row, slug: '2026/tech/title' }), true)
  assert.equal(utilities.checkSlugHasNoSlash({ ...row, slug: 'article/title' }), false)
})

test('production post guard never fetches Notion content for a placeholder ID', async () => {
  const { utilities, requestCount } = postUtilityHarness()
  const props = { post: { id: 1, slug: 'oops' }, allPages: [] }
  await utilities.processPostData(props, 'test')
  assert.equal(requestCount(), 0)
  assert.equal(props.prev, null)
  assert.equal(props.next, null)
  assert.deepEqual(props.recommendPosts, [])
  assert.equal(props.allPages, undefined)
})
