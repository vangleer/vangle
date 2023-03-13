<template>
  <div :class="[n('column')]">
    
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted } from 'vue'
import { createNamespace } from '@vangle/utils'
import { TableColumnProps, TableContextKey } from './table'
import { createColumnName } from './utils'
defineOptions({
  name: 'VanTableColumn'
})

const props = defineProps(TableColumnProps)

const { n } = createNamespace('table')

const ctx = inject(TableContextKey)

onMounted(() => {
  ctx?.store.columns.push({ ...props, name: `${ctx?.tableName}_${createColumnName()}` })
})
</script>

<style lang="less">
</style>
