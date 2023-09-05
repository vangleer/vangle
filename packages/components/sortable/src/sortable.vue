<template>
  <div ref="sortableRef" :class="n()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { createNamespace } from '@vangle/utils'
import { SortableProps } from './sortable'
import { useSortable } from './use-sortable'
defineOptions({
  name: 'VanSortable'
})

const props = defineProps(SortableProps)

const { n } = createNamespace('sortable')

const sortableRef = ref<HTMLElement | null>(null)

useSortable(props, sortableRef)

</script>

<style lang="less">
@import './sortable.less';
</style>
