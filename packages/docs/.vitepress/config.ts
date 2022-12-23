import type { UserConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'
import { sidebar } from './config/sidebars'
import { nav } from './config/nav'
const isProd = process.env.NODE_ENV === 'production'
export const config: UserConfig = {
  base: isProd ? '/vangle/' : '',
  title: 'Vangle',
  description: 'a Vue 3 based component library for designers and developers',
  themeConfig: {
    logo: '/images/logo.png',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-PRESENT vangleer and Vangle contributors'
    },
    algolia: {
      apiKey: 'your_api_key',
      indexName: 'index_name'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vangleer' }],
    nav,
    sidebar
  },
  markdown: {
    config: md => mdPlugin(md)
  }
}

export default config
