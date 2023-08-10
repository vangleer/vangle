import { computePosition, Middleware, Placement, Strategy, ComputePositionReturn } from '@floating-ui/dom'
import { onMounted, ref, ToRefs, unref, watchEffect, Ref, onBeforeUnmount, computed, useSlots } from 'vue'

let cachedContainer: HTMLElement
const selector = `van-popper-container-1996`

type PopperContainerType = {
  container: HTMLElement
  selector: string
}

export const usePopperContainer = (): PopperContainerType => {
  if (!cachedContainer && !document.querySelector(`#${selector}`)) {
    const container = document.createElement('div')
    container.id = selector
    cachedContainer = container
    document.body.appendChild(container)
  }

  return {
    container: cachedContainer,
    selector
  }
}

type UseFloatingProps = ToRefs<{
  middleware: Array<Middleware>
  placement: Placement
  strategy: Strategy
}>
export const useFloating = ({ middleware, placement, strategy }: UseFloatingProps, triggerRef: Ref<HTMLElement | null>) => {
  const contentRef = ref()
  // popper位置信息
  const x = ref<number>()
  const y = ref<number>()
  // floating-ui 中间件数据
  const middlewareData = ref<ComputePositionReturn['middlewareData']>({})
  const states = {
    x,
    y,
    placement,
    strategy,
    middlewareData,
  } as const
  async function update() {
    if (!triggerRef.value || !contentRef.value) return
    // floating-ui 的 computePosition计算位置
    const data: any = await computePosition(triggerRef.value, contentRef.value, {
      middleware: unref(middleware),
      placement: unref(placement),
      strategy: unref(strategy)
    })
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
    contentRef
  }
}

export function useTrigger() {
  const triggerRef = ref()
  const visible = ref(false)
  // 获取默认插槽
  const trggierSlot = useSlots!().default!()
  // 如果是纯文本
  const noWrap = computed(() => trggierSlot[0].patchFlag === 0)
  const open = () => visible.value = true
  const close = () => visible.value = false
  // 设置触发器dom
  const setTriggerRef = (el: HTMLElement | null) => {
    triggerRef.value = el && el.nextElementSibling || null
  }
  // 点击触发器事件
  const onClick = (e: MouseEvent) => {
    e.stopPropagation()
    open()
    setTimeout(() => {
      document.addEventListener('mousedown', onDocumentMousedown, { once: true })
    })
  }

  // 点击其它区域
  const onDocumentMousedown = () => {
    close()
  }
  onMounted(() => {
    if (!triggerRef.value) return
    triggerRef.value.addEventListener('click', onClick)
  })

  onBeforeUnmount(() => {
    triggerRef.value!.removeEventListener('click', onClick)
  })

  return {
    setTriggerRef: setTriggerRef as any,
    triggerRef,
    visible,
    noWrap,
    open,
    close
  }
}