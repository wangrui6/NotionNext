import * as JsxRuntimeModule from 'react/jsx-runtime'
import * as LinkModule from 'next/link'
function ArticleAround(e) {
  let { prev: t, next: n } = e
  return t || n ? (
    <section className='my-8 grid gap-4 md:grid-cols-2'>
      {t ? (
        <LinkModule.default
          href={'/'.concat(t.slug)}
          passHref={!0}
          className='rounded-[22px] border border-[#d9d0c3] bg-[#f7f2e7] px-5 py-4 text-sm text-[#475569] transition hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:bg-[#172033] dark:text-[#cbd5e1] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]'>
          <div className='mb-2 text-[0.68rem] uppercase tracking-[0.3em]'>
            {'Previous'}
          </div>
          <div className='scholar-serif text-lg text-[#1f2937] dark:text-[#f8fafc]'>
            <i className='mr-2 fas fa-angle-double-left' />
            {t.title}
          </div>
        </LinkModule.default>
      ) : (
        <div />
      )}
      {n && (
        <LinkModule.default
          href={'/'.concat(n.slug)}
          passHref={!0}
          className='rounded-[22px] border border-[#d9d0c3] bg-[#f7f2e7] px-5 py-4 text-right text-sm text-[#475569] transition hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:bg-[#172033] dark:text-[#cbd5e1] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]'>
          <div className='mb-2 text-[0.68rem] uppercase tracking-[0.3em]'>
            {'Next'}
          </div>
          <div className='scholar-serif text-lg text-[#1f2937] dark:text-[#f8fafc]'>
            {n.title}
            <i className='ml-2 fas fa-angle-double-right' />
          </div>
        </LinkModule.default>
      )}
    </section>
  ) : (
    <JsxRuntimeModule.Fragment />
  )
}
export default ArticleAround
