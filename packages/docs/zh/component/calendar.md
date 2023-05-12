---
title: Calendar
lang: en-US
---

# Calendar

Display date.

## Basic

:::demo Set `value` to specify the currently displayed month. If `value` is not specified, current month is displayed. `value` supports two-way binding.

calendar/basic

:::

## Custom Content

:::demo Customize what is displayed in the calendar cell by setting `scoped-slot` named `date-cell`. In `scoped-slot` you can get the date (the date of the current cell), data (including the type, isSelected, day attribute). For details, please refer to the API documentation below.

calendar/customize

:::


## API

### Attributes

| Name                  | Description                                                                                                                                                    | Type                   | Default |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------- |
| model-value / v-model | binding value                                                                                                                                                  | ^[Date]                | —       |


### Slots

| Name      | Description                                                                                                                                                                                                                                               | Type                                                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| date-cell | `type` indicates which month the date belongs, optional values are prev-month, current-month, next-month; `isSelected` indicates whether the date is selected; `day` is the formatted date in the format `YYYY-MM-DD`; `date` is date the cell represents | ^[object]`{ type: 'prev-month' \| 'current-month' \| 'next-month', isSelected: boolean, day: string, date: Date }` |
