import type { PropType } from 'vue'

function typeValidator(type: string): boolean {
  return [
    'default',
    'primary',
    'info',
    'success',
    'warning',
    'danger'
  ].includes(type)
}

function sizeValidator(size: string): boolean {
  return ['normal', 'mini', 'small', 'large'].includes(size)
}

export const ButtonProps = {
  type: {
    type: String as PropType<
      'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'
    >,
    default: 'default',
    validator: typeValidator
  },
  size: {
    type: String as PropType<'normal' | 'mini' | 'small' | 'large'>,
    default: 'normal',
    validator: sizeValidator
  },
  round: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  },
  outline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String
  },
  textColor: {
    type: String
  },
  autoLoading: {
    type: Boolean,
    default: false
  },
  onClick: {
    type: Function as PropType<(e: Event) => void | Promise<any>>
  },
  onTouchstart: {
    type: Function as PropType<(e: Event) => void | Promise<any>>
  }
}
