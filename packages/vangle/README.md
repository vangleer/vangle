<p align="center">
  <a href="https://vangleer.github.io/vangle" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://vangleer.github.io/vangle/images/logo-rect.png" alt="vangle logo">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://npmjs.com/package/vangle"><img src="https://img.shields.io/npm/v/vangle.svg" alt="npm package"></a>
  <img src="https://img.shields.io/badge/vue-v3.2.0%2B-%23407fbc" alt="vue">
  <a href="https://github.com/vangleer/vangle/actions/workflows/ci.yml"><img src="https://github.com/vangleer/vangle/actions/workflows/ci.yml/badge.svg?branch=main" alt="build status"></a>
  <img src="https://img.shields.io/github/stars/vangleer/vangle" alt="stars">
</p>
<br/>

# Vange ⚡

Vue3 UI Components Library

> 注：该仓库主要记录从 0 搭建一个组件库的方法，包括组件文档的编写

[在线预览 github](https://vangleer.github.io/vangle)

[在线预览 gitee]( http://vangleer.gitee.io/vangle)

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

## 命令介绍

```shell
# 本地开发环境
pnpm docs:dev

# 打包组件库
pnpm build

# 发布到 npm，tips: 需要将npm的registry切换到原始的（https://registry.npmjs.org/）并提前登录
pnpm release

# 工具命令: 创建要开发的组件，此命令回创建组件的基本文件和添加文档
pnpm gen ComponentName

# 工具命令: 删除组件，会删除与该组件相关的文件和文档
pnpm del ComponentName
```

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
