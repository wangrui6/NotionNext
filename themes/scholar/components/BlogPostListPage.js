import * as ConfigModule from '@/lib/config'
import * as GlobalModule from '@/lib/global'
import * as BlogPostCardModule from './BlogPostCard'
import * as BlogPostListEmptyModule from './BlogPostListEmpty'
import * as PaginationSimpleModule from './PaginationSimple'
let BlogPostListPage = e => {
  let { page: t = 1, posts: n = [], postCount: c } = e,
    { NOTION_CONFIG: u } = (0, GlobalModule.useGlobal)(),
    d = Math.ceil(c / (0, ConfigModule.siteConfig)('POSTS_PER_PAGE', null, u))
  return n && 0 !== n.length ? (
    <div className='w-full justify-center'>
      <div id='posts-wrapper'>
        {null == n
          ? void 0
          : n.map(e => <BlogPostCardModule.default key={e.id} post={e} />)}
      </div>
      <PaginationSimpleModule.default page={t} totalPage={d} />
    </div>
  ) : (
    <BlogPostListEmptyModule.default />
  )
}
export default BlogPostListPage
