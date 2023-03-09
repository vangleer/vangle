
<script lang="ts">
import { defineComponent, h, PropType, inject } from 'vue'
import { Node, TreeContextKeys } from './tree'
import { createNamespace } from '@vangle/utils'

export default defineComponent({
  name: 'VanTreeNode',
  props: {
    node: {
      type: Object as PropType<Node>,
      required: true
    }
  },
  setup(props) {
    const { n } = createNamespace('tree')
    const treeCtx = inject(TreeContextKeys)
    function renderNode() {
      return ''
    }
    return () => {
      return h('div', {}, renderNode())
    }
  }
})
</script>

<style lang="less">
@import './tree.less';
</style>
