---
title: Input 输入框
lang: zh-CN
---

# Input 输入框

通过鼠标或键盘输入字符

:::warning

Input 为受控组件，它 **总会显示 Vue 绑定值**。

在正常情况下，`input` 的输入事件应该被正常响应。 它的处理程序应该更新组件的绑定值 (或使用 `v-model`)。 否则，输入框的值将不会改变。

不支持 `v-model` 修饰符。

:::

## 基础用法

:::demo

input/basic

:::

## 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 input 组件

input/disabled

:::

## 一键清空

:::demo 使用`clearable`属性即可得到一个可一键清空的输入框

input/clearable

:::

## 密码框

:::demo 使用 `show-password` 属性即可得到一个可切换显示隐藏的密码框

input/password

:::

## 带图标的输入框

带有图标标记输入类型

:::demo 要在输入框中添加图标，你可以简单地使用 `prefix-icon` 和 `suffix-icon` 属性。 另外， `prefix` 和 `suffix` 命名的插槽也能正常工作。

input/with-icon

:::

## API

### 属性

| 属性名                   | 说明                                                                                    | 类型                                                                                                                                                    | 默认值        |
| --------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| type                  | 类型                                                                                    | ^[string]`'text' \| ...` [native input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text       |
| model-value / v-model | 绑定值                                                                                   | ^[string] / ^[number]                                                                                                                                 | —          |
| maxlength             | 最大输入长度                                                                                | ^[string] / ^[number]                                                                                                                                 | —          |
| minlength             | 原生属性，最小输入长度                                                                           | ^[number]                                                                                                                                             | —          |
| placeholder           | 输入框占位文本                                                                               | ^[string]                                                                                                                                             | —          |
| clearable             | 是否显示清除按钮，只有当 `type` 不是 textarea时生效                                                    | ^[boolean]                                                                                                                                            | false      |
| show-password         | 是否显示切换密码图标                                                                            | ^[boolean]                                                                                                                                            | false      |
| disabled              | 是否禁用                                                                                  | ^[boolean]                                                                                                                                            | false      |
| prefix-icon           | 自定义前缀图标                                                                               | ^[string] / ^[Component]                                                                                                                              | —          |
| suffix-icon           | 自定义后缀图标                                                                               | ^[string] / ^[Component]                                                                                                                              | —          |
| readonly              | 原生 ` readonly` 属性，是否只读                                                                | ^[boolean]                                                                                                                                            | false      |
| autofocus             | 原生属性，自动获取焦点                                                                           | ^[boolean]                                                                                                                                            | false      |

### 事件

| 事件名    | 说明                                     | 类型                                                 |
| ------ | -------------------------------------- | -------------------------------------------------- |
| blur   | 当选择器的输入框失去焦点时触发                        | ^[Function]`(event: FocusEvent) => void`        |
| focus  | 当选择器的输入框获得焦点时触发                        | ^[Function]`(event: FocusEvent) => void`        |
| change | 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发 | ^[Function]`(value: string \| number) => void` |
| input  | 在 Input 值改变时触发                         | ^[Function]`(value: string \| number) => void` |
| clear  | 在点击由 `clearable` 属性生成的清空按钮时触发          | ^[Function]`() => void`                         |

### 插槽

| 插槽名     | 说明                               |
| ------- | -------------------------------- |
| prefix  | 输入框头部内容 |
| suffix  | 输入框尾部内容 |

### 对外暴露的方法

| 名称             | 说明                      | 类型                                                             |
| -------------- | ----------------------- | -------------------------------------------------------------- |
| blur           | 使 input 失去焦点            | ^[Function]`() => void`                                     |
| clear          | 清除 input 值              | ^[Function]`() => void`                                     |
| focus          | 使 input 获取焦点            | ^[Function]`() => void`                                     |
| input          | Input HTML 元素           | ^[object]`Ref<HTMLInputElement>`                         |
