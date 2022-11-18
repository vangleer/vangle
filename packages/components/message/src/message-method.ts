import { AppContext, createVNode, render, isVNode, VNode } from 'vue'
import { MessagePropsTypes, MessageParams, messageTypes } from './message'
import { isString } from '@vangle/utils'
import MessageContructor from './message.vue'
let seed = 1
let instances: VNode[] = []
let zIndex = 2000
function Message(options: MessageParams = {}, context?: AppContext | null) {
  console.log(options, context, 'options, context')
  if (isString(options) || isVNode(options)) {
    options = { message: options } as MessageParams
  }
  const id = `message_${seed++}`
  let offset = 20
  instances.forEach(v => {
    offset += v.el?.offsetHeight + 16
  })

  const userOnClose = options.onClose

  const props: Partial<MessagePropsTypes> = {
    ...options,
    zIndex: zIndex++,
    id,
    offset,
    onClose: () => {
      close(id, userOnClose)
    }
  }

  const vm = createVNode(MessageContructor, props)

  vm.props!.onDestroy = () => {
    render(null, container)
  }

  const container = document.createElement('div')

  render(vm, container)

  let appendTo: HTMLElement | null = document.body

  if (isString(options.appendTo)) {
    appendTo = document.querySelector(options.appendTo)
  } else if (options.appendTo && options.appendTo instanceof Element) {
    appendTo = options.appendTo
  }

  appendTo!.appendChild(container.firstElementChild!)
  instances.push(vm)
}

messageTypes.forEach(type => {
  (Message as any)[type] = (options: MessageParams = {}) => {
    if (isString(options) || isVNode(options)) {
      options = { message: options } as MessageParams
    }
    Message({ ...options, type })
  }
})

function close(id: string, userClose?: (vm: VNode) => void) {
  const idx = instances.findIndex(vm => vm.props!.id === id)
  if (idx === -1) return
  const vm = instances[idx]
  userClose && userClose(vm)
  instances.splice(idx, 1)
  const removeHeight = vm.el!.offsetHeight

  for (let i = idx; i < instances.length; i++) {
    const pos = parseInt(instances[i].el?.style.top) - removeHeight + -16

    instances[i].component!.props.offset = pos
  }
  console.log(id, '关闭了')
}

export function closeAll() {
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i].component
    console.log(instance, 'instanceinstanceinstanceinstance')
      ; (instance?.proxy as any).close()
  }
}

Message.closeAll = closeAll
export default Message