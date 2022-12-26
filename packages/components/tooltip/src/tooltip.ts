import { PropType } from 'vue'
export const TooltipProps = {
  content: String,
  placement: {
    type: String,
    default: 'bottom',
  },
  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light'
  }
}