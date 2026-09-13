import * as ReactModule from 'react'
function RevolverMaps() {
  let [e, r] = (0, ReactModule.useState)(!1)
  return (
    (0, ReactModule.useEffect)(() => {
      var t
      e ||
        (screen.width >= 768 &&
          Promise.all([
            ((t =
              'https://rf.revolvermaps.com/0/0/8.js?i=5jnp1havmh9&amp;m=0&amp;c=ff0000&amp;cr1=ffffff&amp;f=arial&amp;l=33'),
            new Promise((e, r) => {
              let a = document.getElementById('revolvermaps'),
                n = document.createElement('script')
              ;(n.src = t),
                n &&
                  ((n.onload = () => e(t)),
                  (n.onerror = () => r(t)),
                  a.appendChild(n))
            }))
          ]).then(() => {}),
        r(!0))
    }),
    (<div id='revolvermaps' className='p-4' />)
  )
}
export default RevolverMaps
