import * as CollapseModule from '@/components/Collapse'
import * as ConfigModule from '@/lib/config'
import * as GlobalModule from '@/lib/global'
import * as LinkModule from 'next/link'
import * as ReactModule from 'react'
import * as ThemeConfigModule from '../config'
import * as MenuBarMobileModule from './MenuBarMobile'
import * as MenuItemDropModule from './MenuItemDrop'
function TopNavBar(e) {
  let { className: t, customNav: n, customMenu: a } = e,
    [p, f] = (0, ReactModule.useState)(!1),
    h = (0, ReactModule.useRef)(null),
    { locale: g } = (0, GlobalModule.useGlobal)(),
    v = [
      {
        icon: 'fas fa-th',
        name: g.COMMON.CATEGORY,
        href: '/category',
        show: (0, ConfigModule.siteConfig)(
          'SCHOLAR_MENU_CATEGORY',
          null,
          ThemeConfigModule.default
        )
      },
      {
        icon: 'fas fa-tag',
        name: g.COMMON.TAGS,
        href: '/tag',
        show: (0, ConfigModule.siteConfig)(
          'SCHOLAR_MENU_TAG',
          null,
          ThemeConfigModule.default
        )
      },
      {
        icon: 'fas fa-archive',
        name: g.NAV.ARCHIVE,
        href: '/archive',
        show: (0, ConfigModule.siteConfig)(
          'SCHOLAR_MENU_ARCHIVE',
          null,
          ThemeConfigModule.default
        )
      },
      {
        icon: 'fas fa-search',
        name: g.NAV.SEARCH,
        href: '/search',
        show: (0, ConfigModule.siteConfig)(
          'SCHOLAR_MENU_SEARCH',
          null,
          ThemeConfigModule.default
        )
      }
    ].concat(n),
    _ = () => {
      f(!p)
    }
  return ((0, ConfigModule.siteConfig)('CUSTOM_MENU') && (v = a),
  v && 0 !== v.length) ? (
    <div
      id='top-nav'
      className={
        'sticky top-0 z-40 w-full border-b border-[#d9d0c3] bg-[#f4f1ea]/95 backdrop-blur dark:border-[#334155] dark:bg-[#111827]/95 ' +
        t
      }>
      <CollapseModule.default
        type='vertical'
        collapseRef={h}
        isOpen={p}
        className='md:hidden'>
        <div className='border-t border-[#d9d0c3] bg-[#fffdf8] px-4 py-2 dark:border-[#334155] dark:bg-[#111827]'>
          <MenuBarMobileModule.MenuBarMobile
            {...e}
            onHeightChange={e => {
              var t
              return null === (t = h.current) || void 0 === t
                ? void 0
                : t.updateCollapseHeight(e)
            }}
          />
        </div>
      </CollapseModule.default>
      <div className='mx-auto flex min-h-[5.25rem] w-full max-w-[90rem] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8'>
        <LinkModule.default href='/' className='min-w-0'>
          <div className='scholar-eyebrow scholar-sans'>
            {'Research Notebook'}
          </div>
          <div className='scholar-serif mt-2 truncate text-2xl text-[#1f2937] dark:text-[#f8fafc]'>
            {(0, ConfigModule.siteConfig)('TITLE')}
          </div>
          <div className='scholar-sans mt-1 hidden truncate text-sm text-[#5b6472] dark:text-[#cbd5e1] md:block'>
            {(0, ConfigModule.siteConfig)('DESCRIPTION') ||
              (0, ConfigModule.siteConfig)('BIO')}
          </div>
        </LinkModule.default>
        <div className='mr-1 flex items-center justify-end text-sm md:hidden'>
          <div
            onClick={_}
            className='cursor-pointer rounded-full border border-[#d9d0c3] px-3 py-2 text-[#1f2937] dark:border-[#334155] dark:text-[#f8fafc]'>
            {p ? <i className='fas fa-times' /> : <i className='fas fa-bars' />}
          </div>
        </div>
        <div className='hidden md:flex md:flex-wrap md:items-center md:gap-2'>
          {v &&
            (null == v
              ? void 0
              : v.map((e, t) => (
                  <MenuItemDropModule.MenuItemDrop key={t} link={e} />
                )))}
        </div>
      </div>
    </div>
  ) : null
}
export default TopNavBar
