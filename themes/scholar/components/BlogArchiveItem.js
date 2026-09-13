import * as LinkModule from 'next/link'
function BlogArchiveItem(e) {
  var t
  let { archiveTitle: n, archivePosts: r } = e
  return (
    <div key={n}>
      <div id={n} className='pt-16 pb-4 text-3xl dark:text-gray-300'>
        {n}
      </div>
      <ul>
        {null === (t = r[n]) || void 0 === t
          ? void 0
          : t.map(e => {
              var t
              return (
                <li
                  key={e.id}
                  className='border-l-2 p-1 text-xs md:text-base items-center  hover:scale-x-105 hover:border-gray-500 dark:hover:border-gray-300 dark:border-gray-400 transform duration-500'>
                  <div id={null == e ? void 0 : e.publishDay}>
                    <span className='text-gray-400'>
                      {null === (t = e.date) || void 0 === t
                        ? void 0
                        : t.start_date}
                    </span>{' '}
                    {'\xa0'}
                    <LinkModule.default
                      passHref={!0}
                      href={null == e ? void 0 : e.href}
                      className='dark:text-gray-400  dark:hover:text-gray-300 overflow-x-hidden hover:underline cursor-pointer text-gray-600'>
                      {e.title}
                    </LinkModule.default>
                  </div>
                </li>
              )
            })}
      </ul>
    </div>
  )
}
export default BlogArchiveItem
