import { InjectionKey, PropType, Ref, WritableComputedRef } from 'vue'
export type LabelType = string | number | boolean
export const RadioGroupProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<LabelType>
  },
  disabled: {
    type: Boolean
  },
  textColor: {
    type: String
  },
  fill: {
    type: String
  }
}
export const RadioProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<LabelType>
  },
  label: {
    type: [String, Number, Boolean] as PropType<LabelType>
  },
  disabled: {
    type: Boolean
  },
  border: {
    type: Boolean
  }
}

export interface RadioGroupContext {
  activeLabel: WritableComputedRef<LabelType | undefined>
  textColor?: string
  disabled?: boolean
  fill?: string
  handleChange: (value: LabelType) => void
}
export const RadioGroupContextKey: InjectionKey<RadioGroupContext> = Symbol('RadioGroupContextKey')