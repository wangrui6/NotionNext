import * as JsxRuntimeModule from 'react/jsx-runtime'
import * as ThemeConfigModule from '../config'
import * as ConfigModule from '@/lib/config'
let JumpToTopButton = _e => {
  return (0, ConfigModule.siteConfig)(
    'SCHOLAR_WIDGET_TO_TOP',
    null,
    ThemeConfigModule.default
  ) ? (
    <div
      id='jump-to-top'
      data-aos='fade-up'
      data-aos-duration='300'
      data-aos-once='false'
      data-aos-anchor-placement='top-center'
      className='fixed bottom-24 right-4 z-20 mr-0 xl:right-80 xl:mr-10'>
      <i
        className='fas fa-chevron-up cursor-pointer rounded-full border border-[#d9d0c3] bg-[#fffdf8] p-3 text-[#475569] shadow-sm dark:border-[#334155] dark:bg-[#111827] dark:text-[#e2e8f0]'
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }}
      />
    </div>
  ) : (
    <JsxRuntimeModule.Fragment />
  )
}
export default JumpToTopButton
