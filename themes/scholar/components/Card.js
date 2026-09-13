import * as JsxRuntimeModule from 'react/jsx-runtime'
const Card = e => {
  let { children: s, headerSlot: a, className: n } = e
  return (
    <div className={n}>
      <JsxRuntimeModule.Fragment>{a}</JsxRuntimeModule.Fragment>
      <section className='shadow px-2 py-4 bg-white dark:bg-gray-800 hover:shadow-xl duration-200'>
        {s}
      </section>
    </div>
  )
}
export default Card
