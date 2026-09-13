import * as JsxRuntimeModule from 'react/jsx-runtime'
import * as LinkModule from 'next/link'
import * as ConfigModule from '@/lib/config'
import * as ThemeConfigModule from '../config'
let l = e => {
  let { label: t, value: n } = e
  return (
    <div className='rounded-[20px] border border-[#d9d0c3] bg-[#fffaf0] px-4 py-4 dark:border-[#334155] dark:bg-[#172033]'>
      <div className='text-[0.68rem] uppercase tracking-[0.3em] text-[#7a5c3e] dark:text-[#c9a97c]'>
        {t}
      </div>
      <div className='mt-2 text-3xl font-semibold text-[#1f2937] dark:text-[#f8fafc]'>
        {n}
      </div>
    </div>
  )
}
function KnowledgeHero(e) {
  let {
      siteInfo: t,
      posts: n = [],
      categoryOptions: r = [],
      tagOptions: c = []
    } = e,
    u = (null == t ? void 0 : t.title) || (0, ConfigModule.siteConfig)('TITLE'),
    d =
      (null == t ? void 0 : t.description) ||
      (0, ConfigModule.siteConfig)('DESCRIPTION'),
    m = r.slice(
      0,
      (0, ConfigModule.siteConfig)(
        'SCHOLAR_HOME_CATEGORY_LIMIT',
        6,
        ThemeConfigModule.default
      )
    ),
    p = c.slice(
      0,
      (0, ConfigModule.siteConfig)(
        'SCHOLAR_HOME_TAG_LIMIT',
        8,
        ThemeConfigModule.default
      )
    )
  return (
    <section className='scholar-hero-card mb-10 grid gap-6 rounded-[28px] p-6 md:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.85fr)] md:p-8'>
      <div>
        <div className='scholar-eyebrow scholar-sans'>
          {'Knowledge Journal'}
        </div>
        <h1 className='scholar-serif mt-4 text-4xl leading-tight text-[#1f2937] dark:text-[#f8fafc] md:text-5xl'>
          {u}
        </h1>
        <p className='scholar-sans mt-5 max-w-3xl text-[15px] leading-8 text-[#475569] dark:text-[#cbd5e1]'>
          {d ||
            'A focused reading environment for essays, working notes, and durable knowledge.'}
        </p>
        <div className='mt-8 grid gap-3 sm:grid-cols-3'>
          {(0, JsxRuntimeModule.jsx)(l, {
            label: 'Articles',
            value: n.length
          })}
          {(0, JsxRuntimeModule.jsx)(l, {
            label: 'Domains',
            value: r.length
          })}
          {(0, JsxRuntimeModule.jsx)(l, {
            label: 'Keywords',
            value: c.length
          })}
        </div>
      </div>
      <div className='rounded-[24px] border border-[#d9d0c3] bg-[#f7f2e7] p-5 dark:border-[#334155] dark:bg-[#172033]'>
        <div className='scholar-eyebrow scholar-sans'>
          {'Browse The Syllabus'}
        </div>
        <p className='scholar-sans mt-4 text-sm leading-7 text-[#5b6472] dark:text-[#cbd5e1]'>
          {
            'Start with the core domains, then drill into topic clusters and individual essays.'
          }
        </p>
        <div className='mt-5 flex flex-wrap gap-2'>
          {m.map(e => (
            <LinkModule.default
              key={e.name}
              href={'/category/'.concat(e.name)}
              className='rounded-full border border-[#cbbba4] px-3 py-2 text-sm text-[#364152] transition hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#475569] dark:text-[#e2e8f0] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]'>
              {e.name}
              {' ('}
              {e.count}
              {')'}
            </LinkModule.default>
          ))}
        </div>
        {p.length > 0 && (
          <div className='mt-6 border-t border-[#d9d0c3] pt-5 dark:border-[#334155]'>
            <div className='scholar-eyebrow scholar-sans'>
              {'Frequent Topics'}
            </div>
            <div className='mt-4 flex flex-wrap gap-2'>
              {p.map(e => (
                <LinkModule.default
                  key={e.name}
                  href={'/tag/'.concat(encodeURIComponent(e.name))}
                  className='rounded-full bg-[#fffaf0] px-3 py-2 text-xs uppercase tracking-[0.22em] text-[#7a5c3e] transition hover:bg-[#efe4d0] dark:bg-[#0f172a] dark:text-[#c9a97c] dark:hover:bg-[#1e293b]'>
                  {e.name}
                </LinkModule.default>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
export default KnowledgeHero
