// Restored from the production SEO implementation (build C30-T5m9JX8otqbuFrZMZ).
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
const stripTrailingSlash = e =>
  e && '/' !== e ? e.replace(/\/+$/, '') : e || ''
const getBaseUrl = function () {
  for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
    t[n] = arguments[n]
  for (let e of t) {
    let t = stripTrailingSlash(e)
    if (t) return t
  }
  return ''
}
const normalizeText = e =>
  'string' == typeof e ? e.replace(/\s+/g, ' ').trim() : ''
const absoluteUrl = function (e) {
  let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ''
  if (!e) return ''
  if (/^https?:\/\//i.test(e)) return e
  if (e.startsWith('//')) return 'https:'.concat(e)
  let n = stripTrailingSlash(t)
  return n
    ? e.startsWith('/')
      ? ''.concat(n).concat(e)
      : ''.concat(n, '/').concat(e.replace(/^\/+/, ''))
    : e
}
const joinUrl = function (e) {
  let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
    n = stripTrailingSlash(e)
  if (!n) return ''
  if (!t || '/' === t) return n
  if (/^https?:\/\//i.test(t)) return stripTrailingSlash(t)
  let o = String(t).split(/[?#]/)[0].replace(/^\/+/, '')
  return ''.concat(n, '/').concat(o)
}
const parseDate = e => {
  if (null == e || '' === e) return null
  let t = e instanceof Date ? e : new Date('number' == typeof e ? e : String(e))
  return Number.isNaN(t.getTime()) ? null : t
}
const toIsoDate = e => {
  let t = parseDate(e)
  return t ? t.toISOString() : void 0
}
const getPublishedDate = e => {
  var t
  return (
    null == e
      ? void 0
      : null === (t = e.date) || void 0 === t
        ? void 0
        : t.start_date
  )
    ? e.date.start_date
    : (null == e ? void 0 : e.publishDate) ||
        (null == e ? void 0 : e.publishDay)
}
const getModifiedDate = e =>
  (null == e ? void 0 : e.lastEditedDate) ||
  (null == e ? void 0 : e.lastEditedTime) ||
  (null == e ? void 0 : e.last_edited_time) ||
  getPublishedDate(e)
const getPublishedTime = e => toIsoDate(getPublishedDate(e))
const getModifiedTime = e => toIsoDate(getModifiedDate(e))
const getTwitterHandle = e => {
  if (!e || 'string' != typeof e) return ''
  let t = e.trim()
  if (t.startsWith('@')) return t
  try {
    let e = new URL(t).pathname.split('/').filter(Boolean)[0]
    return e ? '@'.concat(e.replace(/^@+/, '')) : ''
  } catch (e) {
    return ''
  }
}
const getAuthorName = e =>
  normalizeText(e).replace(RegExp("[^\\p{L}\\p{N}\\s.'-]", 'gu'), '') ||
  normalizeText(e)
const uniqueValues = e => [...new Set((e || []).filter(Boolean))]
const getSEOMeta = (props, router, locale) => {
  var o, r, s, i, a, l, c, u, d, m, p, f
  let { post, siteInfo, tag, category, page } = props,
    keyword =
      (null == router
        ? void 0
        : null === (o = router.query) || void 0 === o
          ? void 0
          : o.keyword) ||
      (null == router
        ? void 0
        : null === (r = router.query) || void 0 === r
          ? void 0
          : r.s),
    homeTitle = siteConfig('SEO_HOME_TITLE'),
    homeDescription = siteConfig('SEO_HOME_DESCRIPTION')
  switch (router.route) {
    case '/':
      return {
        title:
          homeTitle ||
          ''
            .concat(null == siteInfo ? void 0 : siteInfo.title, ' | ')
            .concat(null == siteInfo ? void 0 : siteInfo.description),
        description:
          homeDescription ||
          ''.concat(null == siteInfo ? void 0 : siteInfo.description),
        image:
          (null == siteInfo ? void 0 : siteInfo.pageCover) || '/bg_image.jpg',
        slug: '',
        type: 'website'
      }
    case '/archive':
      return {
        title: ''
          .concat(
            (null == locale
              ? void 0
              : null === (s = locale.NAV) || void 0 === s
                ? void 0
                : s.ARCHIVE) || 'Archive',
            ' | '
          )
          .concat(null == siteInfo ? void 0 : siteInfo.title),
        description: ''.concat(
          null == siteInfo ? void 0 : siteInfo.description
        ),
        image:
          (null == siteInfo ? void 0 : siteInfo.pageCover) || '/bg_image.jpg',
        slug: 'archive',
        type: 'website'
      }
    case '/page/[page]':
      return {
        title: ''
          .concat(page, ' | Page | ')
          .concat(null == siteInfo ? void 0 : siteInfo.title),
        description: ''.concat(
          null == siteInfo ? void 0 : siteInfo.description
        ),
        image:
          (null == siteInfo ? void 0 : siteInfo.pageCover) || '/bg_image.jpg',
        slug: 'page/' + page,
        type: 'website'
      }
    case '/category/[category]':
      return {
        title: ''
          .concat(category, ' | ')
          .concat(
            (null == locale
              ? void 0
              : null === (i = locale.COMMON) || void 0 === i
                ? void 0
                : i.CATEGORY) || 'Category',
            ' | '
          )
          .concat(null == siteInfo ? void 0 : siteInfo.title),
        description: 'Browse '
          .concat(category, ' essays on ')
          .concat(null == siteInfo ? void 0 : siteInfo.title, '.'),
        slug: 'category/' + category,
        image:
          (null == siteInfo ? void 0 : siteInfo.pageCover) || '/bg_image.jpg',
        type: 'website'
      }
    case '/category/[category]/page/[page]':
      return {
        title: ''
          .concat(category, ' | ')
          .concat(
            (null == locale
              ? void 0
              : null === (a = locale.COMMON) || void 0 === a
                ? void 0
                : a.CATEGORY) || 'Category',
            ' | '
          )
          .concat(null == siteInfo ? void 0 : siteInfo.title),
        description: 'Browse more '
          .concat(category, ' essays on ')
          .concat(null == siteInfo ? void 0 : siteInfo.title, '.'),
        slug: 'category/' + category + '/page/' + page,
        image:
          (null == siteInfo ? void 0 : siteInfo.pageCover) || '/bg_image.jpg',
        type: 'website'
      }
    case '/tag/[tag]':
      return {
        title: ''
          .concat(tag, ' | ')
          .concat(
            (null == locale
              ? void 0
              : null === (l = locale.COMMON) || void 0 === l
                ? void 0
                : l.TAGS) || 'Tags',
            ' | '
          )
          .concat(null == siteInfo ? void 0 : siteInfo.title),
        description: 'Explore posts tagged '
          .concat(tag, ' on ')
          .concat(null == siteInfo ? void 0 : siteInfo.title, '.'),
        image:
          (null == siteInfo ? void 0 : siteInfo.pageCover) || '/bg_image.jpg',
        slug: 'tag/' + tag,
        type: 'website'
      }
    case '/tag/[tag]/page/[page]':
      return {
        title: ''
          .concat(tag, ' | ')
          .concat(
            (null == locale
              ? void 0
              : null === (c = locale.COMMON) || void 0 === c
                ? void 0
                : c.TAGS) || 'Tags',
            ' | '
          )
          .concat(null == siteInfo ? void 0 : siteInfo.title),
        description: 'Explore more posts tagged '
          .concat(tag, ' on ')
          .concat(null == siteInfo ? void 0 : siteInfo.title, '.'),
        image:
          (null == siteInfo ? void 0 : siteInfo.pageCover) || '/bg_image.jpg',
        slug: 'tag/' + tag + '/page/' + page,
        type: 'website'
      }
    case '/search':
      return {
        title: ''
          .concat(keyword || '')
          .concat(keyword ? ' | ' : '')
          .concat(
            (null == locale
              ? void 0
              : null === (u = locale.NAV) || void 0 === u
                ? void 0
                : u.SEARCH) || 'Search',
            ' | '
          )
          .concat(null == siteInfo ? void 0 : siteInfo.title),
        description: 'Search essays and notes on '.concat(
          null == siteInfo ? void 0 : siteInfo.title,
          '.'
        ),
        image:
          (null == siteInfo ? void 0 : siteInfo.pageCover) || '/bg_image.jpg',
        slug: 'search',
        type: 'website'
      }
    case '/search/[keyword]':
    case '/search/[keyword]/page/[page]':
      return {
        title: ''
          .concat(keyword || '')
          .concat(keyword ? ' | ' : '')
          .concat(
            (null == locale
              ? void 0
              : null === (d = locale.NAV) || void 0 === d
                ? void 0
                : d.SEARCH) || 'Search',
            ' | '
          )
          .concat(null == siteInfo ? void 0 : siteInfo.title),
        description: 'Search results for '
          .concat(keyword || 'all posts', ' on ')
          .concat(null == siteInfo ? void 0 : siteInfo.title, '.'),
        image:
          (null == siteInfo ? void 0 : siteInfo.pageCover) || '/bg_image.jpg',
        slug: 'search/' + (keyword || ''),
        type: 'website'
      }
    case '/404':
      return {
        title: ''
          .concat(null == siteInfo ? void 0 : siteInfo.title, ' | ')
          .concat(
            (null == locale
              ? void 0
              : null === (m = locale.NAV) || void 0 === m
                ? void 0
                : m.PAGE_NOT_FOUND) || 'Page Not Found'
          ),
        description: ''.concat(
          null == siteInfo ? void 0 : siteInfo.title,
          ' page not found.'
        ),
        image:
          (null == siteInfo ? void 0 : siteInfo.pageCover) || '/bg_image.jpg',
        type: 'website'
      }
    case '/tag':
      return {
        title: ''
          .concat(
            (null == locale
              ? void 0
              : null === (p = locale.COMMON) || void 0 === p
                ? void 0
                : p.TAGS) || 'Tags',
            ' | '
          )
          .concat(null == siteInfo ? void 0 : siteInfo.title),
        description: 'Explore topic clusters on '.concat(
          null == siteInfo ? void 0 : siteInfo.title,
          '.'
        ),
        image:
          (null == siteInfo ? void 0 : siteInfo.pageCover) || '/bg_image.jpg',
        slug: 'tag',
        type: 'website'
      }
    case '/category':
      return {
        title: ''
          .concat(
            (null == locale
              ? void 0
              : null === (f = locale.COMMON) || void 0 === f
                ? void 0
                : f.CATEGORY) || 'Category',
            ' | '
          )
          .concat(null == siteInfo ? void 0 : siteInfo.title),
        description: 'Browse categories on '.concat(
          null == siteInfo ? void 0 : siteInfo.title,
          '.'
        ),
        image:
          (null == siteInfo ? void 0 : siteInfo.pageCover) || '/bg_image.jpg',
        slug: 'category',
        type: 'website'
      }
    default:
      return {
        title: post
          ? ''
              .concat(null == post ? void 0 : post.title, ' | ')
              .concat(null == siteInfo ? void 0 : siteInfo.title)
          : ''.concat(null == siteInfo ? void 0 : siteInfo.title, ' | loading'),
        description: null == post ? void 0 : post.summary,
        type: post ? 'article' : 'website',
        slug: null == post ? void 0 : post.slug,
        image:
          (null == post ? void 0 : post.pageCover) ||
          (null == post ? void 0 : post.pageCoverThumbnail) ||
          (null == siteInfo ? void 0 : siteInfo.pageCover) ||
          '/bg_image.jpg',
        category: null == post ? void 0 : post.category,
        tags: null == post ? void 0 : post.tags
      }
  }
}
const getCanonicalPath = (router, meta) => {
  var n
  let path =
    null == router
      ? void 0
      : null === (n = router.asPath) || void 0 === n
        ? void 0
        : n.split(/[?#]/)[0]
  return path && '/_error' !== path
    ? normalizePath(path)
    : (null == meta ? void 0 : meta.slug)
      ? normalizePath(meta.slug)
      : '/'
}
const normalizePath = e =>
  String(e || '')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
    .replace(/\.html$/i, '') || '/'
const getRobotsContent = route =>
  new Set([
    '/404',
    '/search',
    '/search/[keyword]',
    '/search/[keyword]/page/[page]',
    '/auth',
    '/auth/result',
    '/sign-in/[[...index]]',
    '/sign-up/[[...index]]',
    '/dashboard/[[...index]]',
    '/page/[page]',
    '/category/[category]/page/[page]',
    '/tag/[tag]/page/[page]'
  ]).has(route)
    ? 'noindex,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
    : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
const getStructuredData = options => {
  let {
      props,
      meta,
      canonicalUrl,
      image,
      siteName,
      baseUrl,
      authorName,
      locale,
      publishedTime,
      modifiedTime,
      sameAs
    } = options,
    { post, siteInfo } = props,
    description = normalizeText(
      siteConfig('SEO_HOME_DESCRIPTION') ||
        (null == siteInfo ? void 0 : siteInfo.description)
    ),
    schemas = [
      compactSchema({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': ''.concat(baseUrl, '/#website'),
        name: siteName,
        url: baseUrl,
        description,
        inLanguage: siteConfig('LANG'),
        potentialAction: {
          '@type': 'SearchAction',
          target: joinUrl(baseUrl, 'search/{search_term_string}'),
          'query-input': 'required name=search_term_string'
        }
      }),
      compactSchema({
        '@context': 'https://schema.org',
        '@type':
          (null == meta ? void 0 : meta.type) === 'article'
            ? 'WebPage'
            : isCollectionPage(props, meta)
              ? 'CollectionPage'
              : 'WebPage',
        '@id': ''.concat(canonicalUrl, '#webpage'),
        name: normalizeText(
          (null == meta ? void 0 : meta.title) ||
            (null == post ? void 0 : post.title) ||
            siteName
        ),
        url: canonicalUrl,
        description: normalizeText(
          (null == meta ? void 0 : meta.description) ||
            (null == post ? void 0 : post.summary) ||
            description
        ),
        inLanguage: siteConfig('LANG'),
        isPartOf: {
          '@type': 'WebSite',
          '@id': ''.concat(baseUrl, '/#website'),
          name: siteName,
          url: baseUrl
        },
        primaryImageOfPage: image
          ? {
              '@type': 'ImageObject',
              url: image
            }
          : void 0
      })
    ],
    personSchema = compactSchema({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': ''.concat(baseUrl, '/#person'),
      name: authorName,
      url: baseUrl,
      sameAs: sameAs.length > 0 ? sameAs : void 0,
      knowsAbout: getKeywordList(siteConfig('KEYWORDS'))
    })
  ;(null == personSchema ? void 0 : personSchema.name) &&
    schemas.push(personSchema)
  let itemListSchema = getItemListSchema({
    props,
    baseUrl
  })
  itemListSchema && schemas.push(itemListSchema)
  let breadcrumbSchema = getBreadcrumbSchema({
    props,
    canonicalUrl,
    baseUrl,
    locale
  })
  return (
    breadcrumbSchema && schemas.push(breadcrumbSchema),
    (null == meta ? void 0 : meta.type) === 'article' &&
      post &&
      schemas.push(
        compactSchema({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': ''.concat(canonicalUrl, '#article'),
          headline: normalizeText(null == post ? void 0 : post.title),
          name: normalizeText(null == post ? void 0 : post.title),
          description: normalizeText(
            (null == post ? void 0 : post.summary) ||
              (null == meta ? void 0 : meta.description) ||
              description
          ),
          url: canonicalUrl,
          mainEntityOfPage: canonicalUrl,
          image: image ? [image] : void 0,
          datePublished: publishedTime,
          dateModified: modifiedTime || publishedTime,
          articleSection: normalizeText(null == post ? void 0 : post.category),
          keywords:
            Array.isArray(null == post ? void 0 : post.tags) &&
            post.tags.length > 0
              ? post.tags.join(', ')
              : void 0,
          wordCount: null == post ? void 0 : post.wordCount,
          timeRequired: (null == post ? void 0 : post.readTime)
            ? 'PT'.concat(post.readTime, 'M')
            : void 0,
          isAccessibleForFree: !0,
          inLanguage: siteConfig('LANG'),
          author: compactSchema({
            '@type': 'Person',
            '@id': ''.concat(baseUrl, '/#person'),
            name: authorName,
            url: baseUrl,
            sameAs: sameAs.length > 0 ? sameAs : void 0
          }),
          publisher: compactSchema({
            '@type': 'Organization',
            '@id': ''.concat(baseUrl, '/#organization'),
            name: siteName,
            url: baseUrl,
            sameAs: sameAs.length > 0 ? sameAs : void 0,
            logo: (null == siteInfo ? void 0 : siteInfo.icon)
              ? {
                  '@type': 'ImageObject',
                  url: absoluteUrl(siteInfo.icon, baseUrl)
                }
              : void 0
          })
        })
      ),
    schemas
  )
}
const isCollectionPage = (props, meta) => {
  let route = (null == props ? void 0 : props.route) || ''
  return (
    '/' === route ||
    '/archive' === route ||
    '/category' === route ||
    '/category/[category]' === route ||
    '/category/[category]/page/[page]' === route ||
    '/tag' === route ||
    '/tag/[tag]' === route ||
    '/tag/[tag]/page/[page]' === route ||
    '/page/[page]' === route ||
    (null == meta ? void 0 : meta.slug) === '' ||
    (null == meta ? void 0 : meta.slug) === 'archive' ||
    (null == meta ? void 0 : meta.slug) === 'category' ||
    (null == meta ? void 0 : meta.slug) === 'tag'
  )
}
const getItemListSchema = options => {
  let { props, baseUrl } = options
  if (!isCollectionPage(props, {})) return null
  let entries = getListEntries(props)
    .filter(
      e =>
        ((null == e ? void 0 : e.slug) || (null == e ? void 0 : e.href)) &&
        (null == e ? void 0 : e.title)
    )
    .slice(0, 24)
    .map((e, t) => ({
      '@type': 'ListItem',
      position: t + 1,
      url: joinUrl(baseUrl, e.slug || e.href),
      name: normalizeText(e.title)
    }))
  return 0 === entries.length
    ? null
    : compactSchema({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: entries
      })
}
const getListEntries = props =>
  Array.isArray(null == props ? void 0 : props.posts)
    ? props.posts
    : (null == props ? void 0 : props.archivePosts) &&
        'object' == typeof props.archivePosts
      ? Object.values(props.archivePosts).flat()
      : (null == props ? void 0 : props.route) === '/category' &&
          Array.isArray(null == props ? void 0 : props.categoryOptions)
        ? props.categoryOptions.map(e => ({
            title: null == e ? void 0 : e.name,
            href: 'category/'.concat(
              encodeURIComponent((null == e ? void 0 : e.name) || '')
            )
          }))
        : (null == props ? void 0 : props.route) === '/tag' &&
            Array.isArray(null == props ? void 0 : props.tagOptions)
          ? props.tagOptions.map(e => ({
              title: null == e ? void 0 : e.name,
              href: 'tag/'.concat(
                encodeURIComponent((null == e ? void 0 : e.name) || '')
              )
            }))
          : []
const getKeywordList = e => {
  if (!e || 'string' != typeof e) return
  let t = e
    .split(',')
    .map(e => normalizeText(e))
    .filter(Boolean)
  return t.length > 0 ? t : void 0
}
const getBreadcrumbSchema = options => {
  var t, n, o, r, s
  let { props, canonicalUrl, baseUrl, locale } = options,
    { post, category, tag, page } = props,
    route = (null == props ? void 0 : props.route) || '',
    breadcrumbs = [
      {
        name: 'Home',
        item: baseUrl
      }
    ]
  switch (route) {
    case '/archive':
      breadcrumbs.push({
        name:
          (null == locale
            ? void 0
            : null === (t = locale.NAV) || void 0 === t
              ? void 0
              : t.ARCHIVE) || 'Archive',
        item: joinUrl(baseUrl, 'archive')
      })
      break
    case '/category':
      breadcrumbs.push({
        name:
          (null == locale
            ? void 0
            : null === (n = locale.COMMON) || void 0 === n
              ? void 0
              : n.CATEGORY) || 'Category',
        item: joinUrl(baseUrl, 'category')
      })
      break
    case '/category/[category]':
    case '/category/[category]/page/[page]':
      breadcrumbs.push({
        name:
          (null == locale
            ? void 0
            : null === (o = locale.COMMON) || void 0 === o
              ? void 0
              : o.CATEGORY) || 'Category',
        item: joinUrl(baseUrl, 'category')
      }),
        breadcrumbs.push({
          name: category,
          item: joinUrl(
            baseUrl,
            'category/'.concat(encodeURIComponent(category || ''))
          )
        }),
        page &&
          breadcrumbs.push({
            name: 'Page '.concat(page),
            item: canonicalUrl
          })
      break
    case '/tag':
      breadcrumbs.push({
        name:
          (null == locale
            ? void 0
            : null === (r = locale.COMMON) || void 0 === r
              ? void 0
              : r.TAGS) || 'Tags',
        item: joinUrl(baseUrl, 'tag')
      })
      break
    case '/tag/[tag]':
    case '/tag/[tag]/page/[page]':
      breadcrumbs.push({
        name:
          (null == locale
            ? void 0
            : null === (s = locale.COMMON) || void 0 === s
              ? void 0
              : s.TAGS) || 'Tags',
        item: joinUrl(baseUrl, 'tag')
      }),
        breadcrumbs.push({
          name: tag,
          item: joinUrl(baseUrl, 'tag/'.concat(encodeURIComponent(tag || '')))
        }),
        page &&
          breadcrumbs.push({
            name: 'Page '.concat(page),
            item: canonicalUrl
          })
      break
    case '/page/[page]':
      breadcrumbs.push({
        name: 'Page '.concat(page),
        item: canonicalUrl
      })
      break
    default:
      ;(null == post ? void 0 : post.category) &&
        breadcrumbs.push({
          name: post.category,
          item: joinUrl(
            baseUrl,
            'category/'.concat(encodeURIComponent(post.category))
          )
        }),
        (null == post ? void 0 : post.title) &&
          breadcrumbs.push({
            name: post.title,
            item: canonicalUrl
          })
  }
  return breadcrumbs.length < 2
    ? null
    : {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((e, t) => ({
          '@type': 'ListItem',
          position: t + 1,
          name: e.name,
          item: e.item
        }))
      }
}
const compactSchema = e =>
  Array.isArray(e)
    ? e.map(compactSchema).filter(Boolean)
    : e && 'object' == typeof e
      ? Object.fromEntries(
          Object.entries(e)
            .map(e => {
              let [t, n] = e
              return [t, compactSchema(n)]
            })
            .filter(e => {
              let [, t] = e
              return (
                !(
                  null == t ||
                  '' === t ||
                  (Array.isArray(t) && 0 === t.length)
                ) &&
                (!t ||
                  'object' != typeof t ||
                  !!Array.isArray(t) ||
                  0 !== Object.keys(t).length)
              )
            })
        )
      : e
var SEO = props => {
  var t, n, i, l
  let { children, siteInfo, post, NOTION_CONFIG } = props,
    router = useRouter(),
    routeProps = {
      ...props,
      route: router.route
    },
    locale = null === (t = useGlobal()) || void 0 === t ? void 0 : t.locale,
    meta = getSEOMeta(routeProps, router, locale),
    webFontUrl = siteConfig('FONT_URL')
  useEffect(() => {
    loadExternalResource(
      'https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js',
      'js'
    ).then(() => {
      var t
      let n = null === (t = window) || void 0 === t ? void 0 : t.WebFont
      n &&
        n.load({
          custom: {
            urls: webFontUrl
          }
        })
    })
  }, [])
  let baseUrl = getBaseUrl(
      siteConfig('CANONICAL_LINK', null, NOTION_CONFIG),
      siteConfig('CANONICAL_LINK'),
      siteConfig(
        'LINK',
        null == siteInfo ? void 0 : siteInfo.link,
        NOTION_CONFIG
      ),
      null == siteInfo ? void 0 : siteInfo.link
    ),
    canonicalUrl = joinUrl(baseUrl, getCanonicalPath(router, meta)),
    KEYWORDS = siteConfig('KEYWORDS'),
    keywords = (null == meta ? void 0 : meta.tags) || KEYWORDS
  ;(null == post ? void 0 : post.tags) &&
    (null == post
      ? void 0
      : null === (n = post.tags) || void 0 === n
        ? void 0
        : n.length) > 0 &&
    (keywords =
      null == post
        ? void 0
        : null === (l = post.tags) || void 0 === l
          ? void 0
          : l.join(','))
  let image = absoluteUrl(
      (null == meta ? void 0 : meta.image) ||
        (null == siteInfo ? void 0 : siteInfo.pageCover) ||
        '/bg_image.jpg',
      baseUrl
    ),
    TITLE = siteConfig('TITLE'),
    siteName = normalizeText(
      (null == siteInfo ? void 0 : siteInfo.title) || TITLE
    ),
    title = normalizeText((null == meta ? void 0 : meta.title) || TITLE),
    description = normalizeText(
      (null == meta ? void 0 : meta.description) ||
        (null == siteInfo ? void 0 : siteInfo.description) ||
        siteConfig('SEO_HOME_DESCRIPTION') ||
        ''
    ),
    type = (null == meta ? void 0 : meta.type) || 'website',
    lang = siteConfig('LANG').replace('-', '_'),
    category = normalizeText(
      (null == post ? void 0 : post.category) ||
        (null == meta ? void 0 : meta.category) ||
        ''
    ),
    favicon = absoluteUrl(
      siteConfig('BLOG_FAVICON', null, NOTION_CONFIG) ||
        siteConfig('BLOG_FAVICON'),
      baseUrl
    ),
    backgroundDark = siteConfig('BACKGROUND_DARK', '', NOTION_CONFIG),
    robots = getRobotsContent(router.route),
    baiduVerification = siteConfig(
      'SEO_BAIDU_SITE_VERIFICATION',
      null,
      NOTION_CONFIG
    ),
    googleVerification = siteConfig(
      'SEO_GOOGLE_SITE_VERIFICATION',
      null,
      NOTION_CONFIG
    ),
    webmentionEnabled = siteConfig(
      'COMMENT_WEBMENTION_ENABLE',
      null,
      NOTION_CONFIG
    ),
    webmentionHostname = siteConfig(
      'COMMENT_WEBMENTION_HOSTNAME',
      null,
      NOTION_CONFIG
    ),
    webmentionAuth = siteConfig('COMMENT_WEBMENTION_AUTH', null, NOTION_CONFIG),
    busuanziEnabled = siteConfig(
      'ANALYTICS_BUSUANZI_ENABLE',
      null,
      NOTION_CONFIG
    ),
    facebookPage = siteConfig('FACEBOOK_PAGE', null, NOTION_CONFIG),
    author = getAuthorName(
      siteConfig('AUTHOR', null, NOTION_CONFIG) || siteConfig('AUTHOR')
    ),
    twitterUrl =
      siteConfig('CONTACT_TWITTER', null, NOTION_CONFIG) ||
      siteConfig('CONTACT_TWITTER'),
    twitterHandle = getTwitterHandle(twitterUrl),
    publishedTime = getPublishedTime(post),
    modifiedTime = getModifiedTime(post),
    structuredData = getStructuredData({
      props: routeProps,
      meta,
      canonicalUrl,
      image,
      siteName,
      baseUrl,
      authorName: author,
      locale,
      publishedTime,
      modifiedTime,
      sameAs: uniqueValues([
        twitterUrl,
        siteConfig('CONTACT_GITHUB', null, NOTION_CONFIG),
        siteConfig('CONTACT_LINKEDIN', null, NOTION_CONFIG),
        siteConfig('CONTACT_INSTAGRAM', null, NOTION_CONFIG),
        siteConfig('CONTACT_YOUTUBE', null, NOTION_CONFIG)
      ])
    })
  return (
    <Head>
      <link rel="icon" href={favicon} />
      <link rel="canonical" href={canonicalUrl} />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={''.concat(siteName, ' RSS Feed')}
        href={joinUrl(baseUrl, 'rss/feed.xml')}
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        title={''.concat(siteName, ' Atom Feed')}
        href={joinUrl(baseUrl, 'rss/atom.xml')}
      />
      <link
        rel="alternate"
        type="application/feed+json"
        title={''.concat(siteName, ' JSON Feed')}
        href={joinUrl(baseUrl, 'rss/feed.json')}
      />
      <link
        rel="sitemap"
        type="application/xml"
        href={joinUrl(baseUrl, 'sitemap.xml')}
      />
      <link rel="preconnect" href="https://www.notion.so" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <title>{title}</title>
      <meta name="theme-color" content={backgroundDark || '#000000'} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"
      />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta charSet="UTF-8" />
      <meta name="author" content={author} />
      {googleVerification && (
        <meta name="google-site-verification" content={googleVerification} />
      )}
      {baiduVerification && (
        <meta name="baidu-site-verification" content={baiduVerification} />
      )}
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:locale" content={lang} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      {webmentionEnabled && webmentionHostname && (
        <Fragment>
          <link
            rel="webmention"
            href={'https://webmention.io/'.concat(
              webmentionHostname,
              '/webmention'
            )}
          />
          <link
            rel="pingback"
            href={'https://webmention.io/'.concat(
              webmentionHostname,
              '/xmlrpc'
            )}
          />
          {webmentionAuth && <link href={webmentionAuth} rel="me" />}
        </Fragment>
      )}
      {busuanziEnabled && (
        <meta name="referrer" content="no-referrer-when-downgrade" />
      )}
      {(null == meta ? void 0 : meta.type) === 'article' && (
        <Fragment>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          <meta property="article:author" content={author} />
          {category && <meta property="article:section" content={category} />}
          {facebookPage && (
            <meta property="article:publisher" content={facebookPage} />
          )}
          {null == post
            ? void 0
            : null === (i = post.tags) || void 0 === i
              ? void 0
              : i.map(e => <meta key={e} property="article:tag" content={e} />)}
        </Fragment>
      )}
      {structuredData.map((e, t) => (
        <script
          key={'schema-'.concat(t)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(e)
          }}
        />
      ))}
      {children}
    </Head>
  )
}
export default SEO
