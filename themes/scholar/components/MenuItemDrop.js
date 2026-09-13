import * as LinkModule from 'next/link'
import * as RouterModule from 'next/router'
import * as ReactModule from 'react'
let MenuItemDrop = e => {
  var t, n
  let { link: r } = e,
    [l, c] = (0, ReactModule.useState)(!1),
    u = (0, RouterModule.useRouter)()
  if (!r || !r.show) return null
  let d =
      (null == r
        ? void 0
        : null === (t = r.subMenus) || void 0 === t
          ? void 0
          : t.length) > 0,
    m = u.pathname === r.href || u.asPath === r.href
  return (
    <li
      className='flex list-none items-center'
      onMouseOver={() => c(!0)}
      onMouseOut={() => c(!1)}>
      {d && (
        <div
          className={
            'flex h-full cursor-pointer items-center justify-between whitespace-nowrap rounded-full px-4 py-2 text-sm duration-300 dark:text-gray-300 ' +
            (m
              ? 'bg-[#f7f2e7] text-[#7a5c3e] dark:bg-[#172033] dark:text-[#f8fafc]'
              : 'text-[#475569] hover:text-[#7a5c3e] dark:text-[#cbd5e1] dark:hover:text-[#f8fafc]')
          }>
          <div>
            {(null == r ? void 0 : r.icon) && (
              <i className={null == r ? void 0 : r.icon} />
            )}{' '}
            {null == r ? void 0 : r.name}
            {d && (
              <i
                className={'px-2 fas fa-chevron-down duration-500 transition-all '.concat(
                  l ? ' rotate-180' : ''
                )}
              />
            )}
          </div>
        </div>
      )}
      {!d && (
        <div
          className={
            'flex h-full cursor-pointer items-center justify-between whitespace-nowrap rounded-full px-4 py-2 text-sm duration-300 dark:text-gray-300 ' +
            (m
              ? 'bg-[#f7f2e7] text-[#7a5c3e] dark:bg-[#172033] dark:text-[#f8fafc]'
              : 'text-[#475569] hover:text-[#7a5c3e] dark:text-[#cbd5e1] dark:hover:text-[#f8fafc]')
          }>
          <LinkModule.default
            href={null == r ? void 0 : r.href}
            target={null == r ? void 0 : r.target}>
            {(null == r ? void 0 : r.icon) && (
              <i className={null == r ? void 0 : r.icon} />
            )}{' '}
            {null == r ? void 0 : r.name}
          </LinkModule.default>
        </div>
      )}
      {d && (
        <ul
          className={''.concat(
            l ? 'visible top-14 opacity-100 ' : 'invisible top-12 opacity-0 ',
            ' absolute z-20 block rounded-2xl border border-[#d9d0c3] bg-[#fffdf8] drop-shadow-lg transition-all duration-300 dark:border-[#334155] dark:bg-[#111827]'
          )}>
          {null == r
            ? void 0
            : null === (n = r.subMenus) || void 0 === n
              ? void 0
              : n.map(e => (
                  <li
                    key={e.id}
                    className='not:last-child:border-b-0 border-b border-[#ece3d5] py-3 pl-3 pr-6 text-[#475569] transition-all duration-200 hover:bg-[#f7f2e7] hover:text-[#7a5c3e] dark:border-[#334155] dark:text-[#e2e8f0] dark:hover:bg-[#172033] dark:hover:text-[#f8fafc]'>
                    <LinkModule.default
                      href={e.href}
                      target={null == r ? void 0 : r.target}>
                      <span className='text-xs font-extralight'>
                        {(null == r ? void 0 : r.icon) && (
                          <i className={null == e ? void 0 : e.icon}>
                            {' \xa0 '}
                          </i>
                        )}
                        {e.title}
                      </span>
                    </LinkModule.default>
                  </li>
                ))}
        </ul>
      )}
    </li>
  )
}
export { MenuItemDrop }
