---
title: Button
lang: en-US
---

# Button

Commonly used button.

## Basic usage

:::demo Use `type`, `plain`, `round` and `circle` to define Button's style.

button/basic

:::

## Disabled Button

The `disabled` attribute determines if the button is disabled.

:::demo Use `disabled` attribute to determine whether a button is disabled. It accepts a `Boolean` value.

button/disabled

:::

## Text Button

Buttons without border and background.

:::demo

button/text

:::

## Sizes

Besides default size, Button component provides three additional sizes for you to choose among different scenarios.

:::demo Use attribute `size` to set additional sizes with `large`, `small`.

button/size

:::

## Custom Color

You can custom button color.

We will calculate hover color & active color automatically.

:::demo

button/custom

:::

## Button Attributes

| Attribute         | Description                                                 | Type               | Accepted Values                                    | Default |
| ----------------- | ----------------------------------------------------------- | ------------------ | -------------------------------------------------- | ------- |
| size              | button size                                                 | string             | large / default /small                             | —       |
| type              | button type                                                 | string             | primary / success / warning / danger / info / text | —       |
| plain             | determine whether it's a plain button                       | boolean            | —                                                  | false   |
| round             | determine whether it's a round button                       | boolean            | —                                                  | false   |
| circle            | determine whether it's a circle button                      | boolean            | —                                                  | false   |
| disabled          | disable the button                                          | boolean            | —                                                  | false   |

## Button Slots

| Name    | Description                 |
| ------- | --------------------------- |
| —       | customize default content   |
