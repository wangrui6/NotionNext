import * as LinkModule from 'next/link'
function CategoryItem(e) {
  let { selected: t, category: n, categoryCount: r } = e
  return (
    <LinkModule.default
      href={'/category/'.concat(n)}
      passHref={!0}
      className={
        (t
          ? 'border-[#7a5c3e] bg-[#f7f2e7] text-[#7a5c3e] dark:border-[#c9a97c] dark:bg-[#172033] dark:text-[#f8fafc] '
          : 'border-[#d9d0c3] text-[#475569] hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:text-[#e2e8f0] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]') +
        ' flex items-center whitespace-nowrap rounded-full border px-3 py-2 text-sm duration-300'
      }>
      <div>
        <i className={'mr-2 fas '.concat(t ? 'fa-folder-open' : 'fa-folder')} />
        {n} {r && '('.concat(r, ')')}
      </div>
    </LinkModule.default>
  )
}
export default CategoryItem
