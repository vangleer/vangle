<template>
</template>

<script lang="ts">
import { defineComponent, h, reactive, computed, watch, ref, provide } from 'vue'
import { createNamespace, isFunction } from '@vangle/utils'
import { TreeProps, Node, TreeNodeData, TreeStore, TreeContextKeys } from './tree'
import { addClass } from './utils'
import TreeNode from './tree-node.vue'
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
    const currentNode = ref<Node>()
      const dragState = ref({
      draggingNode: {} as Node,
      dropNode: {} as Node
    })
    const store = reactive<TreeStore>({
      childNodes: getNodes(props.data),
      children: props.data
    })
    provide(TreeContextKeys, props)
    watch(() => props.data, () => {
      refresh()
    })
    function refresh() {
      store.childNodes = getNodes(props.data)
      store.children = props.data
    }

    function hasChild(node?: Node) {
      return node && node.childNodes && node.childNodes.length
    }
    function loadData(node?: Node) {
      if (!isLoading.value) return
      props.load!(node || { level: 0 }, (data: Node[]) => {
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
    
    function handleChecked(node: Node, value: boolean) {
      emit('check-change', node, value, node.indeterminate)
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

    function getNodes(data: TreeNodeData[], level = 0, parent: Node | null = null): Node[] {
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
        
        const node: Node = {
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
    
    function getCheckedNodes() {
      return getNode(store.childNodes!)
    }
    function getCheckedKeys(): Node[] {
      const nodes = getNode(store.childNodes!)
      return nodes.map(node => (node as any)[props.nodeKey])
    }
    
    function getNode(childNodes: Node[]): Node[] {
      if (!childNodes) return []
      let results: Node[] = []
      forEachTree(childNodes, (node) => {
        if (node.checked) {
          results.push(node)
        }
      })
      return results
    }
    function setChecked(childNodes: Node[], keys: any[]) {
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
      return (currentNode.value as any)[props.nodeKey]
    }
    function getCurrentNode() {
      return currentNode.value
    }

    function forEachTree(nodes: Node[], callback: (node: Node) => void) {
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
    function handleNodeClick(node: Node) {
      if (node.loading || !props.expandOnClickNode) return
      node.expand = !node.expand
      currentNode.value = node
      if (props.accordion) {
        const siblings = node.parent?.childNodes || store.childNodes
        siblings.forEach((n: Node) => {
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
    function renderContext(data: Node[]): any[] {
      if (!data) return []
      let nodes = []
      const dProps = {
        showCheckbox: props.showCheckbox,
        renderContent: props.renderContent,
        props: dataProps.value,
        accordion: props.accordion,
        allowDrop: props.allowDrop
      }
      for (let i = 0; i < data.length; i++) {
        nodes.push(
          h(
            TreeNode,
            {
              node: data[i],
              ...dProps,
              filterLabel,
              onNodeClick: handleNodeClick,
              onNodeChecked: handleChecked
            }
          )
        )
      }

      return nodes
    }
    function renderEmptyBlock() {
      return !props.data.length && h('div', { class: n('empty-block') }, h('span', { class: n('empty-text') }, props.emptyText) )
    }
    loadData()
    return () => {
      return h('div', { class: n() }, [store.childNodes.length ? renderContext(store.childNodes) : renderEmptyBlock()])
    }
  }
})

</script>

<style lang="less">
@import './tree.less';
</style>
