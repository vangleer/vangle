import { Middleware, Placement, Strategy, ComputePositionReturn } from '@floating-ui/core'
import { computePosition } from '@floating-ui/dom'
import { onMounted, ref, ToRefs, unref, watchEffect } from 'vue'
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
    console.log(middleware, 'middleware')
    const data: any = await computePosition(referenceRef.value, contentRef.value, {
      middleware: unref(middleware),
      placement: unref(placement),
      strategy: unref(strategy)
    })

    console.log(data, 'datadatadata')
    Object.keys(states).forEach(key => {
      (states as any)[key].value = data[key]
    })
  }

  onMounted(() => {
    watchEffect(() => {
      update()
    })
  })

  return {
    ...states,
    update,
    referenceRef,
    contentRef
  }
}