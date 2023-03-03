import { ExtractPropTypes, CSSProperties, PropType } from 'vue'
export const InputProps = {
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [Number, String, Boolean, Object],
    default: ''
  },
  placeholder: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  suffixIcon: {
    type: String,
  },
  prefixIcon: {
    type: String,
  },
  showPassword: Boolean,
  autofocus: Boolean
}

export type InputTypes = ExtractPropTypes<typeof InputProps>
