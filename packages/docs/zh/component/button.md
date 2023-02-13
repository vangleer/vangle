---
title: Button 按钮
lang: zh-CN
---

# Button 按钮

常用的操作按钮。

## 基础用法

:::demo 使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

button/basic

:::

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

:::demo 使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 `Boolean` 类型的值。

button/disabled

:::

## 文字按钮

没有边框和背景色的按钮。

:::demo

button/text

:::

## 调整尺寸

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。

:::demo 使用 `size` 属性额外配置尺寸，可使用 `large`和`small`两种值。

button/size

:::

## 自定义颜色

您可以自定义按钮颜色。

我们将自动计算 hover 和 active 颜色。

:::demo

button/custom

:::

## Button Attributes

| Attribute         | Description                                                 | Type               | Accepted Values                                    | Default |
| ----------------- | ----------------------------------------------------------- | ------------------ | -------------------------------------------------- | ------- |
| size              | button size                                                 | string             | large / default /small                             | —       |
| type              | button type                                                 | string             | primary / success / warning / danger / info / text | —       |
| plain             | determine whether it's a plain button                       | boolean            | —                                                  | false   |
| round             | determine whether it's a round button                       | boolean            | —                                                  | false   |
| circle            | determine whether it's a circle button                      | boolean            | —                                                  | false   |
| disabled          | disable the button                                          | boolean            | —                                                  | false   |

### Button 插槽

| 插槽名     | 说明       |
| ------- | -------- |
| default | 自定义默认内容  |

