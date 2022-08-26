import navLocale from '../i18n/pages/sidebar.json'

// Mapping the first sub link to the nav link to avoid 404 error.

function getNav() {
  return Object.entries(navLocale).map(([lang, locales]) => {
    const item: {
      link: string
      text: string
      activeMatch?: string
    }[] = Object.values(locales).map(item => ({
      ...item,
      link: `${lang}${item.link}`
    }))

    return [lang, item]
  })[0][1]
}

export const nav = getNav()
