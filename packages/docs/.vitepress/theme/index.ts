import * as Vangle from '@vangle/components'
import { define } from '../utils/types'
import type { Theme as ThemeType } from 'vitepress'

import { globals } from '../vitepress'

// 使用vitepress-theme-demoblock主题，并注册组件(包含主题中默认的组件)。
import Theme from 'vitepress/dist/client/theme-default/index.js'

export default define<ThemeType>({
  ...Theme,
  enhanceApp: ({ app }) => {
    Object.keys(Vangle).forEach(key => {
      if (key.startsWith('Van') && Vangle[key].name) {
        app.component(Vangle[key].name, Vangle[key])
      }
    })
    globals.forEach(([name, comp]) => app.component(name, comp))
  }
})
