
import { PropType, InjectionKey, Ref } from 'vue'
import type { Placement, Strategy, VirtualElement } from '@floating-ui/dom'
const tooltipV2Strategies = ['absolute', 'fixed'] as const

const tooltipV2Placements = [
  'top-start',
  'top-end',
  'top',
  'bottom-start',
  'bottom-end',
  'bottom',
  'left-start',
  'left-end',
  'left',
  'right-start',
  'right-end',
  'right',
] as const
export const PopperProps = {
  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'dark'
  },
  arrowPadding: {
    type: Number,
    default: 5,
  },
  transitionName: {
    type: String,
    default: 'van-popper-fade'
  },
  placement: {
    type: String as PropType<Placement>,
    values: tooltipV2Placements,
    default: 'bottom-end',
  },
  strategy: {
    type: String as PropType<Strategy>,
    values: tooltipV2Strategies,
    default: 'absolute',
  },
  reference: {
    type: Object as PropType<HTMLElement | VirtualElement | null>,
    default: null,
  },
  offset: {
    type: Number,
    default: 8,
  },
  showArrow: {
    type: Boolean,
    default: true,
  }
}

export type PopperContext = {
  onClose: () => void
  onOpen: () => void
  triggerRef: Ref<HTMLElement | null>
}

export const PopperContextKey: InjectionKey<PopperContext> = Symbol('PopperContextKey')