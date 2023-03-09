
<script lang="ts">
import { defineComponent, h, computed, ref } from 'vue'
import { Node, TreeNodeProps, GAP } from './tree'
import { addClass } from './utils'
import { createNamespace, isFunction,  } from '@vangle/utils'
import VanIcon from '../../icon'
import VanCheckbox from '../../checkbox'
import VanCollapseTransition from '../../collapse-transition'
export default defineComponent({
  name: 'VanTreeNode',
  props: TreeNodeProps,
  setup(props, { emit, slots }) {
    const { n } = createNamespace('tree')
    const currentNode = ref<Node>()
    const dataProps = computed(() => props.props)
    const dragState = ref({
      draggingNode: {} as Node,
      dropNode: {} as Node
    })

    /**
     * 渲染label
     * 1. 如果用户传入渲染函数则使用用户的渲染
     * 2. 如果有插槽使用插槽并传入参数
     * 3. 否则使用默认
     */
     function getLabel(node: Node) {
      if (isFunction(props.renderContent)) {
        return props.renderContent!(h, { node, data: node.data, store: node.store })
      } else if (slots.default) {
        return slots.default({ node, data: node.data, store: node.store })
      } else {
        return h('span', { class: n('node__label') }, node.label)
      }
    }
    function hasChild(node?: Node) {
      return node && node.childNodes && node.childNodes.length
    }
    const getCheckbox = (node: Node) => {
      return props.showCheckbox && h(
        VanCheckbox,
        {
          label: '',
          modelValue: node.checked,
          indeterminate: node.indeterminate,
          disabled: node.disabled,
          'onUpdate:modelValue': (val) => handleChecked(node, val)
        }
      )
    }
    function handleChecked(node: Node, value: boolean) {
      node.checked = node.indeterminate ? true : value

      if (node.indeterminate) {
        node.indeterminate = false
      }

      emit('check-change', node, value, node.indeterminate)
      checkAll(node, node.checked)
      checkIndeterminate(node.parent!)
    }
    function checkIndeterminate(node: Node) {
      if (!node) return
      let root: any = node
      while(root) {
        if (hasChild(root)) {
          const checkedChildNodes = root.childNodes.filter((item: Node) => item.checked)
          if (!checkedChildNodes.length) {
            root.checked = false
            root.indeterminate = false
          }
          else if (checkedChildNodes.length < root.childNodes.length) {
            break
          }
          else {
            root.indeterminate = false
            root.checked = true
          }
        }
        root = root.parent
      }

      while(root) {
        root.checked = false
        root.indeterminate = true
        root = root.parent
      }
      return root
    }
    function checkAll(node: Node, value: boolean) {
      if (!hasChild(node)) return
      node.childNodes!.forEach(n => {
        n.checked = value
        n.indeterminate = false
        checkAll(n, value)
      })
    }
    function renderNode(node: Node) {
      const item = node
      // 处理过滤
      const childNodes = (item.childNodes || []).filter(n => props.filterLabel!(n.data))

      let child = null
      const icon = h(VanIcon, { name: 'caret-right', class: [n('node__expand-icon'), { 'is-leaf': item.isLeaf }] })
      const loading = item.loading && h(VanIcon, { name: 'loading', class: [n('node__loading-icon'), { 'is-loading': true }] })
      const label = getLabel(item)
      const checkbox = getCheckbox(item)
      const extraNodeClassName = dataProps.value.class && isFunction(dataProps.value.class) ? dataProps.value.class(item.data, item) : dataProps.value.class
      const content = h(
        'div',
        {
          class: [n('node__content'), { 'is-expand': item.expand, 'is-checked': item.checked }],
          style: { paddingLeft: item.level * GAP + 'px' },
          onClick() {
            handleNodeClick(item)
          },
          onContextmenu(e: Event) {
            // handleContextMenu(e, item)
          }
        },
        [icon, checkbox, loading, label]
      )
      const draggable = props.draggable && isFunction(props.allowDrag) && props.allowDrag!(item)
      const drages = draggable ? createDragEvents(item) : {}
      if (childNodes.length) {
        child = h(
          'div',
          { class: [n('node'), extraNodeClassName], draggable, ...drages },
          [
            content,
            h(
              VanCollapseTransition,
              () => item.expand && h(
                'div',
                { class: 'node_children' },
                renderContext(item.childNodes!)
              )
            )
          ]
        )
      } else {
        // if (!filterLabel(item.data)) continue
        child = h('div', { class: [n('node'), extraNodeClassName], draggable, ...drages }, content)
      }

      return child
    }
    function renderContext(data: Node[]): any[] {
      if (!data) return []
      let nodes = []
      for (let i = 0; i < data.length; i++) {
        nodes.push(renderNode(data[i]))
      }
      return nodes
    }
    function handleNodeClick(node: Node) {
      emit('node-click', node)
    }
    function handleContextMenu(e: Event, node: Node) {
      emit('check-contextmenu', e, node.data, node)
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
          if (isFunction(props.allowDrop) && !props.allowDrop!(dragState.value.draggingNode, dragState.value.dropNode, '')) {
            return false
          }
          dragChange()
          emitDrag('node-drop', e)
        }
      }
    }
    function dragChange() {
      const { draggingNode, dropNode } = dragState.value
      const draggingParentData = draggingNode?.parent?.data || draggingNode.store
      const dropParentData = dropNode?.parent?.data || dropNode.store

      const isBrother = draggingParentData === dropParentData
      const removeIndex = draggingParentData.children.findIndex((d: any) => d === draggingNode.data)
      const index = dropParentData.children.findIndex((d: any) => d === dropNode.data)
      if (isBrother) {
        [dropParentData.children[removeIndex], dropParentData.children[index]] = [dropParentData.children[index], dropParentData.children[removeIndex]]
      } else {
        draggingParentData.children.splice(removeIndex, 1)
        dropParentData.children.push(draggingNode.data)
      }
      emit('refresh')
    }
    function emitDrag(eventName: string, e: DragEvent) {
      const { draggingNode, dropNode } = dragState.value
      emit(eventName, draggingNode, dropNode, e)
    }
    return () => {
      return h('div', {}, renderNode(props.node!))
    }
  }
})
</script>

<style lang="less">
@import './tree.less';
</style>
