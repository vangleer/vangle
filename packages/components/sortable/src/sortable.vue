<template>
  <div ref="sortableRef" :class="n()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { createNamespace } from '@vangle/utils'
import { SortableProps } from './sortable'
defineOptions({
  name: 'VanSortable'
})

const props = defineProps(SortableProps)

const { n } = createNamespace('sortable')

const sortableRef = ref<HTMLElement | null>(null)


function setupEvent() {
  const list = sortableRef.value!
  let draggingItem: any = null;
  on(list, 'mousedown', dragstart)
  on(list, 'touchstart', dragstart)
  
  function dragstart(e: MouseEvent) {
    
    draggingItem = isTouchEvent(e) ? e.targetTouches[0].target : e.target as HTMLElement;
    draggingItem.setAttribute('draggable', 'true');

    draggingItem.classList.add('dragging');
    draggingItem.classList.add(props.ghostClass);

    // 注册事件
    on(document, 'dragover', dragover)
    on(document, 'dragend', dragend)
    on(document, 'touchmove', dragover)
    on(document, 'touchend', dragend)
  }
  function dragend() {
    draggingItem.setAttribute('draggable', 'false')
    draggingItem.classList.remove('dragging')
    draggingItem.classList.remove(props.ghostClass)
    draggingItem = null;

    // 移除事件
    on(document, 'dragover', dragover)
    on(document, 'dragend', dragend)
  }

  function dragover(e: DragEvent) {
    // e.preventDefault();
    const afterElement = getDragAfterElement(list, e.clientY);
    const currentDraggingItem = document.querySelector('.dragging')!;
    if (afterElement == null) {
      list.appendChild(currentDraggingItem);
    } else {
      list.insertBefore(currentDraggingItem, afterElement);
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
}

function on(el: Element | Document, event: string, fn: (e: any) => any) {
	el.addEventListener(event, fn);
}

function off(el: Element, event: keyof ElementEventMap, fn: (e: any) => any) {
	el.removeEventListener(event, fn);
}
function isTouchEvent(val: unknown): val is TouchEvent {
  const typeStr = Object.prototype.toString.call(val)
  return typeStr.substring(8, typeStr.length - 1) === 'TouchEvent'
}
onMounted(() => {
  setupEvent()
})
</script>

<style lang="less">
@import './sortable.less';
</style>
