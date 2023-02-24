---
title: Icon 图标
lang: zh-CN
---

# Icon 图标

Vangle 提供了一套常用的图标集合。

```javascript
import { createApp } from 'vue';
import { VanIcon } from 'vangle';

const app = createApp();
app.use(VanIcon);
```

## 基本使用

:::demo 使用 `name` 属性设置图标

icon/basic

:::

## 图标颜色

:::demo 使用 `color` 属性设置图标颜色

icon/color

:::

## 图标大小

:::demo 使用 `size` 属性设置图标大小

icon/size

:::



## 图标集合

<IconList />

### Attributes

| 属性名   | 说明                    | 类型                    | 默认值    |
| ----- | --------------------- | --------------------- | ------ |
| name | 图标名称         | ^[string]             | -   |
| color | svg 的 fill 颜色         | ^[string]             | 继承颜色   |
| size  | SVG 图标的大小，size x size | ^[number] / ^[string] | 继承字体大小 |

### Slots

| 名称      | 说明      |
| ------- | ------- |
| default | 自定义默认内容 |