<template>
  <Trigger nowrap>
    <slot></slot>
  </Trigger>
  <Teleport :to="`#${selector}`">
    <Transition :name="transitionName">
      <div v-if="show" ref="contentRef" :class="[n(), `is-${effect}`]" :style="contentStyle">
        <slot name="content"></slot>
        <span v-if="showArrow" ref="arrowRef" :class="n('arrow')" :style="arrowStyle"></span>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { provide, onMounted, ref, computed, watch } from 'vue'
import { createNamespace } from '@vangle/utils'
import { PopperProps, PopperContextKey } from './popper'
import { usePopperContainer } from './use-popper-container'
import Trigger from './trigger.vue'
import { useFloating } from './use-floating'
import { offset, arrow, flip, shift } from '@floating-ui/dom'
defineOptions({
  name: 'VanPopper'
})

const props = defineProps(PopperProps)
const { n } = createNamespace('popper')
const arrowRef = ref()
const show = ref(false)
const { selector } = usePopperContainer()

const placement = computed({
  get: () =>  props.placement,
  set: () => {}
})
const strategy = computed({
  get: () =>  props.strategy,
  set: () => {}
})

const middleware = computed(() => {
  const mds = [flip(), shift(), offset(props.offset)]
  if (props.showArrow) {
    mds.push(arrow({ element: arrowRef.value }))
  }
  return mds
})

const { x, y, referenceRef, contentRef, middlewareData } = useFloating({ middleware, placement, strategy })

const contentStyle = computed(() => ({ left: x.value + 'px', top: y.value + 'px' }))
const staticSide = computed(() => {
  return {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.value.split('-')[0]]
})
const arrowStyle = computed(() => ({ left: middlewareData.value.arrow?.x + 'px', top: middlewareData.value.arrow?.y, [staticSide.value as string]: '-5px' }))
defineExpose({
  reference: contentRef
})
onMounted(() => {
  watch(
    () => props.reference || referenceRef.value,
    (el) => {
      referenceRef.value = el || undefined
    },
    {
      immediate: true,
    }
  )
})

function onOpen() {
  show.value = true
}
function onClose() {
  show.value = false
}

provide(PopperContextKey, {
  onClose,
  onOpen,
  triggerRef: referenceRef
})
</script>

<style lang="less">
@import './popper.less';
</style>
