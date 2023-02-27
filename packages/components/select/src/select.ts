import { InjectionKey, PropType, ComputedRef } from 'vue'
export type SelectValueType = string | number | boolean | Object | undefined
export const SelectProps = {
  modelValue: {
    type: [Number, String, Boolean, Object] as PropType<SelectValueType>,
    default: undefined,
  },
  placeholder: {
    type: String
  },
  clearable: Boolean,
  filterable: {
    type: Boolean
  },
  disabled: Boolean
}

export const OptionProps = {
  label: {
    type: [String, Number]
  },
  value: {
    type: [String, Number, Boolean, Object] as PropType<SelectValueType>
  },
  disabled: Boolean
}

export type SelectContextType = {
  selectValue: ComputedRef<SelectValueType>
  filterable: ComputedRef<boolean>
  onChange: (value: SelectValueType) => void
}

export const SelectContextKey: InjectionKey<SelectContextType> = Symbol('SelectContextKey')