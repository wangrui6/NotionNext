import * as ConfigModule from '@/lib/config'
let SocialButton = () => (
  <div className='flex flex-wrap justify-center gap-3 text-lg text-[#5b6472] dark:text-[#cbd5e1]'>
    {(0, ConfigModule.siteConfig)('CONTACT_GITHUB') && (
      <a
        target='_blank'
        rel='noreferrer'
        title='github'
        href={(0, ConfigModule.siteConfig)('CONTACT_GITHUB')}>
        <i className='fab fa-github rounded-full border border-[#d9d0c3] p-3 transition duration-150 hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]' />
      </a>
    )}
    {(0, ConfigModule.siteConfig)('CONTACT_TWITTER') && (
      <a
        target='_blank'
        rel='noreferrer'
        title='twitter'
        href={(0, ConfigModule.siteConfig)('CONTACT_TWITTER')}>
        <i className='fab fa-twitter rounded-full border border-[#d9d0c3] p-3 transition duration-150 hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]' />
      </a>
    )}
    {(0, ConfigModule.siteConfig)('CONTACT_TELEGRAM') && (
      <a
        target='_blank'
        rel='noreferrer'
        href={(0, ConfigModule.siteConfig)('CONTACT_TELEGRAM')}
        title='telegram'>
        <i className='fab fa-telegram rounded-full border border-[#d9d0c3] p-3 transition duration-150 hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]' />
      </a>
    )}
    {(0, ConfigModule.siteConfig)('CONTACT_LINKEDIN') && (
      <a
        target='_blank'
        rel='noreferrer'
        href={(0, ConfigModule.siteConfig)('CONTACT_LINKEDIN')}
        title='linkedIn'>
        <i className='fab fa-linkedin rounded-full border border-[#d9d0c3] p-3 transition duration-150 hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]' />
      </a>
    )}
    {(0, ConfigModule.siteConfig)('CONTACT_WEIBO') && (
      <a
        target='_blank'
        rel='noreferrer'
        title='weibo'
        href={(0, ConfigModule.siteConfig)('CONTACT_WEIBO')}>
        <i className='fab fa-weibo rounded-full border border-[#d9d0c3] p-3 transition duration-150 hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]' />
      </a>
    )}
    {(0, ConfigModule.siteConfig)('CONTACT_INSTAGRAM') && (
      <a
        target='_blank'
        rel='noreferrer'
        title='instagram'
        href={(0, ConfigModule.siteConfig)('CONTACT_INSTAGRAM')}>
        <i className='fab fa-instagram rounded-full border border-[#d9d0c3] p-3 transition duration-150 hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]' />
      </a>
    )}
    {(0, ConfigModule.siteConfig)('CONTACT_EMAIL') && (
      <a
        target='_blank'
        rel='noreferrer'
        title='email'
        href={'mailto:'.concat((0, ConfigModule.siteConfig)('CONTACT_EMAIL'))}>
        <i className='fas fa-envelope rounded-full border border-[#d9d0c3] p-3 transition duration-150 hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]' />
      </a>
    )}
    {JSON.parse((0, ConfigModule.siteConfig)('ENABLE_RSS')) && (
      <a target='_blank' rel='noreferrer' title='RSS' href='/rss/feed.xml'>
        <i className='fas fa-rss rounded-full border border-[#d9d0c3] p-3 transition duration-150 hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]' />
      </a>
    )}
    {(0, ConfigModule.siteConfig)('CONTACT_BILIBILI') && (
      <a
        target='_blank'
        rel='noreferrer'
        title='bilibili'
        href={(0, ConfigModule.siteConfig)('CONTACT_BILIBILI')}>
        <i className='fab fa-bilibili rounded-full border border-[#d9d0c3] p-3 transition duration-150 hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]' />
      </a>
    )}
    {(0, ConfigModule.siteConfig)('CONTACT_YOUTUBE') && (
      <a
        target='_blank'
        rel='noreferrer'
        title='youtube'
        href={(0, ConfigModule.siteConfig)('CONTACT_YOUTUBE')}>
        <i className='fab fa-youtube rounded-full border border-[#d9d0c3] p-3 transition duration-150 hover:border-[#7a5c3e] hover:text-[#7a5c3e] dark:border-[#334155] dark:hover:border-[#c9a97c] dark:hover:text-[#f8fafc]' />
      </a>
    )}
  </div>
)
export default SocialButton
