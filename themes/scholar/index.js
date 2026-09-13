import * as JsxRuntimeModule from 'react/jsx-runtime'
import * as CommentModule from '@/components/Comment'
import * as MarkModule from '@/components/Mark'
import * as NotionPageModule from '@/components/NotionPage'
import * as ShareBarModule from '@/components/ShareBar'
import * as ConfigModule from '@/lib/config'
import * as GlobalModule from '@/lib/global'
import * as UtilsModule from '@/lib/utils'
import * as HeadlessUiModule from '@headlessui/react'
import * as LinkModule from 'next/link'
import * as RouterModule from 'next/router'
import * as ReactModule from 'react'
import * as ArticleAroundModule from './components/ArticleAround'
import * as ArticleInfoModule from './components/ArticleInfo'
import * as ArticleLockModule from './components/ArticleLock'
import * as BlogArchiveItemModule from './components/BlogArchiveItem'
import * as BlogPostBarModule from './components/BlogPostBar'
import * as BlogPostListPageModule from './components/BlogPostListPage'
import * as BlogPostListScrollModule from './components/BlogPostListScroll'
import * as BottomMenuBarModule from './components/BottomMenuBar'
import * as CatalogModule from './components/Catalog'
import * as CategoryGroupModule from './components/CategoryGroup'
import * as CategoryItemModule from './components/CategoryItem'
import * as FooterModule from './components/Footer'
import * as InfoCardModule from './components/InfoCard'
import * as JumpToTopButtonModule from './components/JumpToTopButton'
import * as KnowledgeHeroModule from './components/KnowledgeHero'
import * as SearchInputModule from './components/SearchInput'
import * as TagGroupsModule from './components/TagGroups'
import * as TagItemMiniModule from './components/TagItemMini'
import * as TocDrawerModule from './components/TocDrawer'
import * as TopNavBarModule from './components/TopNavBar'
import * as ThemeConfigModule from './config'
import * as StyleModule from './style'
let U = (0, ReactModule.createContext)(),
  useScholarGlobal = () => (0, ReactModule.useContext)(U),
  LayoutBase = e => {
    var t, n
    let { children: r, showInfoCard: s = !0, post: i } = e,
      { locale: a } = (0, GlobalModule.useGlobal)(),
      u = (0, RouterModule.useRouter)(),
      [m, p] = (0, ReactModule.useState)(!1),
      { onLoading: g, fullWidth: v } = (0, GlobalModule.useGlobal)(),
      [_, T] = (0, ReactModule.useState)(null)
    ;(0, ReactModule.useEffect)(() => {
      var e
      ;(null == i
        ? void 0
        : null === (e = i.toc) || void 0 === e
          ? void 0
          : e.length) > 0
        ? T(
            <div key={a.COMMON.TABLE_OF_CONTENTS}>
              <CatalogModule.default toc={null == i ? void 0 : i.toc} />
            </div>
          )
        : T(null)
    }, [i])
    let x = <BlogPostBarModule.default {...e} />
    return (
      <U.Provider
        value={{
          tocVisible: m,
          changeTocVisible: p
        }}>
        <StyleModule.Style />
        <div
          id='theme-scholar'
          className={''.concat(
            (0, ConfigModule.siteConfig)('FONT_STYLE'),
            ' scholar-shell min-h-screen scroll-smooth bg-[#f4f1ea] dark:bg-[#111827]'
          )}>
          <TopNavBarModule.default {...e} />
          <main
            id='wrapper'
            className={
              (JSON.parse(
                (0, ConfigModule.siteConfig)('LAYOUT_SIDEBAR_REVERSE')
              )
                ? 'flex-row-reverse'
                : '') +
              ' mx-auto flex w-full max-w-[90rem] gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8'
            }>
            <div
              id='container-wrapper'
              className={'min-w-0 flex-1 relative z-10 '.concat(
                v ? '' : 'max-w-5xl'
              )}>
              <div
                id='container-inner'
                className='scholar-panel rounded-[30px] px-5 py-6 md:px-8 md:py-8'>
                <HeadlessUiModule.Transition
                  show={!g}
                  appear={!0}
                  enter='transition ease-in-out duration-700 transform order-first'
                  enterFrom='opacity-0 translate-y-16'
                  enterTo='opacity-100'
                  leave='transition ease-in-out duration-300 transform'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0 -translate-y-16'
                  unmount={!1}>
                  <div className='space-y-10'>
                    {x}
                    {r}
                  </div>
                </HeadlessUiModule.Transition>
              </div>
              <FooterModule.default
                title={(0, ConfigModule.siteConfig)('TITLE')}
              />
            </div>
            {v ? null : (
              <aside className='hidden xl:block w-80 flex-shrink-0 relative z-10'>
                <div className='sticky top-28 space-y-5'>
                  {_ && (
                    <section className='scholar-sidebar-card rounded-[24px] p-5'>
                      <div className='scholar-eyebrow scholar-sans mb-4'>
                        {a.COMMON.TABLE_OF_CONTENTS}
                      </div>
                      {_}
                    </section>
                  )}
                  {'/search' !== u.pathname && (
                    <section className='scholar-sidebar-card rounded-[24px] p-5'>
                      <div className='scholar-eyebrow scholar-sans'>
                        {'Find A Concept'}
                      </div>
                      <SearchInputModule.default className='mt-4' />
                    </section>
                  )}
                  {s && <InfoCardModule.default {...e} />}
                  {(null === (t = e.categoryOptions) || void 0 === t
                    ? void 0
                    : t.length) > 0 && (
                    <section className='scholar-sidebar-card rounded-[24px] p-5'>
                      <CategoryGroupModule.default {...e} />
                    </section>
                  )}
                  {(null === (n = e.tagOptions) || void 0 === n
                    ? void 0
                    : n.length) > 0 && (
                    <section className='scholar-sidebar-card rounded-[24px] p-5'>
                      <TagGroupsModule.default {...e} />
                    </section>
                  )}
                </div>
              </aside>
            )}
          </main>
          <JumpToTopButtonModule.default />
          <BottomMenuBarModule.default {...e} className='block md:hidden' />
        </div>
      </U.Provider>
    )
  },
  LayoutIndex = e => (
    <LayoutPostList {...e} topSlot={<KnowledgeHeroModule.default {...e} />} />
  ),
  LayoutPostList = e => {
    let { topSlot: t } = e
    return (
      <JsxRuntimeModule.Fragment>
        {t}
        {'page' === (0, ConfigModule.siteConfig)('POST_LIST_STYLE') ? (
          <BlogPostListPageModule.default {...e} />
        ) : (
          <BlogPostListScrollModule.default {...e} />
        )}
      </JsxRuntimeModule.Fragment>
    )
  },
  LayoutSlug = e => {
    var t, n
    let { post: s, prev: d, next: m, lock: p, validPassword: T } = e,
      { locale: E } = (0, GlobalModule.useGlobal)()
    ;(null == s ? void 0 : s.toc) &&
      (null == s
        ? void 0
        : null === (t = s.toc) || void 0 === t
          ? void 0
          : t.length) >= 3 &&
      (CatalogModule.default, null == s || s.toc, E.COMMON.TABLE_OF_CONTENTS)
    let x = (0, RouterModule.useRouter)(),
      b = 1e3 * (0, ConfigModule.siteConfig)('POST_WAITING_TIME_FOR_404')
    return (
      (0, ReactModule.useEffect)(() => {
        s ||
          setTimeout(() => {
            UtilsModule.isBrowser &&
              !document.querySelector('#article-wrapper #notion-article') &&
              x.push('/404').then(() => {
                console.warn('找不到页面', x.asPath)
              })
          }, b)
      }, [s]),
      (
        <div>
          {p && <ArticleLockModule.ArticleLock validPassword={T} />}
          {!p && s && (
            <div className='space-y-8'>
              <ArticleInfoModule.default {...e} />
              <article
                id='article-wrapper'
                className='scholar-sans px-1 max-w-4xl text-[#1f2937] dark:text-[#f8fafc]'>
                {s && <NotionPageModule.default post={s} />}
              </article>
              <section className='border-t border-[#d9d0c3] pt-8 dark:border-[#334155]'>
                <ShareBarModule.default post={s} />
                <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
                  {(0, ConfigModule.siteConfig)(
                    'SCHOLAR_POST_DETAIL_CATEGORY',
                    null,
                    ThemeConfigModule.default
                  ) &&
                    (null == s ? void 0 : s.category) && (
                      <CategoryItemModule.default
                        category={null == s ? void 0 : s.category}
                      />
                    )}
                  <div className='flex flex-wrap gap-2'>
                    {(0, ConfigModule.siteConfig)(
                      'SCHOLAR_POST_DETAIL_TAG',
                      null,
                      ThemeConfigModule.default
                    ) &&
                      (null == s
                        ? void 0
                        : null === (n = s.tagItems) || void 0 === n
                          ? void 0
                          : n.map(e => (
                              <TagItemMiniModule.default key={e.name} tag={e} />
                            )))}
                  </div>
                </div>
                {(null == s ? void 0 : s.type) === 'Post' && (
                  <ArticleAroundModule.default prev={d} next={m} />
                )}
                <CommentModule.default frontMatter={s} />
              </section>
              <TocDrawerModule.default {...e} />
            </div>
          )}
        </div>
      )
    )
  },
  LayoutSearch = e => {
    var t
    let { locale: n } = (0, GlobalModule.useGlobal)(),
      { keyword: r } = e,
      i = (0, RouterModule.useRouter)(),
      a =
        r ||
        (null == i
          ? void 0
          : null === (t = i.query) || void 0 === t
            ? void 0
            : t.s)
    return (
      (0, ReactModule.useEffect)(() => {
        UtilsModule.isBrowser &&
          (0, MarkModule.default)({
            doms: document.getElementById('posts-wrapper'),
            search: r,
            target: {
              element: 'span',
              className: 'text-[#7a5c3e] border-b border-dashed'
            }
          })
      }, []),
      (
        <JsxRuntimeModule.Fragment>
          <div className='rounded-[24px] border border-[#d9d0c3] bg-[#f7f2e7] px-5 py-6 dark:border-[#334155] dark:bg-[#172033]'>
            <div className='scholar-eyebrow scholar-sans'>{n.NAV.SEARCH}</div>
            <div className='scholar-serif pb-4 pt-3 text-3xl text-[#1f2937] dark:text-[#f8fafc]'>
              {'Explore The Archive'}
            </div>
            <SearchInputModule.default currentSearch={a} {...e} />
            {!a && (
              <div className='mt-6 grid gap-6 lg:grid-cols-2'>
                <TagGroupsModule.default {...e} />
                <CategoryGroupModule.default {...e} />
              </div>
            )}
          </div>
          {a && (
            <div>
              {'page' === (0, ConfigModule.siteConfig)('POST_LIST_STYLE') ? (
                <BlogPostListPageModule.default {...e} />
              ) : (
                <BlogPostListScrollModule.default {...e} />
              )}
            </div>
          )}
        </JsxRuntimeModule.Fragment>
      )
    )
  },
  LayoutArchive = e => {
    var t
    let { archivePosts: n } = e
    return (
      <JsxRuntimeModule.Fragment>
        <div className='mb-10 min-h-full rounded-[24px] border border-[#d9d0c3] bg-[#fffdf8] px-5 py-6 dark:border-[#334155] dark:bg-[#111827] md:py-12'>
          {null === (t = Object.keys(n)) || void 0 === t
            ? void 0
            : t.map(e => (
                <BlogArchiveItemModule.default
                  key={e}
                  archiveTitle={e}
                  archivePosts={n}
                />
              ))}
        </div>
      </JsxRuntimeModule.Fragment>
    )
  },
  Layout404 = _e => {
    let t = (0, RouterModule.useRouter)()
    return (
      (0, ReactModule.useEffect)(() => {
        setTimeout(() => {
          ;('undefined' != typeof document &&
            document.getElementById('notion-article')) ||
            t.push('/').then(() => {})
        }, 3e3)
      }),
      (
        <JsxRuntimeModule.Fragment>
          <div className='flex h-screen w-full flex-col items-center justify-center text-center text-[#1f2937] dark:text-[#f8fafc]'>
            <div>
              <h2 className='inline-block mr-2 border-r-2 border-[#7a5c3e] px-3 py-2 align-top'>
                {'404'}
              </h2>
              <div className='inline-block text-left h-32 leading-10 items-center'>
                <h2 className='m-0 p-0'>{'页面未找到'}</h2>
              </div>
            </div>
          </div>
        </JsxRuntimeModule.Fragment>
      )
    )
  },
  LayoutCategoryIndex = e => {
    let { categoryOptions: t } = e,
      { locale: n } = (0, GlobalModule.useGlobal)()
    return (
      <JsxRuntimeModule.Fragment>
        <div className='rounded-[24px] border border-[#d9d0c3] bg-[#fffdf8] px-5 py-8 dark:border-[#334155] dark:bg-[#111827]'>
          <div className='scholar-eyebrow scholar-sans mb-4'>
            {n.COMMON.CATEGORY}
          </div>
          <div className='scholar-serif mb-6 text-3xl text-[#1f2937] dark:text-[#f8fafc]'>
            {'Explore by domain'}
          </div>
          <div id='category-list' className='duration-200 flex flex-wrap'>
            {null == t
              ? void 0
              : t.map(e => (
                  <LinkModule.default
                    key={e.name}
                    href={'/category/'.concat(e.name)}
                    passHref={!0}
                    legacyBehavior={!0}>
                    <div className='mb-2 mr-2 rounded-full border border-[#d9d0c3] px-5 py-2 text-[#475569] transition hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:text-[#e5e7eb] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]'>
                      <i className='mr-4 fas fa-folder' />
                      {e.name}
                      {'('}
                      {e.count}
                      {')'}
                    </div>
                  </LinkModule.default>
                ))}
          </div>
        </div>
      </JsxRuntimeModule.Fragment>
    )
  },
  LayoutTagIndex = e => {
    let { tagOptions: t } = e,
      { locale: n } = (0, GlobalModule.useGlobal)()
    return (
      <JsxRuntimeModule.Fragment>
        <div className='rounded-[24px] border border-[#d9d0c3] bg-[#fffdf8] px-5 py-8 dark:border-[#334155] dark:bg-[#111827]'>
          <div className='scholar-eyebrow scholar-sans mb-4'>
            {n.COMMON.TAGS}
          </div>
          <div className='scholar-serif mb-6 text-3xl text-[#1f2937] dark:text-[#f8fafc]'>
            {'Explore by keyword'}
          </div>
          <div id='tags-list' className='duration-200 flex flex-wrap'>
            {null == t
              ? void 0
              : t.map(e => (
                  <div key={e.name} className='p-2'>
                    <TagItemMiniModule.default key={e.name} tag={e} />
                  </div>
                ))}
          </div>
        </div>
      </JsxRuntimeModule.Fragment>
    )
  }
export { Layout404 }
export { LayoutArchive }
export { LayoutBase }
export { LayoutCategoryIndex }
export { LayoutIndex }
export { LayoutPostList }
export { LayoutSearch }
export { LayoutSlug }
export { LayoutTagIndex }
export const THEME_CONFIG = ThemeConfigModule.default
export { useScholarGlobal }
