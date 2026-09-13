import * as LinkModule from 'next/link'
import * as IndexModule from '../index'
import * as JumpToTopButtonModule from './JumpToTopButton'
function BottomMenuBar(e) {
  var t
  let { post: n, className: r } = e,
    { tocVisible: l, changeTocVisible: c } = (0,
    IndexModule.useScholarGlobal)(),
    u =
      (null == n
        ? void 0
        : null === (t = n.toc) || void 0 === t
          ? void 0
          : t.length) > 0,
    d = () => {
      c(!l)
    }
  return (
    <div
      className={
        'sticky bottom-0 z-10 w-full border-t border-[#d9d0c3] bg-[#fffdf8] dark:border-[#334155] dark:bg-[#111827] ' +
        r
      }>
      <div className='flex h-14 justify-between'>
        <LinkModule.default href='/search' passHref={!0} legacyBehavior={!0}>
          <div className='flex w-full cursor-pointer items-center justify-center text-[#475569] dark:text-[#e2e8f0]'>
            <i className='fas fa-search' />
          </div>
        </LinkModule.default>
        <div className='z-20 flex w-full cursor-pointer items-center justify-center text-[#475569] dark:text-[#e2e8f0]'>
          <JumpToTopButtonModule.default />
        </div>
        {u && (
          <div
            onClick={d}
            className='z-30 flex w-full cursor-pointer items-center justify-center text-[#475569] dark:text-[#e2e8f0]'>
            <i className='fas fa-list-ol ' />
          </div>
        )}
        {!u && (
          <LinkModule.default href='/' passHref={!0} legacyBehavior={!0}>
            <div className='flex w-full cursor-pointer items-center justify-center text-[#475569] dark:text-[#e2e8f0]'>
              <i className='fas fa-home' />
            </div>
          </LinkModule.default>
        )}
      </div>
    </div>
  )
}
export default BottomMenuBar
