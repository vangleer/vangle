import type { UserConfig } from 'vitepress'

export const config: UserConfig = {
  base: '/vangle/',
  title: 'Vangle',
  description: 'a Vue 3 based component library for designers and developers',
  themeConfig: {
    logo: '/images/vite.svg',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-PRESENT vangleer and Vangle contributors'
    },
    algolia: {
      apiKey: 'your_api_key',
      indexName: 'index_name'
    },
    nav: [
      { text: '指南', link: '/guide/design' },
      { text: '组件', link: '/component/button' }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/vangleer' }],
    sidebar: {
      '/guide/': [],
      '/component/': [
        {
          text: 'Basic',
          items: [
            {
              text: 'Button',
              link: '/component/button'
            }
          ]
        }
      ]
    }
  }
}

export default config
