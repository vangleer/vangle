import { PropType } from 'vue'
export type TagType = 'primary' | 'info' | 'success' | 'warning' | 'danger' | ''
type TagEffect = 'dark' | 'light' | 'plain'
export const TagProps = {
  type: {
    type: String as PropType<TagType>,
    default: 'primary'
  },
  closable: Boolean,
  round: Boolean,
  disableTransitions: Boolean,
  effect: {
    type: String as PropType<TagEffect>,
    default: 'light'
  }
}