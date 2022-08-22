<template>
  <button
    :class="
      classes(
        n(),
        n(`--${size}`),
        [block, `van--flex ${n('--block')}`, 'van--inline-flex'],
        [disabled, n('--disabled')],
        [
          text,
          `${n(`--text-${type}`)} ${n('--text')}`,
          `${n(`--${type}`)} van-elevation--2`
        ],
        [text && disabled, n('--text-disabled')],
        [round, n('--round')],
        [outline, n('--outline')]
      )
    "
    :style="{
      color: textColor,
      background: color
    }"
    :disabled="disabled"
  >
    <div :class="classes(n('content'))">
      <slot />
    </div>
  </button>
</template>

<script lang="ts" setup>
import { createNamespace } from '@vangle/utils'
import { ButtonProps } from './button'
defineOptions({
  name: 'VanButton'
})

defineProps(ButtonProps)

const { n, classes } = createNamespace('button')
</script>

<style lang="less">
@import './button.less';
</style>
