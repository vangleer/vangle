import { onBeforeUnmount, onMounted, ref, Ref, ExtractPropTypes } from 'vue'
import { SortableProps } from './sortable'
export function useSortable(
  props: ExtractPropTypes<typeof SortableProps>,
  sortableRef: Ref<HTMLElement | null>
) {
  // 移动端模拟拖拽反馈图像 https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#setting_the_drag_feedback_image
  const ghost = ref<HTMLElement | null>(null) 
  
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
  
    function onDragEnd(event: MouseEvent | TouchEvent) {
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

// 添加事件监听器
function on(el: Element | Document, event: string, fn: Function, options?: AddEventListenerOptions) {
  el.addEventListener(event, fn as any, options)
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