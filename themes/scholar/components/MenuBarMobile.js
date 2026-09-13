import * as ConfigModule from '@/lib/config'
import * as GlobalModule from '@/lib/global'
import * as ThemeConfigModule from '../config'
import * as MenuItemCollapseModule from './MenuItemCollapse'
let MenuBarMobile = e => {
  let { customMenu: t, customNav: n } = e,
    { locale: l } = (0, GlobalModule.useGlobal)(),
    c = [
      {
        name: l.COMMON.CATEGORY,
        href: '/category',
        show: (0, ConfigModule.siteConfig)(
          'SCHOLAR_MENU_CATEGORY',
          null,
          ThemeConfigModule.default
        )
      },
      {
        name: l.COMMON.TAGS,
        href: '/tag',
        show: (0, ConfigModule.siteConfig)(
          'SCHOLAR_MENU_TAG',
          null,
          ThemeConfigModule.default
        )
      },
      {
        name: l.NAV.ARCHIVE,
        href: '/archive',
        show: (0, ConfigModule.siteConfig)(
          'SCHOLAR_MENU_ARCHIVE',
          null,
          ThemeConfigModule.default
        )
      }
    ]
  return (n && (c = c.concat(n)),
  (0, ConfigModule.siteConfig)('CUSTOM_MENU') && (c = t),
  c && 0 !== c.length) ? (
    <nav id='nav' className=' text-md'>
      {null == c
        ? void 0
        : c.map((t, n) => (
            <MenuItemCollapseModule.MenuItemCollapse
              key={n}
              onHeightChange={e.onHeightChange}
              link={t}
            />
          ))}
    </nav>
  ) : null
}
export { MenuBarMobile }
