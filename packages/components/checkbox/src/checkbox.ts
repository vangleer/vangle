import { InjectionKey, ExtractPropTypes, PropType } from 'vue'
export type CheckboxValueType = string | number | boolean
export type CheckboxGroupValueType = Exclude<CheckboxValueType, boolean>[]
export const CheckboxProps = {
  modelValue: {
    type: [Number, String, Boolean] as PropType<CheckboxValueType>,
    default: undefined,
  },
  label: {
    type: [String, Boolean, Number, Object],
  },
  disabled: Boolean,
  checked: Boolean,
  name: {
    type: String,
    default: undefined,
  },
  border: Boolean,
  indeterminate: Boolean
}
export const CheckboxGroupProps = {
  modelValue: {
    type: Array as PropType<CheckboxGroupValueType>
  },
  disabled: Boolean,
  min: Number,
  max: Number,
  group: {
    type: Boolean,
    default: true
  }
}

export const checkboxGroupContextKey: InjectionKey<ExtractPropTypes<typeof CheckboxGroupProps>> =
  Symbol('checkboxGroupContextKey')