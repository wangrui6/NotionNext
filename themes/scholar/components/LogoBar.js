import * as ConfigModule from '@/lib/config'
import * as LinkModule from 'next/link'
function LogoBar(_e) {
  return (
    <div id='top-wrapper' className='w-full flex items-center '>
      <LinkModule.default
        href='/'
        className='logo text-md md:text-xl dark:text-gray-200'>
        {(0, ConfigModule.siteConfig)('TITLE')}
      </LinkModule.default>
    </div>
  )
}
export default LogoBar
