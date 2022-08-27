# 手把手从零搭建一个 vue3 组件库 (三)：模拟 element-plus 组件库文档

前两天有空看了一下 element-plus 的组件库文档实现部分，在这里总结一下。
上期讲过文档项目的搭建流程，对这一部分不熟悉的朋友可以先参考参考哈

[手把手从零搭建一个 vue3 组件库 (二)：为组件编写文档](https://juejin.cn/post/7134695989687877645)

**本期任务如下：**

- 目录结构介绍
- 自定义 md 插件
- 封装 Demo 组件
- 自定义样式

[在线预览](https://vangleer.github.io/vangle)

[github 地址](https://github.com/vangleer/vangle)

[gitee 地址](https://gitee.com/vangleer/vangle)

## 前言

掘它...

## 目录结构

```
|-- docs
    |-- index.md                    // 首页展示
    |-- package.json
    |-- vite.config.ts              // vite 配置
    |-- .vitepress
    |   |-- config.ts               // vitepress 配置
    |   |-- config
    |   |   |-- nav.ts              // nav 配置
    |   |   |-- plugins.ts          // md 插件
    |   |   |-- sidebars.ts         // siderbar 配置
    |   |-- i18n                    // 国际化
    |   |   |-- pages
    |   |       |-- component.json
    |   |       |-- guide.json
    |   |       |-- sidebar.json
    |   |-- theme
    |   |   |-- index.ts
    |   |-- utils                   // 工具函数
    |   |   |-- highlight.ts        // 高亮 md
    |   |   |-- types.ts
    |   |-- vitepress
    |       |-- index.ts
    |       |-- component           // 公共组件
    |       |   |-- Demo.vue        // Demo 展示组件
    |       |-- styles              // 样式
    |           |-- app.scss
    |           |-- base.scss
    |           |-- code.scss
    |           |-- var.scss
    |-- examples                    // 组件 demo
    |   |-- button
    |       |-- basic.vue
    |-- public
    |   |-- images
    |       |-- vite.svg
    |-- zh
        |-- component               // 组件文档
        |   |-- button.md
        |-- guide                   // 指南文档
            |-- design.md

```

### 看看配置文件

```javascript
// .vitepress/config.ts
import type { UserConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'
import { sidebar } from './config/sidebars'
import { nav } from './config/nav'
export const config: UserConfig = {
  // base: '/vangle/', // 部署时的路径(默认 /)
  title: 'Vangle', // 网站标题
  description: 'a Vue 3 based component library for designers and developers', // 网站描述
  // 主题配置
  themeConfig: {
    logo: '/images/vite.svg',
    // 底部信息
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-PRESENT vangleer and Vangle contributors'
    },
    // algolia 配置
    algolia: {
      apiKey: 'your_api_key',
      indexName: 'index_name'
    },
    // 媒体连接
    socialLinks: [{ icon: 'github', link: 'https://github.com/vangleer' }],
    // 头部导航
    nav,
    // 侧边导航
    sidebar
  },
  // markdown 扩展
  markdown: {
    config: md => mdPlugin(md)
  }
}
export default config
```

> nav 和 sidebar 都是对 /i18n/pages 里对应配置的解析，解析的方式也很简单，这里就不在多说了

## 自定义 md 插件

在上面的配置中，我们要特别关注 markdown 扩展 这块，也就是 mdPlugin 方法，关于更多的扩展可以查看 [官方文档](https://vitejs.cn/vitepress/guide/markdown.html#%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE)

下面我们就来解析这个方法吧，show you the code

- Demo 组件、md、页面的对应关系

[关系图]('./images/relation.png')

- validate 的作用就是每次遇到 demo 块的时候都会执行 render 函数

```typescript
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import type Token from 'markdown-it/lib/token'
import type Renderer from 'markdown-it/lib/renderer'
import path from 'path'
import fs from 'fs'

import { highlight } from '../utils/highlight'

const localMd = MarkdownIt()

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?(
    tokens: Token[],
    index: number,
    options: any,
    env: any,
    self: Renderer
  ): string
}

export const mdPlugin = (md: MarkdownIt) => {
  md.use(mdContainer, 'div', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      /**
        :::demo Use `type`, `plain`, `round` and `circle` to define Button's style.
        button/basic
        :::
      */
      // console.log(tokens[idx].info, 'tokens, idx')

      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        // 拿到描述 Use `type`, `plain`, `round` and `circle` to define Button's style.
        const description = m && m.length > 1 ? m[1] : ''

        // 获取文件路径的 token
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        // 文件路径 button/basic
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        if (sourceFileToken.type === 'inline') {
          // 根据路径读取 examples/button/basic.vue
          source = fs.readFileSync(
            path.resolve(__dirname, '../../examples', `${sourceFile}.vue`),
            'utf-8'
          )
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

        // highlight 的作用就是将代码包裹一下，根据传递的语言加载该语言的样式
        return `<Demo source="${encodeURIComponent(
          highlight(source, 'vue')
        )}" path="${sourceFile}" raw-source="${encodeURIComponent(
          source
        )}" description="${encodeURIComponent(localMd.render(description))}">`
      } else {
        return `</Demo>`
      }
    }
  } as ContainerOpts)
}
```

### 封装 Demo 组件

- 上面的图片对应关系中已经了解了 Demo 组件，mdPlugin 返回的是 jsx 类型的组件，因此需要在 vite.config.ts 中进行配置，先安装依赖 pnpm add @vitejs/plugin-vue-jsx -D，配置如下

```typescript
// docs/vite.config.ts
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueJsx(), DefineOptions()]
})
```

- 还需要注册组件，这样我们就可以在 md 里使用了

```typescript
import { VanButton } from '@vangle/components'
import { define } from '../utils/types'
import type { Theme as ThemeType } from 'vitepress'

import { globals } from '../vitepress'

// 使用vitepress-theme-demoblock主题，并注册组件(包含主题中默认的组件)。
import Theme from 'vitepress/dist/client/theme-default/index.js'

export default define<ThemeType>({
  ...Theme,
  enhanceApp: ({ app }) => {
    app.component('VanButton', VanButton)

    globals.forEach(([name, comp]) => app.component(name, comp))
  }
})
```

## 自定义样式

- 样式目录：.vitepress/vitepress/styles

- 需要 prism-theme-vars 这个包，pnpm add prism-theme-vars

```scss
// .vitepress/vitepress/styles/code.scss

// 导入 prism-theme-vars 样式
@use 'prism-theme-vars/base.css';
@use 'prism-theme-vars/marker.css';

:root {
  --border-color: #dcdfe6;
  --bg-color: #fff;
  --van-text-color-secondary: #909399;

  --prism-marker-opacity: 0.6;
  --prism-marker-color: var(--code-text-color);
  --prism-line-height: var(--code-line-height);
}

// 覆盖需要修改的样式
html:not(.dark) {
  --prism-builtin: #3182bd;
  --prism-comment: #848486;
  --prism-deleted: #3182bd;
  --prism-function: #6196cc;
  --prism-boolean: #c25205;
  --prism-number: #c25205;
  --prism-property: #717c11;
  --prism-punctuation: #a8a9cc;
  --prism-keyword: #c792ea;
  --prism-variable: #0b8235;
  --prism-url-decoration: #67cdcc;
  --prism-symbol: green;
  --prism-selector: #0b8235;

  --code-bg-color: #f5f7fa;
}
```

## 小结：

done...

## 结束语

到这里就是本篇文章的全部内容了，如果对大家有用，希望多多支持一下，你们的支持就是我的动力呀 (●'◡'●)

等我悄悄放几个组件，下期就写一下打包吧。。。
