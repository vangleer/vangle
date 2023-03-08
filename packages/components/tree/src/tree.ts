import { PropType } from 'vue'
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
  }
}
export declare type TreeData = TreeNodeData[]
export declare type TreeKey = string | number
export declare type LoadFunction = (
  rootNode: Node,
  loadedCallback: (data: TreeData) => void
) => void

export interface TreeStoreOptions {
  key: TreeKey
  data: TreeData
  lazy: boolean
  props: TreeOptionProps
  load: LoadFunction
  currentNodeKey: TreeKey
  checkStrictly: boolean
  checkDescendants: boolean
  defaultCheckedKeys: TreeKey[]
  defaultExpandedKeys: TreeKey[]
  autoExpandParent: boolean
  defaultExpandAll: boolean
}

export class TreeStore {

}