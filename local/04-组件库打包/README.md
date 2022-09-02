# 手把手从零搭建一个 vue3 组件库 (四)：打包发布

前面几篇文章分享了一个组件库的搭建、组件的编写、样式的处理和编写组件库文档。

今天这篇文章主要来分享一下组件库的打包和发布

话不多说，开搞！！！

## 准备工作

- 在 packages 目录下创建 vangle目录，在这个目录下初始化要发布的 package.json
- 新建 index.ts 将 packages/components 目录下的组件全部导出，附加 install 方法注册全部组件

```typescript
export * from '../components'
import type { App, Plugin } from 'vue'

import { VanButton } from '@vangle/components'

const components = [VanButton] as Plugin[]

const INSTALLED_KEY = Symbol('INSTALLED_KEY')
export const install = (app: App) => {
  if (app[INSTALLED_KEY]) return
  app[INSTALLED_KEY] = true
  components.forEach(comp => app.use(comp))
}

export default {
  install
}
```

## 编写打包脚本

- 根目录新建 scripts/build.js
```

```

- 在 package.json 中添加打包脚本

```json
{
  "scripts": {
    "build": "node ./scripts/build.js",
  }
}
```
