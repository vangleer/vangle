---
title: Tag 标签
lang: zh-CN
---

# Tag 标签

用于标记和选择。

## 基础用法

:::demo 由 `type` 属性来选择 tag 的类型。 也可以通过 `color` 属性来自定义背景色。

tag/basic

:::

## 可移除标签

:::demo 设置 `closable` 属性可以定义一个标签是否可移除。 它接受一个 `Boolean`。 默认的标签移除时会附带渐变动画。 如果不想使用，可以设置 `disable-transitions` 属性，它接受一个 `Boolean`，`true` 为关闭。 当 Tag 被移除时会触发 `close` 事件。

tag/removable

:::

## 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现。

:::demo

tag/editable

:::

## 主题

Tag 组件提供了三个不同的主题：`dark`、`light` 和 `plain`。

:::demo 通过设置 `effect` 属性来改变主题，默认为 `light`。

tag/theme

:::

## 圆形标签

Tag 可以向按钮组件一样变为完全圆形。

:::demo

tag/rounded

:::

## Tag 属性

| 属性名                 | 说明        | 类型      | 可选值                         | 默认值     |
| ------------------- | --------- | ------- | --------------------------- | ------- |
| type                | 类型        | string  | success/info/warning/danger | —       |
| closable            | 是否可关闭     | boolean | —                           | false   |
| disable-transitions | 是否禁用渐变动画  | boolean | —                           | false   |
| color               | 背景色       | string  | —                           | —       |
| effect              | 主题        | string  | dark / light / plain        | light   |
| round               | Tag 是否为圆形 | boolean | —                           | false   |

## Tag 事件

| 事件名   | 说明            | 参数 |
| ----- | ------------- | -- |
| click | 点击 Tag 时触发的事件 | —  |
| close | 关闭 Tag 时触发的事件 | —  |

## Tag 插槽

| 名称 | 说明      |
| -- | ------- |
| —  | 自定义默认内容 |