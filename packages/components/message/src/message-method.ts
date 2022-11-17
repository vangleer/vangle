import { AppContext, createVNode, h, render } from 'vue'
import MessageContructor from './message.vue'
function Message(options = {}, context?: AppContext | null) {
  console.log(options, context, 'options, context')

  const vm = createVNode(MessageContructor, {
    message: options
  })

  console.log(vm, 'vmvmvmvmvm')
  const container = document.createElement('div')

  render(vm, container)

  const appendTo = document.body

  appendTo.appendChild(container.firstElementChild!)
}

export default Message