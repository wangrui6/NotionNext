import * as LinkModule from 'next/link'
import * as RouterModule from 'next/router'
let NormalMenu = e => {
  let { link: t } = e,
    r = (0, RouterModule.useRouter)()
  if (!t || !t.show) return null
  let a = r.pathname === t.href || r.asPath === t.href
  return (
    <LinkModule.default
      key={''.concat(t.href)}
      title={t.href}
      href={t.href}
      className={
        'py-0.5 duration-500 justify-between text-gray-500 dark:text-gray-300 hover:text-black hover:underline cursor-pointer flex flex-nowrap items-center ' +
        (a ? 'text-black' : ' ')
      }>
      <div className='my-auto items-center justify-center flex '>
        <div className='hover:text-black'>{t.name}</div>
      </div>
      {t.slot}
    </LinkModule.default>
  )
}
export { NormalMenu }
