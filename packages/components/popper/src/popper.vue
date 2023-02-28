<template>
  <Teleport :to="`#${selector}`">
    <Transition>
      <div v-show="show" ref="popperRef" :class="[n(), `is-${effect}`]">
        <slot name="content"></slot>
        <span :class="n('arrow')"></span>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { createNamespace } from '@vangle/utils'
import { PopperProps } from './popper'
import { usePopperContainer } from './use-popper-container'
defineOptions({
  name: 'VanPopper'
})

const props = defineProps(PopperProps)
const { n } = createNamespace('popper')
const popperRef = ref()
const show = ref(false)
const { selector } = usePopperContainer()

defineExpose({
  reference: popperRef
})
</script>

<style lang="less">
@import './popper.less';
</style>
