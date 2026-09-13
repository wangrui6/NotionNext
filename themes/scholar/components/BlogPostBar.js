import * as JsxRuntimeModule from 'react/jsx-runtime'
import * as GlobalModule from '@/lib/global'
function BlogPostBar(e) {
  let { tag: t, category: n } = e,
    { locale: s } = (0, GlobalModule.useGlobal)(),
    i = t ? s.COMMON.TAGS : s.COMMON.CATEGORY,
    a = t || n
  return a ? (
    <section className='rounded-[24px] border border-[#d9d0c3] bg-[#f7f2e7] px-5 py-6 dark:border-[#334155] dark:bg-[#172033]'>
      <div className='scholar-eyebrow scholar-sans'>{'Topic Dossier'}</div>
      <h1 className='scholar-serif mt-3 text-3xl text-[#1f2937] dark:text-[#f8fafc]'>
        {a}
      </h1>
      <p className='scholar-sans mt-3 text-sm leading-7 text-[#5b6472] dark:text-[#cbd5e1]'>
        {'Browse every entry filed under this '}
        {i.toLowerCase()}
        {' and keep the reading path focused.'}
      </p>
    </section>
  ) : (
    <JsxRuntimeModule.Fragment />
  )
}
export default BlogPostBar
