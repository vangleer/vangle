
import { PropType } from 'vue'
export const OverlayProps = {
  mask: {
    type: Boolean,
    default: true,
  },
  customMaskEvent: {
    type: Boolean,
    default: false,
  },
  overlayClass: {
    type: [String, Array, Object]
  },
  zIndex: {
    type: [String, Number] as PropType<string | number>,
    default: 2000
  }
}