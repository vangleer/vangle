<template>
  <button
    :class="[
      n(),
      type && n(`--${type}`),
      size && n(`--${size}`),
      plain && 'is-plain',
      round && 'is-round',
      circle && 'is-circle',
      disabled && 'is-disabled',
      text && 'is-text'
    ]"
    :style="{
      color: textColor,
      ...style
    }"
    :disabled="disabled"
  >
    <div :class="[n('content')]">
      <slot />
    </div>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { createNamespace } from '@vangle/utils'
import { ButtonProps } from './button'
defineOptions({
  name: 'VanButton'
})

const props = defineProps(ButtonProps)
const style = computed(() => props.color ? {
  '--van-button-bg-color': props.color,
  '--van-button-text-color': 'var(--van-color-white)',
  '--van-button-border-color': props.color
} : {})

const { n } = createNamespace('button')
</script>

<style lang="less">
@import './button.less';
</style>
