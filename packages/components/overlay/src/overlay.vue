<template>
  <div
    v-if="mask"
    :class="[
      n(),
      overlayClass
    ]"
    :style="style"
  >
    <slot />
  </div>
  <div v-else :class="[overlayClass]" :style="style"><slot /></div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, CSSProperties, StyleValue } from 'vue'
import { createNamespace } from '@vangle/utils'
import { OverlayProps } from './overlay'
defineOptions({
  name: 'VanOverlay'
})

const props = defineProps(OverlayProps)

const { n } = createNamespace('overlay')

const style: any = computed(() => ({
  zIndex: props.zIndex
}))
</script>

<style lang="less">
@import './overlay.less';
</style>
