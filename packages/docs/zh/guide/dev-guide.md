---
title: 本地开发
lang: zh-CN
---

# 本地开发

## 启动项目

使用命令

```shell
pnpm i
```

该项目将安装所有依赖

## 网站预览

使用命令

```shell
pnpm docs:dev
```

该项目将启动网站，网站内你可以预览全部现有组件

## 本地开发

1. 使用命令

```shell
pnpm dev
```

将启动本地开发环境

2. 将你的组件添加到 `play/src/App.vue`

> App.vue

```vue
<template>
  <ComponentYouAreDeveloping />
</template>

<script setup lang="ts">
// 要保证当前组件已注册到 @vangle/components
import { ComponentYouAreDeveloping } from '@vangle/components'
</script>
```

根据需要修改 `App.vue` 文件让开发过程顺利进行
