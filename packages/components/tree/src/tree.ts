import { PropType } from 'vue'
export interface TreeNodeData {
  [key: string]: any
}
export interface TreeOptionProps {
  children?: string
  label?: string | ((data: TreeNodeData, node: TreeNodeType) => string)
  disabled?: string | ((data: TreeNodeData, node: TreeNodeType) => string)
  isLeaf?: string | ((data: TreeNodeData, node: TreeNodeType) => boolean)
  class?: (
    data: TreeNodeData,
    node: TreeNodeType
  ) => string | { [key: string]: boolean } | string
}
export type RenderContentFn = (h: any, source: { node: TreeNodeType, data: any, store: TreeNodeType['store'] }) => void
export const TreeProps = {
  data: {
    type: Array,
    default: []
  },
  props: {
    type: Object as PropType<TreeOptionProps>,
    default: () => ({
      children: 'children',
      label: 'label',
      disabled: 'disabled'
    })
  },
  showCheckbox: {
    type: Boolean
  },
  load: {
    type: Function
  },
  defaultExpandAll: {
    type: Boolean
  },
  nodeKey: {
    type: String,
    default: 'id'
  },
  defaultExpandedKeys: {
    type: Array,
    default: () => ([])
  },
  defaultCheckedKeys: {
    type: Array,
    default: () => ([])
  },
  renderContent: {
    type: Function as PropType<RenderContentFn>
  },
  expandOnClickNode: {
    type: Boolean,
    default: true
  },
  accordion: {
    type: Boolean
  },
  filterNodeMethod: {
    type: Function
  }
}

export interface TreeNodeType {
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
  data?: any,
  store?: any
}
