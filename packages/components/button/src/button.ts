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
  type: String as PropType<
    'primary' | 'info' | 'success' | 'warning' | 'danger'
  >,
  size: String as PropType<'mini' | 'small' | 'large'>,
  plain: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  text: Boolean,
  icon: String,
  color: String,
  disabled: Boolean,
  textColor: {
    type: String
  },
  ripple: {
    type: Boolean,
    default: true
  }
}
