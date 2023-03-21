---
title: Table 表格
lang: zh-CN
---

# Table 表格

用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。

## 基础表格

基础的表格展示用法。

:::demo 当 `van-table` 元素中注入 `data` 对象数组后，在 `van-table-column` 中用 `prop` 属性来对应对象中的键名即可填入数据，用 `label` 属性来定义表格的列名。 可以使用 `width` 属性来定义列宽。

table/basic

:::

## 带斑马纹表格

使用带斑马纹的表格，可以更容易区分出不同行的数据。

:::demo `stripe` 可以创建带斑马纹的表格。 如果 `true`, 表格将会带有斑马纹。

table/striped

:::

## 固定表头

纵向内容过多时，可选择固定表头。

:::demo 只要在 `van-table` 元素中定义了 `height` 属性，即可实现固定表头的表格，而不需要额外的代码。

table/fixed-header

:::

## 自定义列模板

自定义列的显示内容，可组合其他组件使用。

:::demo 通过 `slot` 可以获取到 row, column

table/custom-column

:::