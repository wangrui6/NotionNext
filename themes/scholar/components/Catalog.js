import * as JsxRuntimeModule from 'react/jsx-runtime'
import * as ThrottleModule from 'lodash.throttle'
import * as NotionutilsModule from 'notion-utils'
import * as ReactModule from 'react'
import * as ProgressModule from './Progress'
let Catalog = e => {
  let { toc: t } = e,
    n = [],
    r = (0, ReactModule.useRef)(null),
    [c, u] = (0, ReactModule.useState)(null)
  ;(0, ReactModule.useEffect)(
    () => (
      window.addEventListener('scroll', m),
      m(),
      () => {
        window.removeEventListener('scroll', m)
      }
    ),
    []
  )
  let d = 200,
    m = (0, ReactModule.useCallback)(
      ThrottleModule.default(() => {
        var e
        let t = document.getElementsByClassName('notion-h'),
          o = null,
          s = c
        for (let e = 0; e < t.length; ++e) {
          let n = t[e]
          if (!n || !(n instanceof Element)) continue
          s || (s = n.getAttribute('data-id'))
          let r = n.getBoundingClientRect(),
            i = Math.max(150, (o ? r.top - o.bottom : 0) / 4)
          if (r.top - i < 0) {
            ;(s = n.getAttribute('data-id')), (o = r)
            continue
          }
          break
        }
        u(s)
        let i = n.indexOf(s) || 0
        null == r ||
          null === (e = r.current) ||
          void 0 === e ||
          e.scrollTo({
            top: 28 * i,
            behavior: 'smooth'
          })
      }, d)
    )
  return !t || t.length < 1 ? (
    <JsxRuntimeModule.Fragment />
  ) : (
    <div className='px-3'>
      <div className='w-full mt-2 mb-4'>
        <ProgressModule.default />
      </div>
      <div
        className='overflow-y-auto max-h-44 overscroll-none scroll-hidden'
        ref={r}>
        <nav className='h-full text-[#1f2937] dark:text-[#f8fafc]'>
          {t.map(e => {
            let t = (0, NotionutilsModule.uuidToId)(e.id)
            return (
              n.push(t),
              (
                <a
                  key={t}
                  href={'#'.concat(t)}
                  className={'notion-table-of-contents-item duration-300 transform font-light dark:text-gray-300\n              notion-table-of-contents-item-indent-level-'.concat(
                    e.indentLevel,
                    ' catalog-item '
                  )}>
                  <span
                    style={{
                      display: 'inline-block',
                      marginLeft: 16 * e.indentLevel
                    }}
                    className={'truncate '.concat(
                      c === t ? 'catalog-item-active' : ''
                    )}>
                    {e.text}
                  </span>
                </a>
              )
            )
          })}
        </nav>
      </div>
    </div>
  )
}
export default Catalog
