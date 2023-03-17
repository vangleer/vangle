import { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'


export const DatePickerProps = {
  modelValue: [String, Number, Date],
  format: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  valueFormat: String
}

export type DatePickerTypes = ExtractPropTypes<typeof DatePickerProps>

export interface DateCell {
  text?: number
  type?: string,
  disabled?: boolean,
  current?: boolean,
  date: Dayjs
}
