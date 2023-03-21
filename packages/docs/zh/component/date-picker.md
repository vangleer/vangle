---
title: DatePicker 日期选择器
lang: zh-CN
---

# DatePicker 日期选择器

用于选择或输入日期

## 选择某一天

以”日“为基本单位，基础的日期选择控件

:::demo 基本单位由 `type` 属性指定。 通过 `shortcuts` 配置快捷选项， 通过 `disabledDate` 函数，来设置禁用掉的日期。

date-picker/basic

:::

## 其他日期单位

通过扩展基础的日期选择，可以选择周、月、年或多个日期

:::demo

date-picker/other-measurements

:::

## 日期格式

使用`format`指定输入框的格式。 使用 `value-format` 指定绑定值的格式。

默认情况下，组件接受并返回`Date`对象。

在 [这里](https://day.js.org/docs/en/display/format#list-of-all-available-formats) 查看 Day.js 支持的所有格式。

:::warning

请一定要注意传入参数的大小写是否正确

:::

:::demo

date-picker/date-formats

:::

## 设置自定义前缀的内容

前缀内容可以被自定义。

:::demo 当你从其他vue组件或由渲染函数生成的组件中导入组件时, 你可以设置 `prefix-icon` 属性来定制前缀内容

date-picker/custom-prefix-icon

:::

## Attributes

| 属性名                   | 说明                                                              | 类型                                                        | 可选值                                                                      | 默认值         |
| --------------------- | --------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------ | ----------- |
| model-value / v-model | 绑定值，如果它是数组，长度应该是 2                                              | Date / number / string / Array                            | —                                                                        | —           |
| readonly              | 只读                                                              | boolean                                                   | —                                                                        | false       |
| disabled              | 禁用                                                              | boolean                                                   | —                                                                        | false       |
| editable              | 文本框可输入                                                          | boolean                                                   | —                                                                        | true        |
| clearable             | 是否显示清除按钮                                                        | boolean                                                   | —                                                                        | true        |
| placeholder           | 非范围选择时的占位内容                                                     | string                                                    | —                                                                        | —           |
| type                  | 显示类型                                                            | string                                                    | year/month/date | date        |
| format                | 显示在输入框中的格式                                                      | string                                                    | 请查看 [date formats](/zh/component/date-picker#date-formats)            | YYYY-MM-DD  |
| value-format          | 可选，绑定值的格式。 不指定则绑定值为 Date 对象                                     | string                                                    | 请查看 [date formats](/zh/component/date-picker#date-formats)            | —           |
| id                    | 等价于原生 input `id` 属性                                             | string / [string, string]                                 | —                                                                        | —           |
| name                  | 等价于原生 input `name` 属性                                           | string                                                    | —                                                                        | —           |
| prefix-icon           | 自定义前缀图标                                                         | `string \| Component`                                    | —                                                                        | Date        |
| disabled-date         | 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。           | function                                                  | —                                                                        | —           |
| shortcuts             | 设置快捷选项，需要传入数组对象                                                 | `Array<{ text: string, value: Date \| Function }>` | —                                                                        | —           |

## Events

| 事件名             | 说明                                                       | 回调参数                    |
| --------------- | -------------------------------------------------------- | ----------------------- |
| change          | 用户确认选定的值时触发                                              | `(val: typeof v-model)` |



