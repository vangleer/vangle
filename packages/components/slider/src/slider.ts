import { PropType } from 'vue'
export interface ISliderProps {
  modelValue: number | number[]
  min: number
  max: number
  step: number
  showInput: boolean
  showInputControls: boolean
  inputSize: string
  showStops: boolean
  showTooltip: boolean
  formatTooltip: (val: number) => number | string
  disabled: boolean
  range: boolean
  vertical: boolean
  height: string
  debounce: number
  label: string
  tooltipClass: string
  marks?: Record<number, any>
}

export const SliderProps = {
  modelValue: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0,
  },
  min: {
    type: Number,
    default: 10,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  showInput: {
    type: Boolean,
    default: false,
  },
  showInputControls: {
    type: Boolean,
    default: true,
  },
  showStops: {
    type: Boolean,
    default: false,
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
  range: {
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
  debounce: {
    type: Number,
    default: 300,
  },
  label: {
    type: String,
    default: undefined,
  },
  tooltipClass: {
    type: String,
    default: undefined,
  },
  marks: Object,
}
