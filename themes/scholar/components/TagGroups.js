import * as JsxRuntimeModule from 'react/jsx-runtime'
import * as GlobalModule from '@/lib/global'
import * as TagItemMiniModule from './TagItemMini'
let TagGroups = e => {
  let { tagOptions: t, currentTag: n } = e,
    { locale: i } = (0, GlobalModule.useGlobal)()
  return t ? (
    <div id='tags-group' className='py-1'>
      <div className='mb-3 scholar-eyebrow scholar-sans'>
        <i className='mr-2 fas fa-tag' />
        {i.COMMON.TAGS}
      </div>
      <div className='flex flex-wrap gap-2'>
        {null == t
          ? void 0
          : t.map(e => {
              let t = e.name === n
              return (
                <TagItemMiniModule.default key={e.name} tag={e} selected={t} />
              )
            })}
      </div>
    </div>
  ) : (
    <JsxRuntimeModule.Fragment />
  )
}
export default TagGroups
