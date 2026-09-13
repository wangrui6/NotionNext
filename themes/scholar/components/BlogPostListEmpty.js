import * as GlobalModule from '@/lib/global'
let BlogPostListEmpty = e => {
  let { currentSearch: t } = e,
    { locale: n } = (0, GlobalModule.useGlobal)()
  return (
    <div className='flex w-full items-center justify-center min-h-screen mx-auto md:-mt-20'>
      <p className='text-gray-500 dark:text-gray-300'>
        {n.COMMON.NO_RESULTS_FOUND} {t && <div>{t}</div>}
      </p>
    </div>
  )
}
export default BlogPostListEmpty
