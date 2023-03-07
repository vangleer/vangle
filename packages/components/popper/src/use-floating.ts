import { computePosition, Middleware, Placement, Strategy, ComputePositionReturn } from '@floating-ui/dom'
import { onMounted, ref, ToRefs, unref, watchEffect, watch } from 'vue'
type UseFloatingProps = ToRefs<{
  middleware: Array<Middleware>
  placement: Placement
  strategy: Strategy
}>
export const useFloating = ({ middleware, placement, strategy }: UseFloatingProps) => {
  const referenceRef = ref()
  const contentRef = ref()
  const x = ref<number>()
  const y = ref<number>()
  const middlewareData = ref<ComputePositionReturn['middlewareData']>({})
  const states = {
    x,
    y,
    placement,
    strategy,
    middlewareData,
  } as const
  async function update() {

    if (!referenceRef.value || !contentRef.value) return
    const data: any = await computePosition(referenceRef.value, contentRef.value, {
      middleware: unref(middleware),
      placement: unref(placement),
      strategy: unref(strategy)
    })
    Object.keys(states).forEach(key => {
      (states as any)[key].value = data[key]
    })
  }
  // watch([referenceRef, contentRef], update, { flush: 'sync' })
  // watch([middleware, placement, strategy], update, {
  //   flush: 'sync',
  // });

  onMounted(() => {
    watchEffect(() => {
      update()
    })
  })
  return {
    ...states,
    x,
    y,
    update,
    referenceRef,
    contentRef
  }
}
