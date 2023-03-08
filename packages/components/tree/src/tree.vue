<template>
</template>

<script lang="ts">
import { onMounted, defineComponent, h, reactive } from 'vue'
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
  indeterminate?: boolean
}
const paddingLeft = 18
export default defineComponent({
  name: 'VanTree',
  props: TreeProps,
  setup(props, { emit }) {
    const { n } = createNamespace('tree')
    onMounted(() => {
      console.log(props.data)
    })

    const store = reactive({
      childNodes: getNodes(props.data)
    })
    const hasChild = (node: TreeNodeType) => node.childNodes && node.childNodes.length
    function loadData() {
      if (props.load && isFunction(props.load)) {
        props.load({}, (data: TreeNodeType[]) => {
          store.childNodes = data
        })
      }
    }
    loadData()
    console.log(store, 'storestore')
    function handleNodeClick(node: TreeNodeType) {
      node.expand = !node.expand
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
          else if (checkedChildNodes.length < root.childNodes.length) break
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
      return data.map(item => {
        const node: TreeNodeType = {
          label: item[labelKey],
          level,
          checked: false,
          childNodes: [] as any,
          parent,
          indeterminate: false
        }
        if (item[childrenKey] && item[childrenKey].length) {
          node.childNodes = getNodes(item[childrenKey], level + 1, node)
        } else {
          node.isLeaf = true
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
          'onUpdate:modelValue': (val) => handleChecked(node, val)
        }
      )
    }
    function renderContext(data: TreeNodeType[]): any[] {
      if (!data) return []
      let nodes = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        let child = null
        const icon = (props.load || !item.isLeaf) && h(VanIcon, { name: 'caret-right', class: [n('node__expand-icon')] })
        const label = h('span', { class: n('node__label') }, item.label)
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
          [icon, checkbox, label]
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

    return () => {
      return h('div', { class: n() }, renderContext(store.childNodes))
    }
  }
})

</script>

<style lang="less">
@import './tree.less';
</style>
