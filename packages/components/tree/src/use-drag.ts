import { ref } from 'vue'
import { isFunction } from '@vangle/utils'
import { TreePropsType, Node } from './tree'
export const useDrag = (props: TreePropsType, emit: (...args: any[]) => void, callback: Function) => {
  const dragState = ref({
    draggingNode: {} as Node,
    dropNode: {} as Node
  })
  function emitDrag(eventName: string, e: DragEvent) {
    const { draggingNode, dropNode } = dragState.value
    emit(eventName, draggingNode, dropNode, e)
  }
  function dragChange() {
    const { draggingNode, dropNode } = dragState.value
    const draggingParentData = draggingNode?.parent?.data || draggingNode.store
    const dropParentData = dropNode?.parent?.data || draggingNode.store

    const isBrother = draggingParentData === dropParentData
    const removeIndex = draggingParentData.children.findIndex((d: any) => d === draggingNode.data)
    const index = dropParentData.children.findIndex((d: any) => d === dropNode.data)
    if (isBrother) {
      [dropParentData.children[removeIndex], dropParentData.children[index]] = [dropParentData.children[index], dropParentData.children[removeIndex]]
    } else {
      draggingParentData.children.splice(removeIndex, 1)
      dropParentData.children.push(draggingNode.data)
    }

    callback()
  }
  function createDragEvents(node: Node) {
    return {
      onDragstart(e: DragEvent) {
        e.stopPropagation()
        dragState.value.draggingNode = node
        dragState.value.dropNode = node
        emitDrag('node-drag-start', e)
      },
      onDragenter(e: DragEvent) {
        e.stopPropagation()
        addClass(e.target as HTMLElement, 'is-dragging')
        dragState.value.dropNode = node
        emitDrag('node-drag-enter', e)
      },
      onDragleave(e: DragEvent) {
        e.stopPropagation()
        addClass(e.target as HTMLElement, 'is-dragging', true)
        dragState.value.dropNode = node
        emitDrag('node-drag-leave', e)
      },
      ondragover(e: DragEvent) {
        e.preventDefault()
        e.stopPropagation()
        dragState.value.dropNode = node
        emitDrag('node-drag-over', e)
      },
      ondragend(e: DragEvent) {
        e.stopPropagation()
        dragState.value.dropNode = node
        emitDrag('node-drag-end', e)
      },
      onDrop(e: DragEvent) {
        e.stopPropagation()
        dragState.value.dropNode = node
        addClass(e.target as HTMLElement, 'is-dragging', true)
        if (isFunction(props.allowDrop) && !props.allowDrop(dragState.value.draggingNode, dragState.value.dropNode, '')) {
          return false
        }
        dragChange()
        emitDrag('node-drop', e)
      }
    }
  }

  return {
    createDragEvents,
    dragState
  }
}

export function addClass(el: HTMLElement, className: string, isRemove: boolean = false) {
  if (!isRemove) {
    el.classList.add(className)
  } else {
    el.classList.remove(className)
  }
}