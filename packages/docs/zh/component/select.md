---
title: Select
lang: en-US
---

# Select

When there are plenty of options, use a drop-down menu to display and select desired ones.

:::tip

This component requires the `<client-only></client-only>` wrap when used in SSR (eg: [Nuxt](https://nuxt.com/v3)) and SSG (eg: [VitePress](https://vitepress.vuejs.org/)).

:::

## Basic usage

:::demo `v-model` is the value of `el-option` that is currently selected.

select/basic

:::

## Disabled option

:::demo Set the value of `disabled` in `el-option` to `true` to disable this option.

select/disabled-option

:::

## Clearable single select

You can clear Select using a clear icon.

:::demo Set `clearable` attribute for `el-select` and a clear icon will appear. Note that `clearable` is only for single select.

select/clearable

:::

## Custom template

You can customize HTML templates for options.

:::demo Insert customized HTML templates into the slot of `el-option`.

select/custom-template

:::

## Option filtering

You can filter options for your desired ones.

:::demo Adding `filterable` to `el-select` enables filtering. By default, Select will find all the options whose `label` attribute contains the input value. If you prefer other filtering strategies, you can pass the `filter-method`. `filter-method` is a `Function` that gets called when the input value changes, and its parameter is the current input value.

select/filterable

:::