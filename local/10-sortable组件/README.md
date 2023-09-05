# Sortable 拖拽排序组件实现原理

如果我们想要实现拖拽排序功能，有很多现成的库可以供我们使用，比如Sortable.js（vuedraggable）、dnd-kit（react-dnd）等可以轻松帮助我们实现这一功能。

本文的目标不是介绍如何使用这些库，而是手动实现一个简单版的Sortable组件。通过本文的阅读，您将深入了解拖拽排序的核心原理。

话不多说，咱们开始吧！

## 使用模板

使用 Sortable 组件包裹要拖拽的列表项

```html
<template>
  <van-sortable ghost-class="blue-background-class">
    <div v-for="num in 6" class="sort-item">Item {{ num }}</div>
  </van-sortable>
</template>

<style scoped>
.sort-item {
  position: relative;
  display: block;
  padding: 6px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
  color: #000;
}
.blue-background-class {
  background-color: #c8ebfb;
}
</style>
```

看看最终的效果

![temp1.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1c12653942745cf95bc9f2204582572~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=645&h=258&s=230210&e=gif&f=55&b=fefefe)

## Sortable 组件模板

```html
<template>
  <div ref="sortableRef" :class="n()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { createNamespace } from '@vangle/utils'
import { SortableProps } from './sortable'
import { useSortable } from './use-sortable'
defineOptions({
  name: 'VanSortable'
})

const props = defineProps(SortableProps)

const { n } = createNamespace('sortable')

const sortableRef = ref<HTMLElement | null>(null)

useSortable(props, sortableRef)

</script>

<style lang="less">
@import './sortable.less';
</style>

```

核心就在 useSortable 钩子里

## useSortable 实现

在PC端直接使用原生的拖拽即可，而在移动端我们使用touch事件模拟拖拽。下面两个函数用于区分是否是touch事件和获取鼠标点击的位置

```typescript
// 获取鼠标点击的位置
function getXY(event: MouseEvent | TouchEvent) {
  if (isTouchEvent(event)) {
    const { clientX, clientY } = event.touches[0]
    return { clientX, clientY }
  } else {
    return { clientX: event.clientX, clientY: event.clientY }
  }
}

// 判断是否是触摸事件
function isTouchEvent(val: unknown): val is TouchEvent {
  const typeStr = Object.prototype.toString.call(val)
  return typeStr.substring(8, typeStr.length - 1) === 'TouchEvent'
}
```

因此我们需要考虑这两种情况，先来看看 useSortable 的定义

```typescript
import { onBeforeUnmount, onMounted, ref, Ref, ExtractPropTypes } from 'vue'
import { SortableProps } from './sortable'
export function useSortable(
  props: ExtractPropTypes<typeof SortableProps>,
  sortableRef: Ref<HTMLElement | null>
) {
  // 移动端模拟拖拽反馈图像 https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#setting_the_drag_feedback_image
  const ghost = ref<HTMLElement | null>(null)

  function dragStart(event: MouseEvent | TouchEvent) {}

  // 在组件挂载时添加事件监听器
  onMounted(() => {
    // 添加鼠标/触摸事件监听器
    on(sortableRef.value!, 'mousedown', dragStart)
    on(sortableRef.value!, 'touchstart', dragStart)
  })
  
  // 在组件销毁前移除事件监听器
  onBeforeUnmount(() => {
    off(sortableRef.value!, 'touchstart', dragStart)
    off(sortableRef.value!, 'dragstart', dragStart)
  })
}
```

- useSortable 接收props和拖拽列表元素的ref
- ghost 主要用于移动端模拟拖拽效果
- onMounted 和 onBeforeUnmount 中为列表元素注册移除事件

**dragStart 实现**

```typescript
function dragStart(event: MouseEvent | TouchEvent) {
  const isTouch = isTouchEvent(event)
  // touch事件清除默认行为
  if (isTouch) event.preventDefault()

  // 得到 target
  const draggingItem = (isTouch ? event.targetTouches[0].target : event.target) as HTMLElement

  if (!draggingItem) return

  // 设置拖拽元素类名和属性
  draggingItem.classList.add('dragging')
  if (props.ghostClass) {
    draggingItem.classList.add(props.ghostClass)
  }
  // 设置拖拽属性为 true
  draggingItem.setAttribute('draggable', 'true')

  const rect = draggingItem.getBoundingClientRect()

  const { clientX, clientY } = getXY(event)
  // 计算鼠标相对于拖拽元素里的位置
  const downX = clientX - rect.left
  const downY = clientY - rect.top
  
  // 如果是移动端需要创建 ghost
  if (isTouch) {
    // 克隆当前元素
    ghost.value = draggingItem.cloneNode(true) as HTMLElement
    
    // 设置ghost样式
    css(ghost.value, 'transform', `translate(${draggingItem.offsetLeft}px, ${draggingItem.offsetTop}px)`)
    css(ghost.value, 'opacity', '0.5')
    css(ghost.value, 'position', 'absolute')
    css(ghost.value, 'left', 0)
    css(ghost.value, 'top', 0)
    css(ghost.value, 'width', rect.width)
    css(ghost.value, 'height', rect.height)

    sortableRef.value!.appendChild(ghost.value)
  } else {
    ghost.value = null
  }

  // 添加触摸事件
  on(document, 'touchmove', onDrag)
  on(document, 'touchend', onDragEnd)

  // 添加拖拽事件
  on(document, 'dragover', onDrag)
  on(document, 'dragend', onDragEnd)

  // 鼠标抬起事件
  on(document, 'mouseup', onDragEnd)

  // 获取列表位置信息
  const parentRect = sortableRef.value!.getBoundingClientRect()

  function onDrag(event: MouseEvent | TouchEvent) {
    if (!draggingItem) return
    const { clientX, clientY } = getXY(event)

    const afterElement = getDragAfterElement(sortableRef.value!, clientY)
    if (afterElement == null) {
      sortableRef.value!.appendChild(draggingItem)
    } else {
      sortableRef.value!.insertBefore(draggingItem, afterElement)
    }
    
    if (ghost.value) {
      const x = clientX - parentRect.left - downX
      const y = clientY - parentRect.top - downY
      // 更新幻影元素位置
      css(ghost.value, 'transform', `translate(${x}px, ${y}px)`)
    }
  }

  function onDragEnd() {
    if (draggingItem) {
      draggingItem.classList.remove('dragging')
      if (props.ghostClass) {
        draggingItem.classList.remove(props.ghostClass)
      }
      
      // 移除触摸事件监听器
      off(document, 'touchmove', onDrag)
      off(document, 'touchend', onDragEnd)

      // 移除拖拽事件监听器
      off(document, 'dragover', onDrag)
      off(document, 'dragend', onDragEnd)
      
      // 移除幻影元素
      ghost.value && sortableRef.value!.removeChild(ghost.value!)
    }
  }
}
```

代码有点多，容我细细道来：

1. 使用 `isTouchEvent` 函数来检测事件类型，判断是鼠标事件还是触摸事件
2. 如果是触摸事件，则使用 `event.targetTouches[0].target` 来获取触摸事件的目标元素，否则使用 `event.target` 来获取鼠标事件的目标元素
3. 给 `draggingItem` 添加 `'dragging'` 标识，如果传入了 `ghostClass` 则相应添加上
4. 计算坐标信息，`downX` 和 `downY` 是鼠标或触摸点相对于拖拽元素左上角的偏移量
5. 如果是 `touch` 事件创建 `ghost` 并设置初始样式，添加到列表中
6. 分别添加 `touchmove、touchend，dragover、dragend` 事件

**onDrag**

1. 获取鼠标或触摸点的坐标，调用 `getDragAfterElement` 函数来获取距离拖拽点最近的兄弟元素, 并将其存储在 `afterElement`， `getDragAfterElement` 的实现后面会介绍

2. 如果 `afterElement` 为 `null`，说明拖拽元素应该被插入到容器的末尾

3. 否则说明拖拽元素应该插入到某个兄弟元素之前，使用 `insertBefore` 方法

4. 如果 ghost 有值则更新其位置

**getDragAfterElement**

找到容器内与指定垂直坐标 y 最接近的一个兄弟元素

```typescript
function getDragAfterElement(container: HTMLElement, y: number) {
  // 得到兄弟元素
  const siblingElements = Array.from(container.children).filter(el => !el.classList.contains('dragging'))

  const item = siblingElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY })

  return (item as any).element
}
```

**onDragEnd**

在 onDragEnd 中移除拖拽开始为拖拽元素添加的类名，移除移动中和结束事件，如果创建了 ghost 则移除

**下面时移动端的效果图**

![temp2.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dd38bf2ab9449e38f84a5682723f62d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=303&h=237&s=105277&e=gif&f=53&b=fefefe)

**上面用到的几个工具函数**

```typescript
// 添加事件监听器
function on(el: Element | Document, event: string, fn: Function) {
  el.addEventListener(event, fn as any)
}

// 移除事件监听器
function off(el: Element | Document, event: string, fn: Function) {
  el.removeEventListener(event, fn as any)
}

// 设置 CSS 样式
function css(el: HTMLElement, prop: string, val: number | string) {
  let style = el && el.style

  if (!(prop in style) && prop.indexOf('webkit') === -1) {
    prop = '-webkit-' + prop
  }

  (style as any)[prop] = val + (typeof val === 'string' ? '' : 'px')
}
```

## 最后

本文只是简单的实现了Sortable组件的核心功能，对于想了解实现原理的伙伴起到借鉴的作用。但在实际工作中推荐使用Sortable.js、dnd-kit 等成熟的库

完整代码请参考 [github](https://github.com/vangleer/vangle/tree/dev/packages/components/sortable/src)
