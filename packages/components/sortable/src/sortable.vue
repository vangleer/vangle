<template>
  <div :class="n()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '@vangle/utils'
import { SortableProps } from './sortable'
defineOptions({
  name: 'VanSortable'
})

defineProps(SortableProps)

const { n, classes } = createNamespace('sortable')
</script>

<style lang="less">
@import './sortable.less';
</style>
