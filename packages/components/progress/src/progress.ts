import { PropType } from 'vue'
export type ProgressStatus = 'success' | 'warning' | 'info' | 'danger'
type ProgressType = 'line' | 'circle'

type Fn<T> = (percentage: number) => T

type ProgressColorItem = {
  color: string
  percentage: number
}

type ProgressColor = string | Fn<string> | ProgressColorItem[]

export const ProgressProps = {
  type: {
    type: String as PropType<ProgressType>,
    default: 'line'
  },
  percentage: {
    type: Number
  },
  format: {
    type: Function as PropType<Fn<boolean>>
  },
  status: {
    type: String as PropType<ProgressStatus>
  },
  strokeWidth: {
    type: Number,
    default: 6
  },
  textInside: Boolean,
  color: {
    type: [String, Array, Function] as PropType<ProgressColor>
  }
}