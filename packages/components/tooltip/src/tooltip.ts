import { PropType } from 'vue'
export const TooltipProps = {
  content: String,
  placement: {
    type: String,
    default: 'bottom',
  },
  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'dark'
  },
  disabled: {
    type: Boolean,
  },
  rawContent: Boolean,
  transitionName: {
    type: String,
    default: 'van-popper-fade'
  }
}