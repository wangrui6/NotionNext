import * as RouterModule from 'next/router'
import * as ReactModule from 'react'
let i = !1,
  SearchInput = e => {
    let { currentSearch: n, cRef: a, className: l } = e,
      [c, u] = (0, ReactModule.useState)(!1),
      d = (0, RouterModule.useRouter)(),
      m = (0, ReactModule.useRef)()
    ;(0, ReactModule.useImperativeHandle)(a, () => ({
      focus: () => {
        var e
        null == m || null === (e = m.current) || void 0 === e || e.focus()
      }
    }))
    let p = () => {
        var e
        let t =
          null === (e = m.current.value) || void 0 === e ? void 0 : e.trim()
        t && '' !== t
          ? (u(!0),
            d.push('/search/'.concat(encodeURIComponent(t))).then(() => {}))
          : d
              .push({
                pathname: '/'
              })
              .then(() => {})
      },
      f = e => {
        13 === e.keyCode ? p(m.current.value) : 27 === e.keyCode && h()
      },
      h = () => {
        m.current.value = ''
      },
      [g, v] = (0, ReactModule.useState)(!1),
      _ = e => {
        i || ((m.current.value = e), e ? v(!0) : v(!1))
      }
    function T() {
      i = !0
    }
    function E() {
      i = !1
    }
    return (
      <div
        className={
          'flex w-full rounded-full border border-[#d9d0c3] bg-[#fffaf0] px-3 dark:border-[#334155] dark:bg-[#0f172a] ' +
          l
        }>
        <input
          ref={m}
          type='text'
          className='w-full bg-transparent pl-2 text-sm leading-[2.9rem] text-[#1f2937] outline-none transition placeholder:text-[#94a3b8] dark:text-white'
          onKeyUp={f}
          onCompositionStart={T}
          onCompositionUpdate={T}
          onCompositionEnd={E}
          onChange={e => _(e.target.value)}
          defaultValue={n}
          placeholder='Search essays, notes, and topics'
        />
        <div
          className='-ml-8 cursor-pointer float-right items-center justify-center py-3'
          onClick={p}>
          <i
            className={'cursor-pointer text-[#7a5c3e] duration-200 dark:text-[#c9a97c] fas '.concat(
              c ? 'fa-spinner animate-spin' : 'fa-search',
              ' '
            )}
          />
        </div>
        {g && (
          <div className='-ml-12 cursor-pointer float-right items-center justify-center py-3'>
            <i
              className='fas fa-times cursor-pointer text-[#94a3b8] duration-200 hover:text-[#1f2937] dark:hover:text-white'
              onClick={h}
            />
          </div>
        )}
      </div>
    )
  }
export default SearchInput
