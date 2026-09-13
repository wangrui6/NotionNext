import * as JsxRuntimeModule from 'react/jsx-runtime'
import * as DynamicModule from 'next/dynamic'
let l = DynamicModule.default(
  () => Promise.resolve().then(() => import('@/components/NotionPage')),
  {}
)
const Announcement = e => {
  let { post: n, className: a } = e
  return (null == n ? void 0 : n.blockMap) ? (
    <div className={a}>
      <section
        id='announcement-wrapper'
        className='dark:text-gray-300 rounded-xl px-2 py-4'>
        {n && (
          <div id='announcement-content'>
            {(0, JsxRuntimeModule.jsx)(l, {
              post: n,
              className: 'text-center '
            })}
          </div>
        )}
      </section>
    </div>
  ) : (
    <JsxRuntimeModule.Fragment />
  )
}
export default Announcement
