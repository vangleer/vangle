import { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'
import type { Dayjs } from 'dayjs'


export const DatePickerProps = {
  modelValue: [String, Number, Date],
  format: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  valueFormat: String,
  disabledDate: {
    type: Function as PropType<(time: Date) => boolean>
  }
}

export type DatePickerTypes = ExtractPropTypes<typeof DatePickerProps>
export const DatePickerContextKey: InjectionKey<{
  date: Ref<Dayjs>,
  disabledDate?: (time: Date) => boolean
}> = Symbol('DatePickerContextKey')

export type DateCellType = 'normal' | 'today' | 'week' | 'next-month' | 'prev-month'
export interface DateCell {
  text?: number
  disabled?: boolean
  isSelected?: boolean
  isCurrent?: boolean
  date: Dayjs,
  type?: DateCellType
}
