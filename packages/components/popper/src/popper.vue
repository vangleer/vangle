<template>
  <Trigger :nowrap="nowrap" :trigger="trigger" v-bind="$attrs">
    <slot></slot>
  </Trigger>
  <Teleport :to="`#${selector}`">
    <Transition :name="transitionName">
      <div
        v-if="!disabled && show"
        ref="contentRef"
        :class="[n(), `is-${effect}`, { 'is-pure': pure }, popperClass]"
        :style="contentStyle"
        :data-side="placement"
      >
        <slot name="content">{{ content }}</slot>
        <span v-if="showArrow" ref="arrowRef" :data-side="side" :class="n('arrow')" :style="arrowStyle"></span>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { provide, onMounted, ref, unref, computed, watch } from 'vue'
import { createNamespace } from '@vangle/utils'
import { PopperProps, PopperContextKey } from './popper'
import { usePopperContainer } from './use-popper-container'
import Trigger from './trigger.vue'
import { useFloating } from './use-floating'
import { offset, arrow, shift, flip } from '@floating-ui/dom'
defineOptions({
  name: 'VanPopper'
})

const props = defineProps(PopperProps)
const { n } = createNamespace('popper')
const arrowRef = ref()
const show = ref(false)
const { selector } = usePopperContainer()
const placement = ref(props.placement)
const strategy = computed({
  get: () =>  props.strategy,
  set: () => {}
})

const middleware = computed(() => {
  const mds = [shift(), flip(), offset(props.offset)]
  if (props.showArrow) {
    mds.push(arrow({ element: arrowRef.value }))
  }
  return mds
})

const { x, y, referenceRef, contentRef, middlewareData, update } = useFloating({ middleware, placement, strategy })

const contentStyle = computed(() => ({ left: x.value + 'px', top: y.value + 'px' }))
const side = computed(() => {
  return placement.value.split('-')[0]
})
const arrowStyle = computed(() => {
  if (!props.showArrow) return {}
  const { arrow } = unref(middlewareData)
  return { left: arrow?.x + 'px', top: arrow?.y + 'px' }
})

defineExpose({
  reference: contentRef,
  update,
  onClose,
  onOpen
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

watch(() => [props.visible], ([val]) => {
  show.value = val
})

provide(PopperContextKey, {
  onClose,
  onOpen,
  triggerRef: referenceRef
})
</script>

<style lang="less">
@import './popper.less';
</style>
