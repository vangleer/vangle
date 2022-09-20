# Vange

Vue3 UI Components Library

> 注：该仓库主要记录从 0 搭建一个组件库的方法，包括组件文档的编写

[在线预览](https://vangleer.github.io/vangle)

## 克隆代码到本地

```shell

# github
git clone https://github.com/vangleer/vangle.git

# gitee
git clone https://gitee.com/vangleer/vangle.git

```

## 安装依赖

```
pnpm install
```

> pnpm 版本是 6.32.6

## 快速开始

### 用法

#### 安装依赖

```
npm install vangle
```

#### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```typescript
// main.ts
import { createApp } from 'vue'
import 'vangle/dist/style.css'
import Vangle from 'vangle'
import App from './App.vue'

createApp(App).use(Vangle).mount('#app')
```
