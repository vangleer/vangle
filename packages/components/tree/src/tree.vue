<template>
</template>

<script lang="ts">
import { onMounted, defineComponent, h, reactive, Transition } from 'vue'
import { createNamespace } from '@vangle/utils'
import { TreeProps } from './tree'
import { VanIcon } from '../../icon'
import VanCollapseTransition from '../../collapse-transition'
interface TreeNodeType {
  level: number,
  label: string | number,
  isLeaf?: boolean
  checked?: boolean
  childNodes?: TreeNodeType[],
  expand?: boolean,
  disabled?: boolean
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

    console.log(store, 'storestore')
    function getNodes(data: any[], level = 0): TreeNodeType[] {
      if (!data) return []
      const childrenKey = props.props.children as string
      const labelKey = props.props.label as string
      return data.map(item => {
        const node: TreeNodeType = {
          label: item[labelKey],
          level,
          expand: true,
          childNodes: [] as any
        }
        if (item[childrenKey] && item[childrenKey].length) {
          node.childNodes = getNodes(item[childrenKey], level + 1)
        } else {
          node.isLeaf = true
        }
        return node
      })
    }

    function renderContext(data:TreeNodeType[]): any[] {
      if (!data) return []
      let nodes = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        let child = null
        const icon = h(VanIcon, { name: 'caret-right', class: [n('node__expand-icon')] })
        const label = h('span', { class: n('node__label') }, item.label)
        const content = h(
          'div',
          { 
            class: [n('node__content'), { 'is-expand': item.expand }],
            style: { paddingLeft: item.level * paddingLeft + 'px' },
            onClick() {
              item.expand = !item.expand
            }
          },
          [!item.isLeaf && icon, label]
        )
        if (item.childNodes && item.childNodes.length) {
          child = h(
            'div',
            { class: n('node') },
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
