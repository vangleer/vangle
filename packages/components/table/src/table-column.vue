<template>
  <div :class="[n('column')]"></div>
</template>

<script lang="ts" setup>
import { inject, onMounted } from 'vue'
import { createNamespace } from '@vangle/utils'
import { TableColumnProps, TableContextKey } from './table'
import { columnId } from './utils'
defineOptions({
  name: 'VanTableColumn'
})

const props = defineProps(TableColumnProps)

const { n } = createNamespace('table')

const ctx = inject(TableContextKey)

function fn() {
  let width: number | undefined = parseInt(props.width as any)
  if (isNaN(width)) {
    width = undefined
  }
  return {
    ...props,
    width,
    id: columnId()
  }
}

onMounted(() => {
  ctx?.store.columns.push(fn())
})
</script>

<style lang="less">
</style>
