import { defineComponent, Fragment, ref } from "vue";

export default defineComponent({
  props: {
    setRef: { type: Function, required: true },
    onlyChild: Boolean
  },
  setup(props, { slots }) {
    const setRef = (el: HTMLElement | null) => {
      if (el) {
        props.setRef(el.nextElementSibling || null)
      } else {
        props.setRef(null)
      }
    }
    return () => {
      const [firstChild] = slots.default?.() || []
      const child = props.onlyChild ? (firstChild.children as any)[0] : firstChild.children
      return <Fragment ref={setRef as any}>{child}</Fragment>
    }
  }
})