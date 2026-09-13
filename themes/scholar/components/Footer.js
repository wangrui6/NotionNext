import * as BeiAnGongAnModule from '@/components/BeiAnGongAn'
import * as DarkModeButtonModule from '@/components/DarkModeButton'
import * as ConfigModule from '@/lib/config'
let Footer = e => {
  let { title: t } = e,
    n = new Date().getFullYear(),
    a = (0, ConfigModule.siteConfig)('SINCE'),
    l = parseInt(a) < n ? a + '-' + n : n
  return (
    <footer className='mx-auto mt-8 w-full max-w-5xl px-2 pb-6 pt-8 text-sm leading-7 text-[#5b6472] dark:text-[#cbd5e1]'>
      <DarkModeButtonModule.default />
      <div className='border-t border-[#d9d0c3] pt-5 dark:border-[#334155]'>
        <div className='scholar-eyebrow scholar-sans'>{'Archive Notes'}</div>
        <div className='mt-3'>
          <i className='fas fa-copyright' /> {''.concat(l)}
          <span className='mx-2'>{'•'}</span>
          <a
            href={(0, ConfigModule.siteConfig)('LINK')}
            className='font-medium text-[#7a5c3e] underline decoration-[#cbbba4] underline-offset-4 dark:text-[#c9a97c]'>
            {(0, ConfigModule.siteConfig)('AUTHOR')}
          </a>
        </div>
        <div className='mt-2 scholar-serif text-lg text-[#1f2937] dark:text-[#f8fafc]'>
          {t}
        </div>
        <div className='mt-2'>
          {'Built for deliberate reading, long-form notes, and reusable ideas.'}
        </div>
        <a
          href='https://github.com/tangly1024/NotionNext'
          className='mt-2 inline-block text-xs uppercase tracking-[0.22em] text-[#7a5c3e] dark:text-[#c9a97c]'>
          {'Powered by NotionNext '}
          {(0, ConfigModule.siteConfig)('VERSION')}
        </a>
      </div>
      {(0, ConfigModule.siteConfig)('BEI_AN') && (
        <div className='mt-3'>
          <i className='fas fa-shield-alt' />
          <a
            href={(0, ConfigModule.siteConfig)('BEI_AN_LINK')}
            className='ml-2 mr-2'>
            {(0, ConfigModule.siteConfig)('BEI_AN')}
          </a>
        </div>
      )}
      <BeiAnGongAnModule.BeiAnGongAn />
      <span className='hidden busuanzi_container_site_pv'>
        <i className='fas fa-eye' />
        <span className='px-1 busuanzi_value_site_pv'> </span>
      </span>
      <span className='pl-2 hidden busuanzi_container_site_uv'>
        <i className='fas fa-users' />
        <span className='px-1 busuanzi_value_site_uv'> </span>
      </span>
    </footer>
  )
}
export default Footer
