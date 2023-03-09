<template>
</template>

<script lang="ts">
import { defineComponent, h, reactive, computed, watch, ref } from 'vue'
import { createNamespace, isFunction } from '@vangle/utils'
import { TreeProps, TreeNodeType } from './tree'
import { VanIcon } from '../../icon'
import VanCollapseTransition from '../../collapse-transition'
import VanCheckbox from '../../checkbox'
let seedId = 1
const paddingLeft = 18
const defaultProps = {
  children: 'children',
  label: 'label',
  disabled: 'disabled'
}
export default defineComponent({
  name: 'VanTree',
  props: TreeProps,
  setup(props, { emit, expose, slots }) {
    const { n } = createNamespace('tree')
    const filterValue = ref('')
    const dataProps = computed(() => ({ ...defaultProps, ...props.props }))
    const isLoading = computed(() => props.load && isFunction(props.load))
    const currentNode = ref<TreeNodeType>()
    const store = reactive({
      childNodes: getNodes(props.data),
      children: props.data
    })
    watch(() => props.data, () => {
      refresh()
    })
    function refresh() {
      store.childNodes = getNodes(props.data)
      store.children = props.data
    }
    const dragState = ref({
      draggingNode: {} as TreeNodeType,
      dropNode: {} as TreeNodeType
    })
    function addClass(el: HTMLElement, className: string, isRemove: boolean = false) {
      if (!isRemove) {
        el.classList.add(className)
      } else {
        el.classList.remove(className)
      }
    }

    function emitDrag(eventName: string, e: DragEvent) {
      const { draggingNode, dropNode } = dragState.value
      emit(eventName, draggingNode, dropNode, e)
    }
    function createDragEvents(node: TreeNodeType) {
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
      const draggingParentData = draggingNode?.parent?.data || store
      const dropParentData = dropNode?.parent?.data || store

      const isBrother = draggingParentData === dropParentData
      const removeIndex = draggingParentData.children.findIndex((d: any) => d === draggingNode.data)
      const index = dropParentData.children.findIndex((d: any) => d === dropNode.data)
      if (isBrother) {
        [dropParentData.children[removeIndex], dropParentData.children[index]] = [dropParentData.children[index], dropParentData.children[removeIndex]]
      } else {
        draggingParentData.children.splice(removeIndex, 1)
        dropParentData.children.push(draggingNode.data)
      }
      
      refresh()
    }
    function hasChild(node?: TreeNodeType) {
      return node && node.childNodes && node.childNodes.length
    }
    function loadData(node?: TreeNodeType) {
      if (!isLoading.value) return
      props.load!(node || { level: 0 }, (data: TreeNodeType[]) => {
        if (!node) {
          store.childNodes = getNodes(data)
        } else {
          node.isLeaf = data.length === 0
          node.loading = false
          node.loaded = true
          node.childNodes = getNodes(data, node.level + 1, node)
        }
      })
    }
    loadData()
    function handleNodeClick(node: TreeNodeType) {
      if (node.loading || !props.expandOnClickNode) return
      node.expand = !node.expand
      currentNode.value = node
      if (props.accordion) {
        const siblings = node.parent?.childNodes || store.childNodes
        siblings.forEach((n: TreeNodeType) => {
          if (n !== node) n.expand = false
        })
      }
      if (isLoading.value && !node.loaded) {
        node.loading = true
        loadData(node)
      }
      emit(node.expand ? 'node-expand' : 'node-collapse', node.data, node)
      emit('node-click', node)
    }
    function handleContextMenu(e: Event, node: TreeNodeType) {
      emit('check-contextmenu', e, node.data, node)
    }
    function handleChecked(node: TreeNodeType, value: boolean) {
      
      node.checked = node.indeterminate ? true : value

      if (node.indeterminate) {
        node.indeterminate = false
      }

      emit('check-change', node, value, node.indeterminate)
      checkAll(node, node.checked)
      checkIndeterminate(node.parent!)
    }
    
    function checkIndeterminate(node: TreeNodeType) {
      if (!node) return
      let root: any = node
      while(root) {
        if (hasChild(root)) {
          const checkedChildNodes = root.childNodes.filter((item: TreeNodeType) => item.checked)
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
    
    function checkAll(node: TreeNodeType, value: boolean) {
      if (!hasChild(node)) return
      node.childNodes!.forEach(n => {
        n.checked = value
        n.indeterminate = false
        checkAll(n, value)
      })
    }

    function getNodes(data: any[], level = 0, parent: TreeNodeType | null = null): TreeNodeType[] {
      if (!data) return []
      if (!data.length && parent) {
        parent.expand = false
        parent.isLeaf = true
      }
      const childrenKey = dataProps.value.children as string
      const labelKey = dataProps.value.label as string
      const isLeafKey = dataProps.value.isLeaf as string
      const disabledKey = dataProps.value.disabled as string
      const nodeKey = props.nodeKey
      return data.map(item => {
        const keyValue = item[nodeKey] || seedId++
        const checked = props.defaultCheckedKeys.includes(keyValue)
        const expand = !!props.defaultExpandAll || props.defaultExpandedKeys.includes(keyValue)
        
        const node: TreeNodeType = {
          [nodeKey]: keyValue,
          data: item,
          label: item[labelKey],
          level,
          checked: checked || parent?.checked,
          expand,
          childNodes: [] as any,
          parent,
          indeterminate: false,
          loaded: false,
          isLeaf: item[isLeafKey],
          disabled: item[disabledKey]
        }
        if (item[childrenKey] && item[childrenKey].length) {
          node.childNodes = getNodes(item[childrenKey], level + 1, node)
        } else {
          if (!isLoading.value) {
            node.isLeaf = true
          }
        }
        if (checked && parent) {
          let n: any = parent
          while(n) {
            n.indeterminate = true
            n = n.parent
          }
        }
        return node
      })
    }
    const getCheckbox = (node: TreeNodeType) => {
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

    /**
     * 渲染label
     * 1. 如果用户传入渲染函数则使用用户的渲染
     * 2. 如果有插槽使用插槽并传入参数
     * 3. 否则使用默认
     */
    function renderLabel(node: TreeNodeType) {
      if (isFunction(props.renderContent)) {
        return props.renderContent!(h, { node, data: node.data, store: node.store })
      } else if (slots.default) {
        return slots.default({ node, data: node.data, store: node.store })
      } else {
        return h('span', { class: n('node__label') }, node.label)
      }
    }

    // <VanIcon v-if="loading" :class="{ 'is-loading': loading }" name="loading" />
    function renderContext(data: TreeNodeType[]): any[] {
      if (!data) return []
      let nodes = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        // 处理过滤
        const childNodes = (item.childNodes || []).filter(n => filterLabel(n.data))

        let child = null
        const icon = h(VanIcon, { name: 'caret-right', class: [n('node__expand-icon'), { 'is-leaf': item.isLeaf }] })
        const loading = item.loading && h(VanIcon, { name: 'loading', class: [n('node__loading-icon'), { 'is-loading': true }] })
        const label = renderLabel(item)
        const checkbox = getCheckbox(item)
        const extraNodeClassName = dataProps.value.class && isFunction(dataProps.value.class) ? dataProps.value.class(item.data, item) : dataProps.value.class
        const content = h(
          'div',
          { 
            class: [n('node__content'), { 'is-expand': item.expand, 'is-checked': item.checked }],
            style: { paddingLeft: item.level * paddingLeft + 'px' },
            onClick() {
              handleNodeClick(item)
            },
            onContextmenu(e: Event) {
              handleContextMenu(e, item)
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
          if (!filterLabel(item.data)) continue
          child = h('div', { class: [n('node'), extraNodeClassName], draggable, ...drages }, content)
        }
        nodes.push(child)
      }

      return nodes
    }

    function renderEmptyBlock() {
      return !props.data.length && h('div', { class: n('empty-block') }, h('span', { class: n('empty-text') }, props.emptyText) )
    }
    function getCheckedNodes() {
      return getNode(store.childNodes!)
    }
    function getCheckedKeys(keys: any[], flag: boolean): TreeNodeType[] {
      const nodes = getNode(store.childNodes!)
      return nodes.map(node => (node as any)[props.nodeKey])
    }
    
    function getNode(childNodes: TreeNodeType[]): TreeNodeType[] {
      if (!childNodes) return []
      let results: TreeNodeType[] = []
      forEachTree(childNodes, (node) => {
        if (node.checked) {
          results.push(node)
        }
      })
      return results
    }
    function setChecked(childNodes: TreeNodeType[], keys: any[]) {
      if (!childNodes) return []
      forEachTree(childNodes, (node) => {
        if (keys.includes((node as any)[props.nodeKey])) {
          node.checked = true
          checkAll(node, node.checked)
          checkIndeterminate(node.parent!)
        } else {
           node.checked = node.indeterminate = false
        }
      })
    }
    function setCheckedKeys(keys: any[]) {
      setChecked(store.childNodes!, keys)
    }
    function setCheckedNodes(data: any[]) {
      const keys = data.map(item => item[props.nodeKey])
      setChecked(store.childNodes!, keys)
    }
    function filterLabel(data: any) {
      if (isFunction(props.filterNodeMethod)) {
        return props.filterNodeMethod!(filterValue.value, data)
      }
      return true
    }
    function filter(value: any) {
      filterValue.value = value
    }

    function getCurrentKey() {
      return currentNode.value?[props.nodeKey]
    }
    function getCurrentNode() {
      return currentNode.value
    }

    function forEachTree(nodes: TreeNodeType[], callback: (node: TreeNodeType) => void) {
      if (!nodes) return 
      nodes.forEach(node => {
        callback(node)
        if (hasChild(node)) {
          forEachTree(node.childNodes!, callback)
        }
      })
    }
    expose({
      getCheckedKeys,
      getCheckedNodes,
      setCheckedKeys,
      setCheckedNodes,
      getCurrentKey,
      getCurrentNode,
      filter
    })
    return () => {
      return h('div', { class: n() }, [store.childNodes.length ? renderContext(store.childNodes) : renderEmptyBlock()])
    }
  }
})

</script>

<style lang="less">
@import './tree.less';
</style>
