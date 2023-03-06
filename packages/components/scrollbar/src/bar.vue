<template>
  <div :class="n('bar')">
    <div :class="n('thumb')"></div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '@vangle/utils'
import { ScrollbarProps } from './scrollbar'
defineOptions({
  name: 'VanScrollbar'
})
type DirectionType = 'verticle' | 'horizontal'
defineProps({
  direction: {
    type: Boolean
  }
})

const { n } = createNamespace('scrollbar')
</script>

<style lang="less">
@import './scrollbar.less';
</style>
