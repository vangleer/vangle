<template>
</template>

<script lang="ts">
import { onMounted, defineComponent, h, reactive, computed, nextTick } from 'vue'
import { createNamespace, isFunction } from '@vangle/utils'
import { TreeProps } from './tree'
import { VanIcon } from '../../icon'
import VanCollapseTransition from '../../collapse-transition'
import VanCheckbox from '../../checkbox'

interface TreeNodeType {
  level: number,
  label: string | number,
  isLeaf?: boolean
  checked?: boolean
  childNodes?: TreeNodeType[],
  expand?: boolean,
  disabled?: boolean,
  parent?: TreeNodeType | null,
  indeterminate?: boolean,
  loaded?: boolean
  loading?: boolean
  data?: any
}
let seedId = 1
const paddingLeft = 18
export default defineComponent({
  name: 'VanTree',
  props: TreeProps,
  setup(props, { emit, expose }) {
    const { n } = createNamespace('tree')
    onMounted(() => {
      console.log(props.data)
    })
    const isLoading = computed(() => props.load && isFunction(props.load))
    const store: any = reactive({
      childNodes: getNodes(props.data)
    })
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
      if (node.loading) return 
      node.expand = !node.expand
      if (isLoading.value && !node.loaded) {
        node.loading = true
        loadData(node)
      }
      emit('node-click', node)
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
            console.log('命中这里')
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

      const childrenKey = props.props.children as string
      const labelKey = props.props.label as string
      const isLeafKey = props.props.isLeaf as string
      const disabledKey = props.props.disabled as string
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

    // <VanIcon v-if="loading" :class="{ 'is-loading': loading }" name="loading" />
    function renderContext(data: TreeNodeType[]): any[] {
      if (!data) return []
      let nodes = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        let child = null
        const icon = h(VanIcon, { name: 'caret-right', class: [n('node__expand-icon'), { 'is-leaf': item.isLeaf }] })
        const loading = item.loading && h(VanIcon, { name: 'loading', class: [n('node__loading-icon'), { 'is-loading': true }] })
        const label = h('span', { class: n('node__label') }, item.label + '--' + item.level)
        const checkbox = getCheckbox(item)
        const content = h(
          'div',
          { 
            class: [n('node__content'), { 'is-expand': item.expand, 'is-checked': item.checked }],
            style: { paddingLeft: item.level * paddingLeft + 'px' },
            onClick() {
              handleNodeClick(item)
            }
          },
          [icon, checkbox, loading, label]
        )
        if (item.childNodes && item.childNodes.length) {
          child = h(
            'div',
            { class: [n('node')] },
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
          child = h('div', { class: n('node') }, content)
        }
        nodes.push(child)
      }

      return nodes
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
      childNodes.forEach(node => {
        if (hasChild(node)) {
          const nodes = getNode(node.childNodes!)
          results.push(...nodes)
        } else {
          if (node.checked) {
            results.push(node)
          }
        }
      })
      return results
    }
    function setChecked(childNodes: TreeNodeType[], keys: any[]) {
      if (!childNodes) return []
      console.log(keys, childNodes, 'keys')
      childNodes.forEach(node => {
        if (keys.includes((node as any)[props.nodeKey])) {
          node.checked = true
          checkAll(node, node.checked)
          checkIndeterminate(node.parent!)
        } else {
           node.checked = node.indeterminate = false
          if (hasChild(node)) {
            setChecked(node.childNodes!, keys)
          }
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
  
    expose({
      getCheckedKeys,
      getCheckedNodes,
      setCheckedKeys,
      setCheckedNodes
    })
    return () => {
      return h('div', { class: n() }, renderContext(store.childNodes))
    }
  }
})

</script>

<style lang="less">
@import './tree.less';
</style>
