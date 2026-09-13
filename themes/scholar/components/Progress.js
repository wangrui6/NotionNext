import * as ReactModule from 'react'
import * as UtilsModule from '@/lib/utils'
let Progress = e => {
  let { targetRef: t, showPercent: n = !0 } = e,
    i = (null == t ? void 0 : t.current) || t,
    [a, l] = (0, ReactModule.useState)(0),
    c = () => {
      let e =
        i ||
        (UtilsModule.isBrowser && document.getElementById('article-wrapper'))
      if (e) {
        let t = e.clientHeight,
          n = parseFloat(
            ((window.pageYOffset / (t - window.outerHeight)) * 100).toFixed(0)
          )
        n > 100 && (n = 100), n < 0 && (n = 0), l(n)
      }
    }
  return (
    (0, ReactModule.useEffect)(
      () => (
        document.addEventListener('scroll', c),
        () => document.removeEventListener('scroll', c)
      ),
      []
    ),
    (
      <div className='h-3 w-full overflow-hidden rounded-full bg-[#ece3d5] dark:bg-[#172033]'>
        <div
          className='h-3 bg-[#7a5c3e] duration-200 dark:bg-[#c9a97c]'
          style={{
            width: ''.concat(a, '%')
          }}>
          {n && (
            <div className='pr-2 text-right text-[10px] text-white'>
              {a}
              {'%'}
            </div>
          )}
        </div>
      </div>
    )
  )
}
export default Progress
