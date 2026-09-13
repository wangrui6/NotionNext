import * as JsxRuntimeModule from 'react/jsx-runtime'
import * as CollapseModule from '@/components/Collapse'
import * as LinkModule from 'next/link'
import * as RouterModule from 'next/router'
import * as ReactModule from 'react'
let MenuItemCollapse = e => {
  var t, n
  let { link: s } = e,
    [c, u] = (0, ReactModule.useState)(!1),
    d =
      (null == s
        ? void 0
        : null === (t = s.subMenus) || void 0 === t
          ? void 0
          : t.length) > 0,
    [m, p] = (0, ReactModule.useState)(!1),
    f = (0, RouterModule.useRouter)()
  if (!s || !s.show) return null
  let h = f.pathname === s.href || f.asPath === s.href,
    g = () => {
      u(!c)
    },
    v = () => {
      p(!m)
    }
  return (
    <JsxRuntimeModule.Fragment>
      <div
        className={
          (h
            ? 'border-[#7a5c3e] bg-[#f7f2e7] text-[#7a5c3e] dark:border-[#c9a97c] dark:bg-[#172033] dark:text-[#f8fafc]'
            : 'text-[#475569] hover:text-[#7a5c3e] dark:text-[#cbd5e1] dark:hover:text-[#f8fafc]') +
          ' w-full rounded-2xl border border-transparent px-4 text-left duration-200'
        }
        onClick={g}>
        {!d && (
          <LinkModule.default
            href={null == s ? void 0 : s.href}
            target={null == s ? void 0 : s.target}
            className='py-2 w-full my-auto items-center justify-between flex  '>
            <div>
              <div className={''.concat(s.icon, ' text-center w-4 mr-4')} />
              {s.name}
            </div>
          </LinkModule.default>
        )}
        {d && (
          <div
            onClick={d ? v : null}
            className='py-2 font-extralight flex justify-between cursor-pointer  dark:text-gray-200 no-underline tracking-widest'>
            <div>
              <div className={''.concat(s.icon, ' text-center w-4 mr-4')} />
              {s.name}
            </div>
            <div className='inline-flex items-center '>
              <i
                className={'px-2 fas fa-chevron-right transition-all duration-200 '.concat(
                  m ? 'rotate-90' : ''
                )}
              />
            </div>
          </div>
        )}
      </div>
      {d && (
        <CollapseModule.default isOpen={m} onHeightChange={e.onHeightChange}>
          {null == s
            ? void 0
            : null === (n = s.subMenus) || void 0 === n
              ? void 0
              : n.map(e => (
                  <div
                    key={e.id}
                    className='not:last-child:border-b-0 mt-2 rounded-2xl border border-[#e7dfd2] bg-[#fffaf0] px-5 py-2 text-left text-[#475569] transition-all duration-200 hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:bg-[#0f172a] dark:text-[#e2e8f0] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]'>
                    <LinkModule.default
                      href={e.href}
                      target={null == s ? void 0 : s.target}>
                      <div>
                        <div
                          className={''.concat(
                            e.icon,
                            ' text-center w-3 mr-3 text-xs'
                          )}
                        />
                        {e.title}
                      </div>
                    </LinkModule.default>
                  </div>
                ))}
        </CollapseModule.default>
      )}
    </JsxRuntimeModule.Fragment>
  )
}
export { MenuItemCollapse }
