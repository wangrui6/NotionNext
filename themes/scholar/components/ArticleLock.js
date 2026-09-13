import * as GlobalModule from '@/lib/global'
import * as ReactModule from 'react'
let ArticleLock = e => {
  let { validPassword: t } = e,
    { locale: n } = (0, GlobalModule.useGlobal)(),
    i = () => {
      let e = document.getElementById('password')
      if (!t(null == e ? void 0 : e.value)) {
        let e = document.getElementById('tips')
        e &&
          ((e.innerHTML = ''),
          (e.innerHTML =
            "<div class='text-red-500 animate__shakeX animate__animated'>".concat(
              n.COMMON.PASSWORD_ERROR,
              '</div>'
            )))
      }
    },
    a = (0, ReactModule.useRef)(null)
  return (
    (0, ReactModule.useEffect)(() => {
      a.current.focus()
    }, []),
    (
      <div
        id='container'
        className='w-full flex justify-center items-center h-96 '>
        <div className='text-center space-y-3'>
          <div className='font-bold'>{n.COMMON.ARTICLE_LOCK_TIPS}</div>
          <div className='flex mx-4'>
            <input
              id='password'
              type='password'
              onKeyDown={e => {
                'Enter' === e.key && i()
              }}
              ref={a}
              className='outline-none w-full text-sm pl-5 rounded-l transition focus:shadow-lg dark:text-gray-300 font-light leading-10 text-black bg-gray-100 dark:bg-gray-500'
            />
            <div
              onClick={i}
              className='px-3 whitespace-nowrap cursor-pointer items-center justify-center py-2 bg-green-500 hover:bg-green-400 text-white rounded-r duration-300'>
              <i className='duration-200 cursor-pointer fas fa-key'>
                {'\xa0'}
                {n.COMMON.SUBMIT}
              </i>
            </div>
          </div>
          <div id='tips' />
        </div>
      </div>
    )
  )
}
export { ArticleLock }
