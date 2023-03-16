
import { PropType, InjectionKey, Ref } from 'vue'
import type { Placement, Strategy, VirtualElement } from '@floating-ui/dom'
const popperStrategies = ['absolute', 'fixed'] as const
export type TriggerType = 'hover' | 'click' | 'focus' | 'contextmenu'
const popperPlacements = [
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
  pure: {
    type: Boolean,
    default: false
  },
  content: {
    type: String
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
    values: popperPlacements,
    default: 'bottom-end',
  },
  strategy: {
    type: String as PropType<Strategy>,
    values: popperStrategies,
    default: 'absolute',
  },
  reference: {
    type: Object as PropType<HTMLElement | VirtualElement | null>,
    default: null,
  },
  offset: {
    type: Number,
    default: 10,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
  nowrap: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean
  },
  trigger: {
    type: String as PropType<TriggerType>,
    default: 'hover'
  },
  visible: {
    type: Boolean
  },
  popperClass: {
    type: String,
    default: ''
  }
}

const EventHandler = {
  type: Function as PropType<(e: Event) => boolean | void>,
} as const
export const TriggerProps = {
  nowrap: Boolean,
  onBlur: EventHandler,
  onClick: EventHandler,
  onFocus: EventHandler,
  onMouseDown: EventHandler,
  onMouseEnter: EventHandler,
  onMouseLeave: EventHandler,
  trigger: {
    type: String as PropType<TriggerType>,
    default: 'hover'
  }
}

export type PopperContext = {
  onClose: () => void
  onOpen: () => void
  triggerRef: Ref<HTMLElement | null>
}

export const PopperContextKey: InjectionKey<PopperContext> = Symbol('PopperContextKey')