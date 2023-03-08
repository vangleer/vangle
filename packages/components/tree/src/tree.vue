<template>
</template>

<script lang="ts">
import { onMounted, defineComponent, h } from 'vue'
import { createNamespace } from '@vangle/utils'
import { TreeProps } from './tree'
import { VanIcon } from '../../icon'
export default defineComponent({
  name: 'VanTree',
  props: TreeProps,
  setup(props, { emit }) {
    const { n } = createNamespace('tree')
    onMounted(() => {
      console.log(props.data)
    })

    function renderContext(data: any[], level = 0): any[] {
      if (!data) return []
      let nodes = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        let child = null
        const icon = h(VanIcon, { name: 'caret-right', class: n('node__expand-icon') })
        const label = h('span', { class: n('node__label') }, item.label)
        const content = h(
          'div',
          { class: n('node__content'), style: { paddingLeft: level * 18 + 'px' } },
          [icon, label]
        )
        if (item.children && item.children.length) {
          child = h('div', { class: n('node') }, [
            content,
            h('div', { class: 'node_children' }, renderContext(item.children, level + 1))
          ])
        } else {
          child = h('div', { class: n('node') }, content)
        }
        nodes.push(child)
      }

      return nodes
    }

    return () => {
      return h('div', { class: n() }, renderContext(props.data))
    }
  }
})

</script>

<style lang="less">
@import './tree.less';
</style>
