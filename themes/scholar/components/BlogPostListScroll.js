import * as ConfigModule from '@/lib/config'
import * as GlobalModule from '@/lib/global'
import * as ThrottleModule from 'lodash.throttle'
import * as RouterModule from 'next/router'
import * as ReactModule from 'react'
import * as BlogPostCardModule from './BlogPostCard'
import * as BlogPostListEmptyModule from './BlogPostListEmpty'
let BlogPostListScroll = e => {
    var t
    let { posts: n = [], currentSearch: i } = e,
      { NOTION_CONFIG: m } = (0, GlobalModule.useGlobal)(),
      f = (0, ConfigModule.siteConfig)('POSTS_PER_PAGE', null, m),
      [h, g] = (0, ReactModule.useState)(1),
      v = (0, RouterModule.useRouter)(),
      _ = Object.assign(n),
      T =
        (null == v
          ? void 0
          : null === (t = v.query) || void 0 === t
            ? void 0
            : t.s) || null
    T &&
      (_ = n.filter(e => {
        let t = (null == e ? void 0 : e.tags)
          ? null == e
            ? void 0
            : e.tags.join(' ')
          : ''
        return (e.title + e.summary + t).toLowerCase().includes(T.toLowerCase())
      }))
    let E = p(h, _, f),
      x = !1
    _ && (x = h * f < _.length)
    let b = () => {
        x && g(h + 1)
      },
      j = (0, ReactModule.useCallback)(
        ThrottleModule.default(() => {
          window.scrollY + window.outerHeight >
            (C && C.current ? C.current.clientHeight : 0) + 100 && b()
        }, 500)
      )
    ;(0, ReactModule.useEffect)(
      () => (
        window.addEventListener('scroll', j),
        () => {
          window.removeEventListener('scroll', j)
        }
      )
    )
    let C = (0, ReactModule.useRef)(null),
      { locale: y } = (0, GlobalModule.useGlobal)()
    return E && 0 !== E.length ? (
      <div id='posts-wrapper' ref={C} className='w-full'>
        <div className='space-y-1 lg:space-y-4'>
          {null == E
            ? void 0
            : E.map(e => (
                <BlogPostCardModule.default
                  key={e.id}
                  post={e}
                  showSummary={!0}
                />
              ))}
        </div>
        <div>
          <div
            onClick={() => {
              b()
            }}
            className='w-full my-4 py-4 text-center cursor-pointer dark:text-gray-200'>
            {x ? y.COMMON.MORE : y.COMMON.NO_MORE}
          </div>
        </div>
      </div>
    ) : (
      <BlogPostListEmptyModule.default currentSearch={i} />
    )
  },
  p = function (e, t, n) {
    return t.slice(0, n * e)
  }
export default BlogPostListScroll
