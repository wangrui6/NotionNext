import * as LazyImageModule from '@/components/LazyImage'
import * as LinkModule from 'next/link'
import * as ConfigModule from '@/lib/config'
import * as NotionIconModule from '@/components/NotionIcon'
import * as WordCountModule from '@/components/WordCount'
function ArticleInfo(e) {
  let { post: t, siteInfo: n } = e
  return (
    <header className='border-b border-[#d9d0c3] pb-8 dark:border-[#334155]'>
      <div className='scholar-eyebrow scholar-sans'>
        {(null == t ? void 0 : t.category) || 'Research Note'}
      </div>
      <h1 className='scholar-serif pt-4 text-4xl leading-tight text-[#1f2937] dark:text-[#f8fafc] md:text-5xl'>
        {(0, ConfigModule.siteConfig)('POST_TITLE_ICON') && (
          <NotionIconModule.default icon={null == t ? void 0 : t.pageIcon} />
        )}
        {null == t ? void 0 : t.title}
      </h1>
      <section className='px-1 py-4 text-sm'>
        <div className='flex flex-wrap items-center gap-3 text-[#5b6472] dark:text-[#cbd5e1]'>
          <span className='whitespace-nowrap'>
            <i className='far fa-calendar mr-2' />
            {null == t ? void 0 : t.publishDay}
          </span>
          <span className='hidden sm:inline'>{'•'}</span>
          <span className='whitespace-nowrap'>
            <i className='far fa-calendar-check mr-2' />
            {null == t ? void 0 : t.lastEditedDay}
          </span>
          <div className='hidden busuanzi_container_page_pv whitespace-nowrap'>
            <i className='mr-1 fas fa-eye' />
            <span className='busuanzi_value_page_pv' />
          </div>
        </div>
        <LinkModule.default href='/about' passHref={!0} legacyBehavior={!0}>
          <div className='mt-5 flex cursor-pointer items-center gap-3'>
            <LazyImageModule.default
              src={null == n ? void 0 : n.icon}
              className='rounded-full'
              width={38}
              alt={(0, ConfigModule.siteConfig)('AUTHOR')}
            />
            <div>
              <div className='font-medium uppercase tracking-[0.22em] text-[#7a5c3e] dark:text-[#c9a97c]'>
                {(0, ConfigModule.siteConfig)('AUTHOR')}
              </div>
              <div className='text-xs text-[#5b6472] dark:text-[#cbd5e1]'>
                {'Essays, notes, and durable ideas.'}
              </div>
            </div>
          </div>
        </LinkModule.default>
      </section>
      {(null == t ? void 0 : t.summary) && (
        <section className='mt-4 rounded-[22px] border border-[#d9d0c3] bg-[#f7f2e7] p-5 dark:border-[#334155] dark:bg-[#172033]'>
          <div className='scholar-eyebrow scholar-sans'>{'Abstract'}</div>
          <p className='scholar-sans mt-3 text-[15px] leading-8 text-[#475569] dark:text-[#cbd5e1]'>
            {t.summary}
          </p>
        </section>
      )}
      {(null == t ? void 0 : t.wordCount) &&
        (null == t ? void 0 : t.readTime) && (
          <div className='mt-5 text-sm text-[#5b6472] dark:text-[#cbd5e1]'>
            <WordCountModule.default
              wordCount={t.wordCount}
              readTime={t.readTime}
            />
          </div>
        )}
    </header>
  )
}
export default ArticleInfo
