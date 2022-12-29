---
title: Tooltip
lang: en-US
---

# Tooltip

Display prompt information for mouse hover.

## Basic usage

Tooltip has 9 placements.

:::demo Use attribute `content` to set the display content when hover. The attribute `placement` determines the position of the tooltip. Its value is `[orientation]` with four orientations `top`, `left`, `right`, `bottom` 

tooltip/basic

:::

## Theme

Tooltip has two built-in themes: `dark` and `light`。

:::tip

To use customized theme, you will have to known where your tooltip is rendered into, if your tooltip is rendered into the root element, you will need to set the css rule globally.

It is recommended that not using linear gradient background color when you using customized theme and showing the arrow at the same time, because the popup arrow and the content are two different elements,
the popup arrow's style needs to be set individually, and when it comes to the gradient background color, it might seem a little bit weird.

:::

:::demo Set `effect` to modify theme, and the default value is `dark`.

tooltip/theme

:::

## More Content

Display multiple lines of text and set their format.

:::demo Override attribute `content` of `el-tooltip` by adding a slot named `content`.

tooltip/rich-content

:::