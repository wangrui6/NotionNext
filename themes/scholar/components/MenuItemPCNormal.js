import * as LinkModule from 'next/link'
import * as RouterModule from 'next/router'
let MenuItemPCNormal = e => {
  let { link: t } = e,
    r = (0, RouterModule.useRouter)(),
    n = r.pathname === t.href || r.asPath === t.href
  return t && t.show ? (
    <LinkModule.default
      key={''.concat(t.id, '-').concat(t.href)}
      title={t.href}
      href={t.href}
      className={
        'px-2 duration-300 text-sm justify-between dark:text-gray-300 cursor-pointer flex flex-nowrap items-center ' +
        (n
          ? 'bg-green-600 text-white hover:text-white'
          : 'hover:text-green-600')
      }>
      <div className='items-center justify-center flex '>
        <i className={t.icon} />
        <div className='ml-2 whitespace-nowrap'>{t.name}</div>
      </div>
      {t.slot}
    </LinkModule.default>
  ) : null
}
export { MenuItemPCNormal }
