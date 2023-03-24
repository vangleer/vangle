---
title: Progress 进度条
lang: zh-CN
---

# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

## 直线进度条

:::demo Progress 组件设置 `percentage` 属性即可，表示进度条对应的百分比。 该属性**必填**，并且必须在 `0-100` 的范围内。 你可以通过设置 `format` 来自定义文字显示的格式。

progress/basic

:::

## 进度条内显示百分比标识

百分比不占用额外控件，适用于文件上传等场景。

:::demo Progress 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来改变进度条内部的文字。

progress/internal-percentage

:::

## 自定义进度条的颜色

可以通过 `color` 属性来设置进度条的颜色。 该属性可以接受十六进制颜色值，函数和数组。

:::demo

progress/custom-color

:::