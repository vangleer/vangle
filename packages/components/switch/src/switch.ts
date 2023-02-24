import { PropType } from 'vue'
type ValueType = string | number | boolean
export const SwitchProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<ValueType>,
    default: false
  },
  activeValue: {
    type: [String, Number, Boolean] as PropType<ValueType>,
    default: true
  },
  inactiveValue: {
    type: [String, Number, Boolean] as PropType<ValueType>,
    default: false
  },
  activeText: String,
  inactiveText: String,
  inlinePrompt: Boolean,
  disabled: Boolean,
  loading: Boolean,
  width: {
    type: [String, Number]
  }
}