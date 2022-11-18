import { PropType, VNode, ExtractPropTypes } from 'vue'
export const messageTypes = ['success', 'info', 'warning', 'error'] as const
export const MessageProps = {
  duration: {
    type: Number,
    default: 3000
  },
  message: {
    type: [String, Object, Function] as PropType<string | VNode | (() => VNode)>
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  onClose: {
    type: Function,
    required: false,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    values: messageTypes,
    default: 'info',
  },
  offset: {
    type: Number,
    default: 20,
  },
  zIndex: {
    type: Number,
    default: 0,
  },
  grouping: {
    type: Boolean,
    default: false,
  },
  repeatNum: {
    type: Number,
    default: 1,
  }
}

export type MessagePropsTypes = ExtractPropTypes<typeof MessageProps>
export type MessageParams = Partial<MessagePropsTypes> | string | VNode | any
// export type MessageParams = { [key in string]: any }