import * as LinkModule from 'next/link'
import * as RouterModule from 'next/router'
import * as GlobalModule from '@/lib/global'
let PaginationSimple = e => {
  let { page: t, totalPage: n } = e,
    { locale: r } = (0, GlobalModule.useGlobal)(),
    l = (0, RouterModule.useRouter)(),
    c = +t,
    u = c < n,
    d = l.asPath
      .split('?')[0]
      .replace(/\/page\/[1-9]\d*/, '')
      .replace(/\/$/, '')
  return (
    <div className='my-10 flex justify-between space-x-2 text-[#1f2937] dark:text-[#f8fafc]'>
      <LinkModule.default
        href={{
          pathname:
            2 === c ? ''.concat(d, '/') : ''.concat(d, '/page/').concat(c - 1),
          query: l.query.s
            ? {
                s: l.query.s
              }
            : {}
        }}
        passHref={!0}
        rel='prev'
        className={''.concat(
          1 === c ? 'invisible' : 'block',
          ' w-full rounded-full border border-[#d9d0c3] px-4 py-3 text-center text-sm uppercase tracking-[0.22em] duration-200 hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]'
        )}>
        {'←'}
        {r.PAGINATION.PREV}
      </LinkModule.default>
      <LinkModule.default
        href={{
          pathname: ''.concat(d, '/page/').concat(c + 1),
          query: l.query.s
            ? {
                s: l.query.s
              }
            : {}
        }}
        passHref={!0}
        rel='next'
        className={''.concat(
          +u ? 'block' : 'invisible',
          ' w-full rounded-full border border-[#d9d0c3] px-4 py-3 text-center text-sm uppercase tracking-[0.22em] duration-200 hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]'
        )}>
        {r.PAGINATION.NEXT}
        {'→'}
      </LinkModule.default>
    </div>
  )
}
export default PaginationSimple
