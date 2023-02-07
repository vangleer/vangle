# 手把手从零搭建一个 vue3 组件库 (五)：封装 Message 组件

[在线预览](https://vangleer.github.io/vangle)

[github 地址](https://github.com/vangleer/vangle)

[gitee 地址](https://gitee.com/vangleer/vangle)

## Message 目录结构

```
|-- message
    |-- index.ts 添加install方法导出
    |-- src
        |-- message-method.ts message方法
        |-- message.ts prop类型
        |-- message.vue 模板
        |-- message.less 样式
```

### 使用脚本创建组件的基本目录结构和文档结构

在 vangel 的 package.json 中有几个脚本命令
```json
"scripts": {
  "gen": "node ./scripts/gen.js", // 创建组件
  "del": "node ./scripts/del.js", // 删除组件 pnpm del ComponentName
}
```

- 创建组件 `pnpm gen ComponentName` 创建该组件相关文件和组件文档相关文件
- 删除组件 `pnpm del ComponentName` 删除该组件相关文件和组件文档相关文件

## 大体流程

1. 准备props类型文件 `src/message-method.ts`
2. 准备vue模板和样式，使用vue自带Transition组件添加动画
3. Message方法，使用vue提供的 createVNode 创建 vnode，render 挂载和销毁实例

## 准备props类型文件 `src/message-method.ts`
```ts
import { PropType, VNode, ExtractPropTypes, AppContext } from 'vue'
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
  }
}

export interface MessageHandle {
  close: () => void
}
export type MessageFn = ((
  options?: MessageParams,
  appContext?: null | AppContext
) => MessageHandle) & {
  closeAll(): void
}
export type MessagePropsTypes = ExtractPropTypes<typeof MessageProps>
export type MessageParams = Partial<MessagePropsTypes> | string | VNode | any
export type MessageOptionsTyped = Omit<MessagePropsTypes, 'type'>
export type MessageParamsTyped = Partial<MessageOptionsTyped> | string | VNode
export type MessageTypedFn = (
  options?: MessageParamsTyped,
  appContext?: null | AppContext
) => MessageHandle
export interface Message extends MessageFn {
  success: MessageTypedFn
  warning: MessageTypedFn
  info: MessageTypedFn
  error: MessageTypedFn
}
```

## 准备模板和样式

### 模板 `src/message.vue`
```html
<template>
  <Transition name="message-fade" @before-leave="beforeLeave" @after-leave="emit('destroy')">
    <div v-show="visible" :id="id" :class="[n(), type && n('--' + type)]" :style="styles">
      <VanIcon :name="(icon || iconMap[type])" />
      <div v-if="!dangerouslyUseHTMLString" :class="n('content')">
        <slot>{{ message }}</slot>
      </div>
      <div v-else :class="n('content')" v-html="message"></div>
      <div v-if="showClose" :class="n('closeBtn')" @click="close">
        <VanIcon name="close" />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, ref, computed } from 'vue'
import { createNamespace } from '@vangle/utils'
import { VanIcon } from '@vangle/components'
import { MessageProps } from './message'
defineOptions({
  name: 'VanMessage'
})
const iconMap: any = {
  info: 'info-filled',
  success: 'circle-check-filled',
  warning: 'warning-filled',
  error: 'circle-close-filled'
}
const props = defineProps(MessageProps)
const emit = defineEmits(['destroy', 'close'])

const { n } = createNamespace('message')
const visible = ref(false)
const timerId = ref()

const styles = computed(() => ({
  top: props.offset + 'px',
  zIndex: props.zIndex
}))

const startTimer = () => {
  timerId.value = setTimeout(() => {
    visible.value = false
  }, props.duration)
}

const clearTimer = () => {
  if (timerId.value) {
    clearTimeout(timerId.value)
    timerId.value = undefined
  }
}

const close = () => visible.value = false

const beforeLeave = () => {
  emit('close')
}

onMounted(() => {
  startTimer()
  visible.value = true
})

onBeforeMount(() => {
  clearTimer()
})

defineExpose({
  visible,
  close
})
</script>

<style lang="less">
@import './message.less';
</style>
```
注意Transition的两个事件 before-leave、after-leave

- before-leave 将 visible 设置为false，关闭消息框，开始关闭的动画
- after-leave 动画执行完毕触发 destroy 事件 emit('destroy')，这个事件我们需要定义到实例上，见下面Message方法

### 样式 src/message.less
```less
@import '../../styles/var.less';

.van-message {
  --van-message-padding: var(--van-padding-middle);
  --van-message-bg: #fff;
  color: var(--van-message-color);
  width: fit-content;
  max-width: calc(100% - 32px);
  box-sizing: border-box;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translate(-50%);
  background-color: var(--van-message-bg);
  z-index: 2000;
  transition: opacity .3s, transform .3s, top .3s;
  padding: var(--van-message-padding);
  border-radius: var(--van-radius-base);
  display: flex;
  align-items: center;
  box-shadow: 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  pointer-events: all;

  // Font
  each(@types, {
    &--@{value} {
      --van-message-color: ~'var(--van-color-@{value})';
    }
  });

&--error {
  --van-message-color: ~'var(--van-color-danger)';
}

&__content {
  margin-left: 10px;
}

&__closeBtn {
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
}

.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
```

## Message方法 src/message-method.ts
```ts
import { AppContext, createVNode, render, isVNode, VNode, ComponentPublicInstance } from 'vue'
import { MessagePropsTypes, MessageParams, messageTypes, MessageFn, Message } from './message'
import { isString, isFunction } from '@vangle/utils'
import MessageContructor from './message.vue'
let seed = 1
let instances: VNode[] = []
let zIndex = 2000

const open = () => {
  
}


const message: MessageFn & Partial<Message> = function (options: MessageParams = {}, context?: AppContext | null) {
  /*
    VanMessage({
      message: h('p', null, [
        h('span', null, 'Message can be '),
        h('i', { style: 'color: teal' }, 'VNode'),
      ]),
    })
    VanMessage('this is a message.')
   */
  if (isString(options) || isVNode(options)) {
    options = { message: options } as MessageParams
  }
  const id = `message_${seed++}`

  // 计算有多个message时的偏移
  let offset = 20
  instances.forEach(v => {
    offset += v.el?.offsetHeight + 16
  })

  const userOnClose = options.onClose

  // 准备props
  const props: Partial<MessagePropsTypes> = {
    ...options,
    zIndex: zIndex++,
    id,
    offset,
    onClose: () => {
      close(id, userOnClose)
    }
  }

  const messageContent = props.message

  // 使用模板、props、内容创建vNode实例
  const vm = createVNode(
    MessageContructor,
    props,
    isFunction(messageContent)
      ? { default: messageContent }
      : isVNode(messageContent)
        ? { default: () => messageContent }
        : null
  )

  // 上面在Transition的after-leave事件会触发destroy事件emit('destroy')就是在这里定义的
  vm.props!.onDestroy = () => {
    // 移除
    render(null, container)
  }

  // 创建一个div
  const container = document.createElement('div')
  // 渲染vm
  render(vm, container)

  // 默认添加到body上
  let appendTo: HTMLElement | null = document.body

  // 如果传入了目标元素则添加到传入的元素里
  if (isString(options.appendTo)) {
    appendTo = document.querySelector(options.appendTo)
  } else if (options.appendTo && options.appendTo instanceof Element) {
    appendTo = options.appendTo
  }

  // 只将渲染的内容添加到目标dom中
  appendTo!.appendChild(container.firstElementChild!)
  instances.push(vm)

  return {
    close: () =>
    ((
      vm.component!.proxy as ComponentPublicInstance<{ visible: boolean }>
    ).visible = false),
  }
}

// 添加类型方法，主要还是调用上面的message方法，只是类型固定
// messageTypes = ['success', 'info', 'warning', 'error']
messageTypes.forEach(type => {
  (message as any)[type] = (options: MessageParams = {}, appContext?: AppContext | null) => {
    if (isString(options) || isVNode(options)) {
      options = { message: options } as MessageParams
    }
    message({ ...options, type }, appContext)
  }
})

function close(id: string, userClose?: (vm: VNode) => void) {
  const idx = instances.findIndex(vm => vm.props!.id === id)
  if (idx === -1) return
  const vm = instances[idx]
  userClose && userClose(vm)
  // 移除vm实例
  instances.splice(idx, 1)
  // 得到移除元素的高度
  const removeHeight = vm.el!.offsetHeight

  // 移除元素后面的每一个消息框的偏移量相应的减去移除元素的高度
  for (let i = idx; i < instances.length; i++) {
    const pos = parseInt(instances[i].el?.style.top) - removeHeight + -16

    instances[i].component!.props.offset = pos
  }
}

// 关闭所有消息框
export function closeAll() {
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i].component
      ; (instance?.proxy as any).close()
  }
}

message.closeAll = closeAll
export default message as Message
```

> 详细注释已标明

1. 处理传入的参数
2. 计算每一个消息框的offset偏移
3. 组装props
4. 使用模板、props、内容创建vNode实例vm
5. 在实例的props上添加destroy事件的监听，emit('destroy')触发，也就是Transition动画执行完毕后
6. 创建一个div，使用render函数将vm挂载到这个div上
7. 处理appendTo，得到最终要挂载的哪个元素

## `index.ts` 导出
```ts
export * from './src/message'
import { withInstallFunction } from '@vangle/utils'
import Message from './src/message-method'

// export const withInstallFunction = (fn, name) => {
//   fn.install = app => {
//     fn._context = app._context
//     app.config.globalProperties[name] = fn
//   }

//   return fn
// }
export const VanMessage = withInstallFunction(Message, '$message')

export default VanMessage
```
- withInstallFunction 方法的主要功能是为Message添加install方法，并往app.config.globalProperties上添加$message

## 最后

可以看到抛开ts类型代码还是挺简单的，主要还是理解Transition、createVNode、render的基本使用

上面消息框使用Icon组件，vangle中使用了一种便利的方式封装Icon，可直接参考源码

完整代码请参考 [github 地址](https://github.com/vangleer/vangle) [gitee 地址](https://gitee.com/vangleer/vangle) 记得点个星星噢(●'◡'●)