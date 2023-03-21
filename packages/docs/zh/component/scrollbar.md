---
title: Scrollbar 滚动条
lang: zh-CN
---

# Scrollbar 滚动条

用于替换浏览器原生滚动条。

## 基础用法

:::demo 通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应。

scrollbar/basic

:::

## 横向滚动

:::demo 当元素宽度大于滚动条宽度时，会显示横向滚动条。

scrollbar/horizontal-scroll

:::

## 最大高度

:::demo 当元素高度超过最大高度，才会显示滚动条。

scrollbar/max-height

:::

## 手动滚动

:::demo 通过使用 `setScrollTop` 与 `setScrollLeft` 方法，可以手动控制滚动条滚动。

scrollbar/manual-scroll

:::

## API

### Attributes

| 属性名        | 说明                                 | 类型                                                                      | 默认值   |
| ---------- | ---------------------------------- | ----------------------------------------------------------------------- | ----- |
| height     | 滚动条高度                              | ^[string] / ^[number]                                                   | —     |
| max-height | 滚动条最大高度                            | ^[string] / ^[number]                                                   | —     |
| native     | 是否使用原生滚动条样式                        | ^[boolean]                                                              | false |
| always     | 滚动条总是显示                            | ^[boolean]                                                              | false |

### Events

| 事件名    | 说明               | 类型                                                                  |
| ------ | ---------------- | ------------------------------------------------------------------- |
| scroll | 当触发滚动事件时，返回滚动的距离 | ^[Function]`({ scrollLeft: number, scrollTop: number }) => void` |

### Slots

| 插槽名     | 说明      |
| ------- | ------- |
| default | 自定义默认内容 |

### Exposes

| 名称            | 说明            | 类型                                                                             |
| ------------- | ------------- | ------------------------------------------------------------------------------ |
| handleScroll  | 触发滚动事件        | ^[Function]`() => void`                                                     |
| setScrollTop  | 设置滚动条到顶部的距离   | ^[Function]`(scrollTop: number) => void`                                    |
| setScrollLeft | 设置滚动条到左边的距离   | ^[Function]`(scrollLeft: number) => void`                                   |
| update        | 手动更新滚动条状态     | ^[Function]`() => void`                                                     |
| wrapRef       | 滚动条包裹的 ref 对象 | ^[object]`Ref<HTMLDivElement>`                                           |
