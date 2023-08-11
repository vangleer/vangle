
在element-plus中，popper组件是tooltip、select、date-picker等触发式弹出层组件的基础，有了它我们就可以封装各种类似功能的组件了。

话不多说，咱们开始吧！

popper 组件依赖于 [floating-ui](https://floating-ui.com/)，是对 floating-ui 的高级封装，有兴趣的小伙伴可以先去了解了解。

[在线预览](https://vangleer.github.io/vangle)

[github 地址](https://github.com/vangleer/vangle)

## 最终效果展示

![03.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9b2809068fe44cc8d2b7afa724abbcb~tplv-k3u1fbpfcp-watermark.image?)

今天的完整代码放在 `play/src/components/popper` 里了

## popper 组件封装

### 准备工作

首先我们要明白 popper 组件的两个要素

1.  触发器：trggier
2.  弹出层内容：popper content

![02.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fae14749cf424be188512c3b6a40c85e~tplv-k3u1fbpfcp-watermark.image?)

element-plus把所有的popper弹出内容都统一放到了一个 `el-popper-container-xxx` 的容器中，因此我们要先把这个容器创建出来

```typescript
// play/src/components/popper/popper.ts
let cachedContainer: HTMLElement
const selector = `van-popper-container-1996`

type PopperContainerType = {
  container: HTMLElement
  selector: string
}

export const usePopperContainer = (): PopperContainerType => {
  if (!cachedContainer && !document.querySelector(`#${selector}`)) {
    const container = document.createElement('div')
    container.id = selector
    cachedContainer = container
    document.body.appendChild(container)
  }

  return {
    container: cachedContainer,
    selector
  }
}
```

*   popper 组件的props

```typescript
const props = defineProps({
  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'dark'
  },
  content: {
    type: String
  },
  transitionName: {
    type: String,
    default: 'van-popper-fade'
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom-start',
  },
  strategy: {
    type: String as PropType<Strategy>,
    default: 'absolute',
  },
  showArrow: { // 是否显示箭头
    type: Boolean,
    default: true,
  },
  popperClass: {
    type: String,
    default: ''
  }
})
```

### floating-ui 的简单使用

#### 安装依赖

```sh
pnpm add @floating-ui/dom
```

#### 一个简单的 popper

```html
<template>
  <div class="container">
    <span ref="triggerRef" class="demo-btn" @click.stop="handleTrigger">Trigger</span>
    <div v-if="visible" ref="contentRef" class="popper" :style="contentStyle" @mousedown.stop>My Popper</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { computePosition, flip, shift, offset } from '@floating-ui/dom'

const triggerRef = ref()
const contentRef = ref()
const visible = ref(false)

function handleTrigger() {
  visible.value = true

  document.addEventListener('mousedown', () => {
    visible.value = false
  }, { once: true })
}

const middleware = [shift(), flip(), offset(10)]
const x = ref(0)
const y = ref(0)
// 弹出框样式
const contentStyle = computed(() => ({ left: x.value + 'px', top: y.value + 'px' }))
watchEffect(() => {
  if (triggerRef.value && contentRef.value) {
    computePosition(triggerRef.value, contentRef.value, { middleware }).then(data => {
      x.value = data.x
      y.value = data.y
    })
  }
})
</script>

<style lang="less">

.popper {
  position: absolute;
  background: #222;
  color: white;
  font-weight: bold;
  padding: 5px;
  border-radius: 4px;
  font-size: 90%;
}
</style>
```

**解析：**

1.  首先我们要准备两个元素，触发器（trigger）和弹出层内容（popper）
2.  当触发器和弹出层都挂载后执行 floating-ui 的 computePosition 函数传入需要的参数
3.  该函数会返回我们位置信息和中间件信息

```typescript
interface IData {
  middlewareData: Object, // 中间件信息
  placement: string, // 方位
  strategy: 'absolute' | 'fixed', // 浮动策略
  x: number, // x坐标
  y: number // y坐标
}
```

几个中间件介绍

*   offset 弹出层离触发器的偏移量
*   shift 保持元素在可视范围内
*   flip 切换到其他位置，以确保元素的可见性
*   arrow 箭头（后面有具体使用）

![05.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1efcdc70598645a8823b1c21282a142e~tplv-k3u1fbpfcp-watermark.image?)

接下来正式进入Popper组件的封装。。。

### 触发器

触发器是使用者插槽传递过来的，而我们必须要获取到触发器的dom为其注册触发事件，那么我们要注意以下两种情况

```html
<span v-if="noWrap" ref="triggerRef" class="van-popper__trigger" v-bind="$attrs">
  <slot />
</span>
<component v-else :ref="setTriggerRef" :is="$slots.default" v-bind="$attrs" />
```

1.  纯文本：noWrap 为 true 表示插槽为纯文本，我们使用了span标签包了一层
2.  标签元素：如果是标签元素使用 component 渲染默认插槽

```typescript
export function useTrigger() {
  const triggerRef = ref()
  const visible = ref(false)
  // 获取默认插槽
  const trggierSlot = useSlots!().default!()
  // 如果是纯文本
  const noWrap = computed(() => trggierSlot[0].patchFlag === 0)
  const open = () => visible.value = true
  const close = () => visible.value = false
  // 设置触发器dom
  const setTriggerRef = (el: HTMLElement | null) => {
    triggerRef.value = el && el.nextElementSibling || null
  }
  // 点击触发器事件
  const onClick = (e: MouseEvent) => {
    e.stopPropagation()
    open()
    setTimeout(() => {
      document.addEventListener('mousedown', onDocumentMousedown, { once: true })
    })
  }

  // 点击其它区域
  const onDocumentMousedown = () => {
    close()
  }
  onMounted(() => {
    if (!triggerRef.value) return
    triggerRef.value.addEventListener('click', onClick)
  })

  onBeforeUnmount(() => {
    triggerRef.value!.removeEventListener('click', onClick)
  })

  return {
    setTriggerRef,
    triggerRef,
    visible,
    noWrap,
    open,
    close
  }
}

// 使用时
const {
  setTriggerRef,
  triggerRef,
  visible,
  noWrap,
  trggierSlot
} = useTrigger()
```

**解析：**

1.  useTrigger的主要功能就是，拿到触发器的dom元素为其注册事件（这里只注册了点击事件）

2.  获取触发器dom元素使用了两种方式，只会有一种生效。如果是纯文本triggerRef挂载后会自动赋值。否则setTriggerRef生效为triggerRef赋值

3.  提供open和close方法控制弹出内容的显示与隐藏，visible 弹出内容的显示与隐藏，后面会用到

### 弹出内容

```html
<Teleport :to="`#${selector}`">
  <Transition :name="transitionName">
    <div
      v-if="visible"
      ref="contentRef"
      :class="['van-popper', `is-${effect}`, popperClass]"
      :style="contentStyle"
      :data-side="side"
      @mousedown.stop
    >
      <slot name="content">{{ content }}</slot>
      <span
        v-if="showArrow"
        ref="arrowRef"
        class="van-popper__arrow"
        :style="arrowStyle"
      >
      </span>
    </div>
  </Transition>
</Teleport>
```

```typescript
import { computed, ref, onMounted, watch, unref, getCurrentInstance } from 'vue'
import { usePopperContainer, useFloating, useTrigger } from './popper.ts'
import type { Placement, Strategy } from '@floating-ui/dom'
import { offset, arrow, shift, flip } from '@floating-ui/dom'

const { selector } = usePopperContainer()
const arrowRef = ref()
const middleware = computed(() => {
  const mds = [shift(), flip(), offset(10)]
  if (props.showArrow) {
    mds.push(arrow({ element: arrowRef.value }))
  }
  return mds
})

const placement = ref(props.placement)
const strategy = ref(props.strategy)

const {
  x,
  y,
  contentRef,
  middlewareData,
  update
} = useFloating({ middleware, placement, strategy }, triggerRef)

const side = computed(() => {
  return placement.value.split('-')[0]
})
// 弹出框样式
const contentStyle = computed(() => ({ left: x.value + 'px', top: y.value + 'px' }))
// 箭头样式
const arrowStyle = computed(() => {
  if (!props.showArrow) return {}
  const { arrow } = unref(middlewareData)
  return {
    left: arrow?.x + 'px',
    top: arrow?.y + 'px'
  }
})

```

**解析：**

1.  调用刚刚写好的usePopperContainer返回的selector塞给Teleport
2.  接着准备floating-ui要使用到的数据，middleware中间件，placement、strategy
3.  核心部分 useFloating 这个 hook里

```typescript
type UseFloatingProps = ToRefs<{
  middleware: Array<Middleware>
  placement: Placement
  strategy: Strategy
}>
export const useFloating = ({ middleware, placement, strategy }: UseFloatingProps, triggerRef: Ref<HTMLElement | null>) => {
  const contentRef = ref()
  // popper位置信息
  const x = ref<number>()
  const y = ref<number>()
  // floating-ui 中间件数据
  const middlewareData = ref<ComputePositionReturn['middlewareData']>({})
  const states = {
    x,
    y,
    placement,
    strategy,
    middlewareData,
  } as const
  async function update() {
    if (!triggerRef.value || !contentRef.value) return
    // floating-ui 的 computePosition计算位置
    const data: any = await computePosition(triggerRef.value, contentRef.value, {
      middleware: unref(middleware),
      placement: unref(placement),
      strategy: unref(strategy)
    })
    
    Object.keys(states).forEach(key => {
      (states as any)[key].value = data[key]
    })
  }

  onMounted(() => {
    watchEffect(() => {
      update()
    })
  })
  return {
    ...states,
    update,
    contentRef
  }
}
```

主要使用floating-ui的 computePosition 根据传入的 触发器、内容dom和配置参数计算最新的位置信息和中间件信息。

*   `x` 和 `y`：分别存储弹出内容的横向和纵向位置。
*   `middlewareData`：用于存储 `floating-ui` 中间件的计算数据。
*   `states`：用它的目的是循环赋值。
*   `update` 函数：用于更新弹出内容的位置。`computePosition` 计算新的位置数据。这个函数可用于resize窗口自适应的场景（这里并没有实现）

### 样式

样式不复杂，要考虑的主要是arrow箭头的不同表现

```css
<style lang="less">
@sides: {
  top: bottom;
  bottom: top;
  left: right;
  right: left;
}
@N: .van-popper;
@{N} {
  --van-arrow-size: 10px;
  --van-popper-content-bg: #fff;
  --van-popper-border: 1px solid #ebedf0;
  border-radius: 4px;
  color: #000;
  background-color: var(--van-popper-content-bg);
  padding: 10px 12px;
  border: var(--van-popper-border);
  position: absolute;
  white-space: nowrap;
  transition: opacity .3s;
  font-size: 13px;
  z-index: 1000;
  width: max-content;
  
  &__arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    background: var(--van-popper-content-bg);
    transform: rotate(45deg);
  }

  each(@sides, {
    &[data-side^='@{value}'] {
      @{N}__arrow {
        @{key}: -5px;
      }
      @{N}__arrow {
        border-@{key}: var(--van-popper-border);
      }
      @{N}__arrow when (@value =top) {
        border-right: var(--van-popper-border);
      }
      @{N}__arrow when (@value =bottom) {
        border-left: var(--van-popper-border);
      }
      @{N}__arrow when (@value =left) {
        border-top: var(--van-popper-border);
      }
      @{N}__arrow when (@value =right) {
        border-bottom: var(--van-popper-border);
      }
    }
  });

  &.is-dark {
    --van-popper-content-bg: #000;
    color: #fff;
    border: none;

    @{N}__arrow {
      border-color: transparent;
    }
  }
}

.van-popper-fade-enter-from,
.van-popper-fade-leave-to {
  opacity: 0;
}
</style>
```

以上就是popper的基本封装，还有很多可扩展的地方，比如：触发的方式还可以有mouseenter/mouseleave、mousedown/mouseup、focus/blur等

### 使用

```html
<VanPopper
  effect="dark"
  content="你好呀！"
>
  noWrap
</VanPopper>
<VanPopper
  effect="dark"
  content="你也好呀！"
>
  <span class="demo-btn">wrap</span>
</VanPopper>
```

![04.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95042cdc5d0e4a54bd176c9b794ca11b~tplv-k3u1fbpfcp-watermark.image?)

#### 试试插槽日历组件

- 安装 es-calendar

```
pnpm add es-calendar
```

```html
<template>
  <div class="container">
    <VanPopper>
      <span class="demo-btn">Picker</span>
      <template #content>
        <ESCalendar />
      </template>
    </VanPopper>
  </div>
</template>

<script lang="ts" setup>
import VanPopper from './components/popper/popper.vue'
import 'es-calendar/lib/style.css'
import ESCalendar from 'es-calendar'
</script>
```

看看效果

![06.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6123e25c777446a4995156d58413b54b~tplv-k3u1fbpfcp-watermark.image?)

嗯！nice

## 最后

本来是要封装一个date-picker组件的，没想到popper组件写了这么久。那就下次再写吧！

有精力的朋友可以先写写，无非就是把Trigger换成input，content换成日期组件。vangle组件库已经实现了date-picker可供参考
