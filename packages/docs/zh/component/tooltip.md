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

## Advanced usage

In addition to basic usages, there are some attributes that allow you to customize your own:

`transition` attribute allows you to customize the animation in which the tooltip shows or hides, and the default value is el-fade-in-linear.

`disabled` attribute allows you to disable `tooltip`. You just need set it to `true`.

In fact, Tooltip is an extension based on [ElPopper](https://github.com/element-plus/element-plus/tree/dev/packages/components/popper), you can use any attribute that are allowed in ElPopper.

:::demo

tooltip/advanced-usage

:::

:::tip

The `router-link` component is not supported in tooltip, please use `vm.$router.push`.

Disabled form elements are not supported for Tooltip, more information can be found at [MDN](https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter). You need to wrap the disabled form element with a container element for Tooltip to work.

:::

## HTML as content

The content attribute can be set to HTML string.

:::warning

Although `content` property supports HTML strings, dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting). So when `raw-content` is on, please make sure `content` is trusted, and **never** assign user-provided `content`.

:::

:::demo

tooltip/html-content

:::

## Attributes

| Attribute                                | Description                                                                                                                                                  | Type                       | Accepted Values                                                                                           | Default                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| effect                                   | Tooltip theme, built-in theme: `dark` / `light`                                                                                                              | string                     | string                                                                                                    | dark                                                    |
| content                                  | display content, can be overridden by `slot#content`                                                                                                         | String                     | —                                                                                                         | —                                                       |
| raw-content                              | whether `content` is treated as HTML string                                                                                                                  | boolean                    | —                                                                                                         | false                                                   |
| placement                                | position of Tooltip                                                                                                                                          | string                     | top/bottom/left/right | bottom                                                  |
| disabled                                 | whether Tooltip is disabled                                                                                                                                  | boolean                    | —                                                                                                         | false                                                   |

## Slots

| Name    | Description                            |
| ------- | -------------------------------------- |
| —       | Tooltip triggering & reference element |
| content | customize content                      |
