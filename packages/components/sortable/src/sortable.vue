<template>
  <div ref="sortableRef" :class="n()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { createNamespace } from '@vangle/utils'
import { SortableProps } from './sortable'
defineOptions({
  name: 'VanSortable'
})

const props = defineProps(SortableProps)

const { n } = createNamespace('sortable')

const ghost = ref<HTMLElement | null>(null)

const sortableRef = ref<HTMLElement | null>(null)

function dragStart(event: MouseEvent | TouchEvent) {
  const isTouch = isTouchEvent(event)
  const draggingItem = (isTouch ? event.targetTouches[0].target : event.target) as HTMLElement;
  if (!draggingItem) return

  // 设置拖拽元素类名和属性
  draggingItem.classList.add('dragging')
  if (props.ghostClass) {
    draggingItem.classList.add(props.ghostClass)
  }
  draggingItem.setAttribute('draggable', 'true')

  const rect = draggingItem.getBoundingClientRect()

  const { clientX, clientY } = getXY(event)
  const downX = clientX - rect.left
  const downY = clientY - rect.top

  if (isTouch) {
    // 克隆当前元素
    ghost.value = draggingItem.cloneNode(true) as HTMLElement
    sortableRef.value!.appendChild(ghost.value)
    
    // 设置ghost样式
    ghost.value.style.transform = `translate(${draggingItem.offsetLeft}px, ${draggingItem.offsetTop}px)`
    ghost.value.style.position = 'absolute'
    ghost.value.style.left = '0px'
    ghost.value.style.top = '0px'
    ghost.value.style.width = rect.width + 'px'
    ghost.value.style.height = rect.height + 'px'
  } else {
    ghost.value = null
  }

  // Add touch event listeners
  on(document, 'touchmove', onDrag)
  on(document, 'touchend', onDragEnd)

  // add drag event listeners
  on(document, 'dragover', onDrag)
  on(document, 'dragend', onDragEnd)

  const parentRect = sortableRef.value!.getBoundingClientRect()

  function onDrag(event: MouseEvent | TouchEvent) {
    if (!draggingItem) return
    const { clientX, clientY } = getXY(event)
    const mouseY = clientY
    const afterElement = getDragAfterElement(sortableRef.value!, mouseY)
    if (afterElement == null) {
      sortableRef.value!.appendChild(draggingItem)
    } else {
      sortableRef.value!.insertBefore(draggingItem, afterElement)
    }
    
    if (ghost.value) {
      const x = clientX - parentRect.left - downX
      const y = clientY - parentRect.top - downY
      // 更新幻影元素位置
      ghost.value!.style.transform = `translate(${x}px, ${y}px)`
    }
  }

  function onDragEnd() {
    if (draggingItem) {
      draggingItem.classList.remove('dragging')

      // Add touch event listeners
      off(document, 'touchmove', onDrag)
      off(document, 'touchend', onDragEnd)

      off(document, 'dragover', onDrag)
      off(document, 'dragend', onDragEnd)
      
      // 移除幻影元素
      ghost.value && sortableRef.value!.removeChild(ghost.value!)
    }
  }
}
function getDragAfterElement(container: HTMLElement, y: number) {
  const draggableElements = Array.from(container.children).filter(el => !el.classList.contains('dragging'))

  const item: any = draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY })

  return item.element;
}
function getXY(event: MouseEvent | TouchEvent) {
  if (isTouchEvent(event)) {
    const { pageX, pageY } = event.touches[0]
    return { clientX: pageX, clientY: pageY }
  } else {
    return { clientX: event.pageX, clientY: event.pageY }
  }
}

function on(el: Element | Document, event: string, fn: (e: any) => any) {
	el.addEventListener(event, fn)
}

function off(el: Element | Document, event: string, fn: (e: any) => any) {
	el.removeEventListener(event, fn)
}

// 判断是否是触摸事件
function isTouchEvent(val: unknown): val is TouchEvent {
  const typeStr = Object.prototype.toString.call(val)
  return typeStr.substring(8, typeStr.length - 1) === 'TouchEvent'
}
onMounted(() => {
  // Add both mouse and touch event listeners
  on(sortableRef.value!, 'mousedown', dragStart);
  on(sortableRef.value!, 'touchstart', dragStart);
})

onBeforeUnmount(() => {
  off(sortableRef.value!, 'mousedown', dragStart)
  off(sortableRef.value!, 'touchstart', dragStart)
  off(sortableRef.value!, 'dragstart', dragStart)
})
</script>

<style lang="less">
@import './sortable.less';
</style>
