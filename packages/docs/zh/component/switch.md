---
title: Switch 开关
lang: zh-CN
---

# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

:::demo 绑定 `v-model` 到一个 `Boolean` 类型的变量。 可以使用 `--van-switch-on-color` 属性与 `--van-switch-off-color` 属性来设置开关的背景色。

switch/basic

:::

## 文字描述

使用`active-text`属性与`inactive-text`属性来设置开关的文字描述。 使用 `inline-prompt` 属性来控制文本是否显示在点内。

:::demo 使用`active-text`属性与`inactive-text`属性来设置开关的文字描述。

switch/text-description

:::


## 扩展的 value 类型

:::demo 你可以设置 `active-value` 和 `inactive-value` 属性， 它们接受 `Boolean`、`String` 或 `Number` 类型的值。

switch/extended-value-types

:::

## 禁用状态

:::demo 设置`disabled`属性，接受一个`Boolean`，设置`true`即可禁用。

switch/disabled

:::

## 加载状态

:::demo 设置`loading`属性，接受一个`Boolean`，设置`true`即加载中状态。

switch/loading

:::

## 属性

| 属性名                   | 说明                                                          | 类型                                            | 可选值                     | 默认值     |
| --------------------- | ----------------------------------------------------------- | --------------------------------------------- | ----------------------- | ------- |
| model-value / v-model | 绑定值，必须等于 `active-value` 或 `inactive-value`，默认为 `Boolean` 类型 | boolean / string / number                     | —                       | —       |
| disabled              | 是否禁用                                                        | boolean                                       | —                       | false   |
| loading               | 是否显示加载中                                                     | boolean                                       | —                       | false   |
| width                 | switch 的宽度                                                  | number / string                               | —                       | —       |
| inline-prompt         | 无论图标或文本是否显示在点内，只会呈现文本的第一个字符                                 | boolean                                       | —                       | false   |
| active-text           | switch 打开时的文字描述                                             | string                                        | —                       | —       |
| inactive-text         | switch 的状态为 `off` 时的文字描述                                    | string                                        | —                       | —       |
| active-value          | switch 状态为 `on` 时的值                                         | boolean / string / number                     | —                       | true    |
| inactive-value        | switch的状态为 `off` 时的值                                        | boolean / string / number                     | —                       | false   |
| active-color          | 当在 `on` 状态时的背景颜色(已废弃，请使用 CSS var `--van-switch-on-color` )   | string                                        | —                       | —       |
| inactive-color        | `off` 状态时的背景颜色(已废弃，使用 CSS var `--van-switch-of-color` )      | string                                        | —                       | —       |

## 事件

| 事件名    | 说明                  | 回调参数      |
| ------ | ------------------- | --------- |
| change | switch 状态发生变化时的回调函数 | val，新状态的值 |

