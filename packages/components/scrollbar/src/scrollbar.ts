import { InjectionKey, Ref } from 'vue'
export const ScrollbarProps = {
  height: {
    type: [String, Number]
  },
  native: {
    type: Boolean
  },
  always: {
    type: Boolean
  },
  minSize: {
    type: Number,
    default: 20,
  },
  vertical: {
    type: Boolean
  },
  maxHeight: {
    type: [String, Number]
  }
}

interface ScrollbarContext {
  wrapRef: Ref<HTMLElement>
  setScrollTop: (num: number) => void
  setScrollLeft: (num: number) => void
}

export const ScrollbarContextKey: InjectionKey<ScrollbarContext> = Symbol('ScrollbarContextKey')