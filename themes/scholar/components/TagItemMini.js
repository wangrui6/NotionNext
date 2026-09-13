import * as LinkModule from 'next/link'
let TagItemMini = e => {
  let { tag: t, selected: n = !1 } = e
  return (
    <LinkModule.default
      key={t}
      href={n ? '/' : '/tag/'.concat(encodeURIComponent(t.name))}
      passHref={!0}
      className={'mr-2 inline-block cursor-pointer whitespace-nowrap rounded-full border px-3 py-2 text-xs uppercase tracking-[0.18em] duration-200\n         '.concat(
        n
          ? 'border-[#7a5c3e] bg-[#f7f2e7] text-[#7a5c3e] dark:border-[#c9a97c] dark:bg-[#172033] dark:text-[#f8fafc]'
          : 'border-[#d9d0c3] text-[#5b6472] hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:text-[#cbd5e1] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]'
      )}>
      <div>
        {n && <i className='mr-1 fas fa-tag' />}{' '}
        {t.name + (t.count ? '('.concat(t.count, ')') : '')}{' '}
      </div>
    </LinkModule.default>
  )
}
export default TagItemMini
