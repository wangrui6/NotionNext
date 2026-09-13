import * as JsxRuntimeModule from 'react/jsx-runtime'
import * as IndexModule from '../index'
import * as CatalogModule from './Catalog'
let TocDrawer = e => {
  let { post: t } = e,
    { tocVisible: i, changeTocVisible: a } = (0,
    IndexModule.useScholarGlobal)(),
    l = () => {
      a(!i)
    }
  return (
    <JsxRuntimeModule.Fragment>
      <div id='scholar-toc-float' className='fixed top-0 right-0 z-40'>
        <div
          className={
            (i ? 'animate__slideInRight ' : ' -mr-72 animate__slideOutRight') +
            ' fixed bottom-16 right-1 w-64 overflow-y-hidden rounded-[24px] border border-[#d9d0c3] bg-[#fffdf8] py-3 shadow-card duration-200 dark:border-[#334155] dark:bg-[#111827]'
          }>
          {t && (
            <JsxRuntimeModule.Fragment>
              <div className='dark:text-gray-400 text-gray-600 h-56'>
                <CatalogModule.default toc={t.toc} />
              </div>
            </JsxRuntimeModule.Fragment>
          )}
        </div>
      </div>
      <div
        id='right-drawer-background'
        className={
          (i ? 'block' : 'hidden') + ' fixed top-0 left-0 z-30 w-full h-full'
        }
        onClick={l}
      />
    </JsxRuntimeModule.Fragment>
  )
}
export default TocDrawer
