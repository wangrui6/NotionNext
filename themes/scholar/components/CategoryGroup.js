import * as JsxRuntimeModule from 'react/jsx-runtime'
import * as GlobalModule from '@/lib/global'
import * as CategoryItemModule from './CategoryItem'
let CategoryGroup = e => {
  let { currentCategory: t, categoryOptions: n } = e,
    { locale: i } = (0, GlobalModule.useGlobal)()
  return n ? (
    <div id='category-list' className='pt-1'>
      <div className='mb-3 scholar-eyebrow scholar-sans'>
        <i className='mr-2 fas fa-th' />
        {i.COMMON.CATEGORY}
      </div>
      <div className='flex flex-wrap gap-2'>
        {null == n
          ? void 0
          : n.map(e => {
              let n = t === e.name
              return (
                <CategoryItemModule.default
                  key={e.name}
                  selected={n}
                  category={e.name}
                  categoryCount={e.count}
                />
              )
            })}
      </div>
    </div>
  ) : (
    <JsxRuntimeModule.Fragment />
  )
}
export default CategoryGroup
