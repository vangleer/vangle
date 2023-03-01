<template>
  <ForwarRef v-if="nowrap" :set-ref="setTriggerRef" only-child>
    <slot />
  </ForwarRef>
  <button v-else ref="triggerRef" v-bind="$attrs">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { inject, onMounted } from 'vue'
import { createNamespace } from '@vangle/utils'
import { PopperContextKey } from './popper'
import ForwarRef from './forward-ref'

defineOptions({
  name: 'VanPopper'
})

const props = defineProps({
  nowrap: Boolean
})
const { n } = createNamespace('popper')

const { onClose, onOpen, triggerRef } = inject(PopperContextKey)!

const setTriggerRef = (el: HTMLElement) => {
  triggerRef.value = el
}
defineExpose({
  reference: triggerRef
})
onMounted(() => {
  triggerRef.value?.classList.add(n('trigger'));
  (triggerRef.value as HTMLElement).addEventListener('mouseenter', () => {
    onOpen()
  });
  (triggerRef.value as HTMLElement).addEventListener('mouseleave', () => {
    onClose()
  });
})
</script>

<style lang="less">
@import './popper.less';
</style>
