import { PropType } from 'vue'

export const SliderProps = {
  modelValue: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  showTooltip: {
    type: Boolean,
    default: true,
  },
  formatTooltip: {
    type: Function as PropType<(val: number) => number | string>,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: '',
  },
  placement: {
    type: String,
    default: 'top'
  },
  color: {
    type: String,
    default: ''
  }
}
