---
title: Slider 滑块
lang: zh-CN
---

# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

## 基础用法

在拖动滑块时，显示当前值

:::demo 通过设置绑定值自定义滑块的初始值

slider/basic

:::

## 垂直模式

:::demo 配置 `vertical` 属性为 `true` 启用垂直模式。 在垂直模式下，必须设置 `height` 属性。

slider/vertical-mode

:::

## 属性

| 属性名                   | 描述                                                          | 类型              | 可选值                                                                                                       | 默认值     |
| --------------------- | ----------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------- | ------- |
| model-value / v-model | 选中项绑定值                                                      | number          | —                                                                                                         | 0       |
| min                   | 最小值                                                         | number          | —                                                                                                         | 0       |
| max                   | 最大值                                                         | number          | —                                                                                                         | 100     |
| disabled              | 是否禁用                                                        | boolean         | —                                                                                                         | false   |
| show-tooltip          | 是否显示提示信息                                                    | boolean         | —                                                                                                         | true    |
| format-tooltip        | 格式化提示信息                                                     | function(value) | —                                                                                                         | —       |
| vertical              | 垂直模式                                                        | boolean         | —                                                                                                         | false   |
| height                | 滑块高度，垂直模式必填                                                 | string          | —                                                                                                         | —       |
| placement             | Tooltip 出现的位置                                               | string          | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top     |

## 事件

| 事件名    | 说明                        | 参数        |
| ------ | ------------------------- | --------- |
| change | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | val，新状态的值 |
| input  | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） | val，改变后的值 |