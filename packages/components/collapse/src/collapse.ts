import { InjectionKey, Ref } from 'vue'
export const CollapseProps = {
  modelValue: {
    type: [String, Array],
    default: () => ([])
  },
  accordion: {
    type: Boolean
  }
}

export type CollapseActiveName = string | number

export interface CollapseContext {
  activeNames: Ref<CollapseActiveName[]>
  handleItemClick: (name: CollapseActiveName) => void
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol('collapseContextKey')
