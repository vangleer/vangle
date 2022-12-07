---
title: Dialog
lang: en-US
---

# Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

## 基础用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。

:::demo 需要设置 model-value / v-model 属性，它接收 Boolean，当为 true 时显示 Dialog。 Dialog 分为两个部分：body 和 footer，footer 需要具名为 footer 的 slot。 title 属性用于定义标题，它是可选的，默认值为空。 最后，本例还展示了 before-close 的用法。

dialog/basic

:::

:::tip

before-close 只会在用户点击关闭按钮或者对话框的遮罩区域时被调用。 如果你在 footer 具名插槽里添加了用于关闭 Dialog 的按钮，那么可以在按钮的点击回调函数里加入 before-close 的相关逻辑。

:::

## 自定义头部

:::demo header 可用于自定义显示标题的区域。 为了保持可用性，除了使用此插槽外，使用 title 属性，或使用 titleId 插槽属性来指定哪些元素应该读取为对话框标题。

dialog/custom-header

:::

## 嵌套的对话框

如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 append-to-body 属性。

:::demo 通常我们不建议使用嵌套对话框。 如果你需要在页面上呈现多个对话框，你可以简单地打平它们，以便它们彼此之间是平级关系。 将内层 Dialog 的该属性设置为 true，它就会插入至 body 元素上，从而保证内外层 Dialog 和遮罩层级关系的正确。

dialog/nested-dialog

:::

## 可拖拽对话框

试着拖动一下header部分吧

:::demo 设置draggable属性为true以做到拖拽

dialog/draggable-dialog

:::

:::tip

当设置 modal 属性为 false 时，请将 append-to-body 属性设置为 true，因为 Dialog 是通过 position: relative 来确定位置的。一旦移除了 modal 属性，Dialog 会基于当前的 DOM 元素来进行定位， 而不是基于 document.body，这会导致样式问题。

:::

## 属性

| Attribute             | Description                                                                                       | Type                                             | Accepted Values | Default |
| --------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------------- | ------- |
| model-value / v-model | visibility of Dialog                                                                              | boolean                                          | —               | —       |
| title                 | title of Dialog. Can also be passed with a named slot (see the following table)                   | string                                           | —               | —       |
| width                 | width of Dialog                                                                                   | string / number                                  | —               | 50%     |
| fullscreen            | whether the Dialog takes up full screen                                                           | boolean                                          | —               | false   |
| top                   | value for `margin-top` of Dialog CSS                                                              | string                                           | —               | 15vh    |
| modal                 | whether a mask is displayed                                                                       | boolean                                          | —               | true    |
| append-to-body        | whether to append Dialog itself to body. A nested Dialog should have this attribute set to `true` | boolean                                          | —               | false   |
| lock-scroll           | whether scroll of body is disabled while Dialog is displayed                                      | boolean                                          | —               | true    |
| custom-class          | custom class names for Dialog                                                                     | string                                           | —               | —       |
| open-delay            | Time(milliseconds) before open                                                                    | number                                           | —               | 0       |
| close-delay           | Time(milliseconds) before close                                                                   | number                                           | —               | 0       |
| close-on-click-modal  | whether the Dialog can be closed by clicking the mask                                             | boolean                                          | —               | true    |
| close-on-press-escape | whether the Dialog can be closed by pressing ESC                                                  | boolean                                          | —               | true    |
| show-close            | whether to show a close button                                                                    | boolean                                          | —               | true    |
| before-close          | callback before Dialog closes, and it will prevent Dialog from closing                            | function(done)，done is used to close the Dialog | —               | —       |
| draggable             | enable dragging feature for Dialog                                                                | boolean                                          | —               | false   |
| center                | whether to align the header and footer in center                                                  | boolean                                          | —               | false   |
| destroy-on-close      | Destroy elements in Dialog when closed                                                            | boolean                                          | —               | false   |

## 插槽

| Name   | Description                  |
| ------ | ---------------------------- |
| —      | content of Dialog            |
| header  | content of the Dialog header  |
| footer | content of the Dialog footer |

## 事件

| Event Name       | Description                                      | Parameters |
| ---------------- | ------------------------------------------------ | ---------- |
| open             | triggers when the Dialog opens                   | —          |
| opened           | triggers when the Dialog opening animation ends  | —          |
| close            | triggers when the Dialog closes                  | —          |
| closed           | triggers when the Dialog closing animation ends  | —          |
| open-auto-focus  | triggers after Dialog opens and content focused  | —          |
| close-auto-focus | triggers after Dialog closed and content focused | —          |
