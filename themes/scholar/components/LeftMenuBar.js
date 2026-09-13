import * as LinkModule from 'next/link'
function LeftMenuBar() {
  return (
    <div className='w-20  border-r hidden lg:block pt-12'>
      <section>
        <LinkModule.default href='/' legacyBehavior={!0}>
          <div className='text-center cursor-pointer  hover:text-black'>
            <i className='fas fa-home text-gray-500' />
          </div>
        </LinkModule.default>
      </section>
    </div>
  )
}
export default LeftMenuBar
