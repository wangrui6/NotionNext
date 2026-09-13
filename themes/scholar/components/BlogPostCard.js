import * as LazyImageModule from '@/components/LazyImage'
import * as NotionIconModule from '@/components/NotionIcon'
import * as WordCountModule from '@/components/WordCount'
import * as ConfigModule from '@/lib/config'
import * as LinkModule from 'next/link'
import * as ThemeConfigModule from '../config'
import * as CategoryItemModule from './CategoryItem'
import * as TagItemMiniModule from './TagItemMini'
let BlogPostCard = e => {
  var t, n
  let { post: l } = e,
    p =
      (0, ConfigModule.siteConfig)(
        'SCHOLAR_POST_LIST_COVER',
        null,
        ThemeConfigModule.default
      ) && (null == l ? void 0 : l.pageCoverThumbnail),
    f =
      (null == l ? void 0 : l.href) ||
      ((null == l ? void 0 : l.slug) ? '/'.concat(l.slug) : '#'),
    h = (null == l ? void 0 : l.title) || 'Untitled Entry'
  return (
    <article
      key={l.id}
      data-aos='fade-up'
      data-aos-duration='300'
      data-aos-once='false'
      data-aos-anchor-placement='top-bottom'
      className='mb-6 rounded-[26px] border border-[#d9d0c3] bg-[#fffdf8] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:border-[#334155] dark:bg-[#111827]'>
      <div
        className={'grid gap-6 '.concat(
          p ? 'lg:grid-cols-[minmax(0,1.35fr)_18rem]' : ''
        )}>
        <div className='min-w-0'>
          <div className='flex flex-wrap gap-2 text-[0.68rem] uppercase tracking-[0.3em] text-[#7a5c3e] dark:text-[#c9a97c]'>
            <span>{(null == l ? void 0 : l.category) || 'Essay'}</span>
            <span>
              {(null == l ? void 0 : l.publishDay) ||
                (null == l
                  ? void 0
                  : null === (t = l.date) || void 0 === t
                    ? void 0
                    : t.start_date) ||
                (null == l ? void 0 : l.lastEditedDay)}
            </span>
          </div>
          <h2 className='scholar-serif mt-4 text-3xl leading-tight text-[#1f2937] dark:text-[#f8fafc]'>
            <LinkModule.default
              href={f}
              passHref={!0}
              className='transition hover:text-[#7a5c3e] dark:hover:text-[#e2c39a]'>
              {(0, ConfigModule.siteConfig)('POST_TITLE_ICON') && (
                <NotionIconModule.default icon={l.pageIcon} />
              )}
              {h}
            </LinkModule.default>
          </h2>
          <div className='mt-5 flex flex-wrap gap-2'>
            {(0, ConfigModule.siteConfig)(
              'SCHOLAR_POST_LIST_CATEGORY',
              null,
              ThemeConfigModule.default
            ) &&
              (null == l ? void 0 : l.category) && (
                <CategoryItemModule.default category={l.category} />
              )}
            {(0, ConfigModule.siteConfig)(
              'SCHOLAR_POST_LIST_TAG',
              null,
              ThemeConfigModule.default
            ) &&
              (null == l
                ? void 0
                : null === (n = l.tagItems) || void 0 === n
                  ? void 0
                  : n
                      .slice(0, 3)
                      .map(e => (
                        <TagItemMiniModule.default key={e.name} tag={e} />
                      )))}
          </div>
          <div className='mt-6 text-[0.68rem] uppercase tracking-[0.3em] text-[#7a5c3e] dark:text-[#c9a97c]'>
            {'Abstract'}
          </div>
          <p className='scholar-sans mt-3 text-[15px] leading-8 text-[#475569] dark:text-[#cbd5e1]'>
            {l.summary ||
              'A concise note from the archive, structured for deliberate reading.'}
          </p>
          <div className='mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#ece3d5] pt-5 dark:border-[#334155]'>
            {(null == l ? void 0 : l.wordCount) &&
            (null == l ? void 0 : l.readTime) ? (
              <div className='text-sm text-[#5b6472] dark:text-[#cbd5e1]'>
                <WordCountModule.default
                  wordCount={l.wordCount}
                  readTime={l.readTime}
                />
              </div>
            ) : (
              <div />
            )}
            <LinkModule.default
              href={f}
              passHref={!0}
              className='inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-[#7a5c3e] transition hover:gap-3 dark:text-[#c9a97c]'>
              {'Read Essay'}
              <i className='fas fa-arrow-right text-xs' />
            </LinkModule.default>
          </div>
        </div>
        {p && (
          <LinkModule.default
            href={f}
            passHref={!0}
            className='group overflow-hidden rounded-[22px] border border-[#ece3d5] bg-[#f7f2e7] dark:border-[#334155] dark:bg-[#172033]'>
            <div className='h-full min-h-56 w-full overflow-hidden'>
              <LazyImageModule.default
                src={l.pageCoverThumbnail}
                style={
                  l.pageCoverThumbnail
                    ? {}
                    : {
                        height: '0px'
                      }
                }
                className='h-full w-full object-cover duration-500 group-hover:scale-105'
                alt={''.concat(h, ' cover image')}
                title={h}
              />
            </div>
          </LinkModule.default>
        )}
      </div>
    </article>
  )
}
export default BlogPostCard
