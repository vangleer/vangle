---
title: Icon
lang: en-US
---

# Install

Element Plus provides a set of common icons. 

```javascript
import { createApp } from 'vue';
import { VanIcon } from 'vangle';

const app = createApp();
app.use(VanIcon);
```

## Basic usage

:::demo Use name prop to set icon name

icon/basic

:::

## Icon Color

:::demo Use color prop to set icon color

icon/color

:::

## Icon Size

:::demo Use size prop to set icon size.

icon/size

:::



## Icon Collection

<IconList />

## Icon Attributes

| Attribute | Description                | Type                           | Acceptable Value | Default                |
| --------- | -------------------------- | ------------------------------ | ---------------- | ---------------------- |
| color     | SVG tag's fill attribute   | Pick\<CSSProperties, 'color'\> | -                | inherit from color     |
| size      | SVG icon size, size x size | number \| string               | -                | inherit from font size |

## Icon Slots

| Name | Description               |
| ---- | ------------------------- |
| —    | customize default content |