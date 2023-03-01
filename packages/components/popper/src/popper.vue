<template>
  <Trigger nowrap>
    <slot></slot>
  </Trigger>
  <Teleport :to="`#${selector}`">
    <Transition :name="transitionName">
      <div v-show="show" ref="contentRef" :class="[n(), `is-${effect}`]" :style="contentStyle">
        <slot name="content"></slot>
        <span ref="arrowRef" :class="n('arrow')" :style="arrowStyle"></span>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { provide, onMounted, ref, computed } from 'vue'
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
const show = ref(true)
const { selector } = usePopperContainer()

const placement = computed(() =>  props.placement)
const strategy = computed(() =>  props.strategy)

const middleware = computed(() => {
  return [flip(), shift(), offset(props.offset), props.showArrow && arrow({ element: arrowRef.value })]
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
  console.log(referenceRef.value)
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
