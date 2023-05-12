import { ExtractPropTypes, InjectionKey, Ref, PropType } from 'vue'
import type { Dayjs } from 'dayjs'
export const CalendarProps = {
  modelValue: [String, Number, Date],
  format: String,
  valueFormat: String,
  type: {
    type: String as PropType<'date' | 'year' | 'month'>,
    default: 'date'
  }
}


export type DatePickerTypes = ExtractPropTypes<typeof CalendarProps>
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
  day: string,
  type?: DateCellType
}