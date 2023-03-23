<script lang="ts">
import { defineComponent, h, reactive, computed, PropType } from 'vue'
import { VanIcon, VanCheckbox } from '@vangle/components'
import { VanCollapseTransition } from '../../collapse-transition'
import { createNamespace } from '@vangle/utils'
export interface Node {
  id?: number
  level: number
  label: string | number
  isLeaf?: boolean
  checked?: boolean
  childNodes?: Node[]
  expand?: boolean
  disabled?: boolean
  parent?: Node | null
  data?: any
  store?: any,
  indeterminate?: boolean
}

export type TreeStore = {
  childNodes: Node[]
  children: TreeNodeData[]
}
export interface TreeNodeData {
  [key: string]: any
}
export interface TreeOptionProps {
  children?: string
  label?: string
  class?: (
    data: TreeNodeData,
    node: Node
  ) => string | { [key: string]: boolean } | string
}
const defaultProps = {
  children: 'children',
  label: 'label'
}
let seedId = 1
export default defineComponent({
  name: 'VanTree',
  emits: ['node-click'],
  props: {
    data: {
      type: Array as PropType<TreeNodeData[]>,
      default: []
    },
    props: {
      type: Object as PropType<TreeOptionProps>,
      default: () => ({
        children: 'children',
        label: 'label'
      })
    },
    showCheckbox: {
      type: Boolean
    },
    defaultCheckedKeys: {
      type: Array,
      default: () => ([])
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
  },
  setup(props, { emit, slots }) {
    const { n } = createNamespace('tree')
    const dataProps = computed(() => ({ ...defaultProps, ...props.props }))
    const store = reactive<TreeStore>({
      childNodes: getNodes(props.data),
      children: props.data
    })
    console.log(store.childNodes)
    /**
     * 渲染label
     * 1. 如果用户传入渲染函数则使用用户的渲染
     * 2. 如果有插槽使用插槽并传入参数
     * 3. 否则使用默认
     */
    function renderLabel(node: Node) {
      if (slots.default) {
        return slots.default({ node, data: node.data, store: node.store })
      } else {
        return h('span', { class: n('node__label') }, node.label)
      }
    }
    function handleChecked(node: Node, value: boolean) {
      node.checked = node.indeterminate ? true : value
      if (node.indeterminate) {
        node.indeterminate = false
      }

      checkAll(node, node.checked)
      checkIndeterminate(node.parent!)
    }
    function checkAll(node: Node, value: boolean) {
      if (!hasChild(node)) return
      node.childNodes!.forEach(n => {
        n.checked = value
        n.indeterminate = false
        checkAll(n, value)
      })
    }
    function checkIndeterminate(node: Node) {
      if (!node) return
      let root: any = node
      // 向上遍历父级节点
      while(root) {
        if (hasChild(root)) {
          // 获取当前循环节点已选择的子节点个数
          const checkedChildNodes = root.childNodes.filter((item: Node) => item.checked)

          // 如果没有一个子节点被选中，那么当前节点为不勾选
          if (checkedChildNodes.length === 0) {
            root.checked = false
            root.indeterminate = false
          } else if (checkedChildNodes.length < root.childNodes.length) {
            // 如果有未勾选的子节点，退出循环，因为从该节点开始以及该节点的所有父级节点都是半状态
            break
          } else {
            // 到这里说明所有子节点都是选中状态，设置该节点为选中
            root.indeterminate = false
            root.checked = true
          }
        }
        root = root.parent
      }

      // 如果 root 不为空，将该节点以及该节点的所有父级节点设置为半选状态
      while(root) {
        root.checked = false
        root.indeterminate = true
        root = root.parent
      }
      return root
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
    function getNodes(data: TreeNodeData[], parent: Node | null = null): Node[] {
      if (!data) return []
      const childrenKey = dataProps.value.children
      const labelKey = dataProps.value.label

      let checkedCount = 0
      const result = data.map(item => {
        const keyValue = item[props.nodeKey] || seedId++
        const checked = props.defaultCheckedKeys.includes(keyValue)

        const node: Node = {
          [props.nodeKey]: keyValue,
          data: item,
          label: item[labelKey],
          level: parent ? parent.level + 1 : 1,
          childNodes: [] as any,
          parent,
          isLeaf: false,
          expand: false,
          checked: checked || parent?.checked
        }

        if (item[childrenKey] && item[childrenKey].length) {
          // 递归处理
          node.childNodes = getNodes(item[childrenKey], node)
        } else {
          // 没有children说明改节点为叶子节点
          node.isLeaf = true

          if (node.checked) {
            checkedCount++
          }
        }
        return node
      })

      // 如果有选择的节点，检查并修改父级节点的选中状态
      if (checkedCount > 0 && parent) {
        checkIndeterminate(parent)
      }
      return result
    }
    function renderContext(data: Node[]): any[] {
      if (!data) return []
      let nodes = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        // 处理过滤
        const childNodes = item.childNodes!
        let child = null

        const label = renderLabel(item)
        const icon = h(VanIcon, { name: 'caret-right', class: [n('node__expand-icon'), { 'is-leaf': item.isLeaf }] })
        const checkbox = getCheckbox(item)
        const content = h(
          'div',
          {
            class: [n('node__content'), { 'is-expand': item.expand, 'is-checked': item.checked }],
            style: { paddingLeft: item.level * 18 + 'px' },
            onClick() {
              handleNodeClick(item)
            }
          },
          [icon, checkbox, label]
        )
        if (childNodes.length) {
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
          child = h('div', { class: [n('node')]}, content)
        }
        nodes.push(child)
      }

      return nodes
    }

    function handleNodeClick(node: Node) {
      node.expand = !node.expand
      emit('node-click', node)
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