import { InjectionKey, PropType, ExtractPropTypes } from 'vue'
export interface TreeNodeData {
  [key: string]: any
}
export interface TreeOptionProps {
  children?: string
  label?: string | ((data: TreeNodeData, node: Node) => string)
  disabled?: string | ((data: TreeNodeData, node: Node) => string)
  isLeaf?: string | ((data: TreeNodeData, node: Node) => boolean)
  class?: (
    data: TreeNodeData,
    node: Node
  ) => string | { [key: string]: boolean } | string
}
export type RenderContentFn = (h: any, source: { node: Node, data: any, store: Node['store'] }) => void
export const TreeProps = {
  data: {
    type: Array as PropType<TreeNodeData[]>,
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
  emptyText: {
    type: String,
    default: 'no Data'
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
  },
  draggable: {
    type: Boolean
  },
  allowDrop: {
    type: Function
  },
  allowDrag: {
    type: Function
  }
}

export const TreeContextKeys: InjectionKey<ExtractPropTypes<typeof TreeProps>> = Symbol('TreeContextKeys')
export type TreeKey = string | number
export interface Node {
  id?: number,
  level: number,
  label: string | number,
  isLeaf?: boolean
  checked?: boolean
  childNodes?: Node[],
  expand?: boolean,
  disabled?: boolean,
  parent?: Node | null,
  indeterminate?: boolean,
  loaded?: boolean
  loading?: boolean
  data?: any,
  store?: any
}

export type TreeStore = {
  childNodes: Node[]
  children: TreeNodeData[]
}
