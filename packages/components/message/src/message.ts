import { VNode } from 'vue'
export const MessageProps = {
  message: String,
  duration: {
    type: [String, Number],
    default: 3000
  }
}
