---
title: Tooltip 文字提示
lang: zh-CN
---

# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

:::tip

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).

:::

## 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

:::demo 使用 `content` 属性来决定 `hover` 时的提示信息。 由 `placement` 属性决定展示效果： `placement`属性值为：[方向]-[对齐位置]；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。 如 `placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

tooltip/basic

:::

## 主题

Tooltip 组件内置了两个主题：`dark`和`light`。

:::tip

要使用自定义主题，您必须知道您的工具提示在哪里渲染， 如果您的工具提示被呈现为根元素，您将需要全局设置css规则。

建议您使用自定义主题并同时显示箭头时不使用线性渐变背景颜色。 因为弹出箭头和内容是两个不同的元素， 弹出箭头的样式需要单独设置， 当它到渐变背景颜色时，会看起来很奇怪。

:::

:::demo 通过设置 `effect` 来修改主题，默认值为 `dark`.

tooltip/theme

:::

## 更多内容的文字提示

展示多行文本或者是设置文本内容的格式

:::demo 用具名 slot `content`，替代`tooltip`中的`content`属性。

tooltip/rich-content

:::

## 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：

`transition` 属性可以定制显隐的动画效果，默认为`van-popper-fade`。

如果需要关闭 `tooltip` 功能，`disabled` 属性可以满足这个需求， 你只需要将其设置为 `true`。

:::demo

tooltip/advanced-usage

:::

:::tip

Tooltip 内不支持 `router-link` 组件，请使用 `vm.$router.push` 代替。

tooltip 内不支持 disabled form 元素，参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter)， 请在 disabled form 元素外层添加一层包裹元素。

:::

## 显示 HTML 内容

内容属性可以设置为 HTML 字符串。

:::warning

`content` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。 因此在 `raw-content` 打开的情况下，请确保 `content` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `content` 属性。

:::

:::demo

tooltip/html-content

:::

## 属性

| 名称                        | 说明                                                                                                 | 类型                        | 可选值                                                                                                       | 默认值                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| append-to                 | 指示 Tooltip 的内容将附加在哪一个网页元素上                                                                         | `CSS 选择器 \| HTMLElement` | —                                                                                                         | #el-popper-container-[randomValue]                                         |
| effect                    | Tooltip 主题，内置了 `dark` / `light` 两种                                                                 | string                    | dark / light                                                                                              | dark                                                                       |
| content                   | 显示的内容，也可被 `slot#content` 覆盖                                                                        | String                    | —                                                                                                         | —                                                                          |
| raw-content               | `content` 中的内容是否作为 HTML 字符串处理                                                                      | boolean                   | —                                                                                                         | false                                                                      |
| placement                 | Tooltip 组件出现的位置                                                                                    | string                    | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom                                                                     |
| visible / v-model:visible | Tooltip 组件可见性                                                                                      | boolean                   | —                                                                                                         | false                                                                      |
| disabled                  | Tooltip 组件是否禁用                                                                                     | boolean                   | —                                                                                                         | false                                                                      |


## 插槽

| 插槽名     | 说明                 |
| ------- | ------------------ |
| —       | Tooltip 触发 & 引用的元素 |
| content | 自定义内容              |

