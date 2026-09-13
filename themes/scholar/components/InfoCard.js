import * as LazyImageModule from '@/components/LazyImage'
import * as RouterModule from 'next/router'
import * as SocialButtonModule from './SocialButton'
import * as ConfigModule from '@/lib/config'
let InfoCard = e => {
  let { siteInfo: t } = e
  return (
    <section id='info-card' className='scholar-sidebar-card rounded-[24px] p-5'>
      <div className='scholar-eyebrow scholar-sans'>{'Editor'}</div>
      <div className='items-center justify-center'>
        <div
          className='mt-4 flex justify-center cursor-pointer'
          onClick={() => {
            RouterModule.default.push('/about')
          }}>
          <LazyImageModule.default
            src={null == t ? void 0 : t.icon}
            className='rounded-full border border-[#d9d0c3] dark:border-[#334155]'
            width={96}
            alt={(0, ConfigModule.siteConfig)('AUTHOR')}
          />
        </div>
        <div className='scholar-serif py-3 flex justify-center text-2xl text-[#1f2937] dark:text-[#f8fafc]'>
          {(0, ConfigModule.siteConfig)('AUTHOR')}
        </div>
        <div className='scholar-sans mb-4 flex justify-center text-center text-sm leading-7 text-[#5b6472] dark:text-[#cbd5e1]'>
          {(0, ConfigModule.siteConfig)('BIO')}
        </div>
        <SocialButtonModule.default />
      </div>
    </section>
  )
}
export default InfoCard
