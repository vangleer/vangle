import componentLocale from '../i18n/pages/component.json'
import guideLocale from '../i18n/pages/guide.json'

function getGuideSidebar() {
  const result = {}
  Object.entries(guideLocale).map(([lang, val]) => {
    result[`/${lang}/guide/`] = Object.values(val).map(item =>
      mapPrefix(item, lang, '/guide')
    )
  })
  return result
}

function getComponentsSideBar() {
  const result = {}
  Object.entries(componentLocale).map(([lang, val]) => {
    result[`/${lang}/component/`] = Object.values(val).map(item =>
      mapPrefix(item, lang, '/component')
    )
  })
  return result
}

// return sidebar with language configs.
// this might create duplicated data but the overhead is ignorable
const getSidebars = () => {
  return Object.assign(getGuideSidebar(), getComponentsSideBar())
}

type Item = {
  text: string
  items?: Item[]
  children?: Item[]
  link?: string
}

function mapPrefix(item: Item, lang: string, prefix = '') {
  if (item.children && item.children.length > 0) {
    const res = {
      ...item,
      items: item.children.map(child => mapPrefix(child, lang, prefix))
    }
    delete res.children
    return res
  }
  return {
    ...item,
    link: `/${lang}${prefix}${item.link}`
  }
}

export const sidebar = getSidebars()
console.log(JSON.stringify(sidebar), 'sidebar')
