---
title: Select 选择器
lang: zh-CN
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

:::demo 适用广泛的基础单选 `v-model` 的值为当前被选中的 `van-option` 的 value 属性值

select/basic

:::

## 有禁用选项

:::demo 在 `van-option` 中，设定 `disabled` 值为 true，即可禁用该选项

select/disabled-option

:::

## 禁用状态

禁用整个选择器组件

:::demo 为 `van-select` 设置 `disabled`属性，则整个选择器不可用。

select/disabled

:::

## 可清空单选

您可以使用清除图标来清除选择。

:::demo 为 `van-select` 设置 `clearable` 属性，则可将选择器清空。 需要注意的是，`clearable` 属性仅适用于单选。

select/clearable

:::

## 自定义模板

你可以自定义如何来渲染每一个选项。

:::demo 将自定义的 HTML 模板插入 `van-option` 的 slot 中即可。

select/custom-template

:::

## 筛选选项

可以利用筛选功能快速查找选项。

:::demo 为`van-select`添加`filterable`属性即可启用搜索功能。 默认情况下，Select 会找出所有 `label` 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 `filter-method` 来实现。 `filter-method` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。

select/filterable

:::

## Select 属性

| 属性名                                | 说明                                                             | 类型                                         | 可选值                                                                                                       | 默认值              |
| ---------------------------------- | -------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ---------------- |
| model-value / v-model              | 选中项绑定值                                                         | array / string / number / boolean / object | —                                                                                                         | —                |
| disabled                           | 是否禁用                                                           | boolean                                    | true / false                                                                                              | false            |
| clearable                          | 是否可以清空选项                                                       | boolean                                    | true / false                                                                                              | false            |
| placeholder                        | 占位文字                                                           | string                                     | —                                                                                                         | Select           |
| filterable                         | Select 组件是否可筛选                                                 | boolean                                    | true / false                                                                                              | false            |


## Select 事件

| 事件名            | 说明                   | 回调参数                     |
| -------------- | -------------------- | ------------------------ |
| change         | 选中值发生变化时触发           | val，目前的选中值               |

## Select 插槽

| 插槽名    | 说明            | 子标签                   |
| ------ | ------------- | --------------------- |
| —      | Option 组件列表   | Option |


## Option 属性

| 属性名      | 说明                      | 类型                                 | 可选值 | 默认值   |
| -------- | ----------------------- | ---------------------------------- | --- | ----- |
| value    | 选项的值                    | string / number / boolean / object | —   | —     |
| label    | 选项的标签，若不设置则默认与`value`相同 | string/number                      | —   | —     |
| disabled | 是否禁用该选项                 | boolean                            | —   | false |

## Option 插槽

| 插槽名 | 说明   |
| --- | ---- |
| —   | 默认插槽 |

