---
title: Radio 单选框
lang: zh-CN
---

# Radio 单选框

在一组备选项中进行单选

## 基础用法

单选框不应该有太多的可选项， 如果你有很多的可选项你应该使用选择框而不是单选框。

:::demo 要使用 Radio 组件，只需要设置`v-model`绑定变量， 选中意味着变量的值为相应 Radio `label`属性的值， `label`可以是`String`、`Number` 或 `Boolean`。

radio/basic

:::

## 禁用状态

`disabled` 属性可以用来控制单选框的禁用状态。

:::demo 你只需要为单选框设置 `disabled` 属性就能控制其禁用状态。

radio/disabled

:::

## 单选框组

适用于在多个互斥的选项中选择的场景

:::demo 结合`van-radio-group`元素和子元素`van-radio`可以实现单选组， 为 `van-radio-group` 绑定 `v-model`，再为 每一个 `van-radio` 设置好 `label` 属性即可， 另外，还可以通过 `change` 事件来响应变化，它会传入一个参数 `value` 来表示改变之后的值。

radio/radio-button-group

:::

## 带有边框

:::demo 设置 `border` 属性为 true 可以渲染为带有边框的单选框。

radio/with-borders

:::

## color

:::demo 使用 `fill` 修改选中颜色，`text-color` 修改选中文字颜色

radio/color

:::

## Radio API

### Radio 属性

| 属性名                   | 说明           | 类型                                         | 默认    |
| --------------------- | ------------ | ------------------------------------------ | ----- |
| modvan-value / v-model | 选中项绑定值       | ^[string] / ^[number] / ^[boolean]         | —     |
| label                 | 单选框的值        | ^[string] / ^[number] / ^[boolean]         | —     |
| disabled              | 是否禁用单选框      | ^[boolean]                                 | false |
| border                | 是否显示边框       | ^[boolean]                                 | false |

### Radio 事件

| 事件名    | 说明          | 类型                                                             |
| ------ | ----------- | -------------------------------------------------------------- |
| change | 绑定值变化时触发的事件 | ^[Function]`(value: string \| number \| boolean) => void` |

### Radio 插槽

| 插槽名     | 说明      |
| ------- | ------- |
| default | 自定义默认内容 |

## RadioGroup 单选框组

### RadioGroup属性

| 属性名                   | 说明                                | 类型                                 | 默认      |
| --------------------- | --------------------------------- | ---------------------------------- | ------- |
| modvan-value / v-model | 绑定值                               | ^[string] / ^[number] / ^[boolean] | —       |
| disabled              | 是否禁用                              | ^[boolean]                         | false   |
| text-color            | 按钮形式的 Radio 激活时的文本颜色              | ^[string]                          | #ffffff |
| fill                  | 按钮形式的 Radio 激活时的填充色和边框色           | ^[string]                          | #409EFF |

### RadioGroup 事件

| 事件名    | 说明          | 类型                                                             |
| ------ | ----------- | -------------------------------------------------------------- |
| change | 绑定值变化时触发的事件 | ^[Function]`(value: string \| number \| boolean) => void` |

### RadioGroup 插槽

| 插槽名     | 说明      | 子标签                 |
| ------- | ------- | ------------------- |
| default | 自定义默认内容 | Radio |

