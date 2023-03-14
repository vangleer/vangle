<template>
  <div :class="claz" ref="tableRef">
    <div :class="[n('inner-wrapper')]">
      <div ref="hiddenColumns" class="hidden-columns">
        <slot />
      </div>
      <div :class="[n('header-wrapper')]">
        <table
          :class="n('header')"
          :style="tableStyle"
          border="0"
          cellpadding="0"
          cellspacing="0"
        >
          <hColgroup :columns="store.columns" :table-layout="tableLayout" />
          <thead>
            <tr>
              <th v-for="col in store.columns" :class="n('cell')">
                <div class="cell">{{ col.label }}</div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div :class="[n('body-wrapper')]">
        <VanScrollbar :height="height">
          <table 
            :class="n('body')"
            :style="tableStyle"
            border="0"
            cellpadding="0"
            cellspacing="0"
          >
            <hColgroup :columns="store.columns" :table-layout="tableLayout" />
            <TableBody
              :data="data"
              :rowClassName="rowClassName"
              :store="store"
            />
          </table>
        </VanScrollbar>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, provide, reactive, ref, computed, CSSProperties, watchEffect } from 'vue'
import { createNamespace } from '@vangle/utils'
import { TableProps, TableContextKey, Store } from './table'
import { tableId } from './utils'
import { hColgroup } from './h-helper'
import { VanScrollbar } from '@vangle/components'
import TableBody from './table-body.vue'
defineOptions({
  name: 'VanTable'
})

const props = defineProps(TableProps)

const { n } = createNamespace('table')
const tableRef = ref<HTMLElement | null>(null)
const table = getCurrentInstance() as any

const store = reactive<Store>({
  columns: []
})
table.tableId = tableId()
table.store = store

provide(TableContextKey, table)

const claz = computed(() => [n(), { [n('--striped')]: props.stripe, [n('--border')]: props.border }])

const tableStyle = computed<CSSProperties>(() => {
  const style = { width: props.width, tableLayout: props.tableLayout }
  return style
})

onMounted(() => {
  watchEffect(() => {
    let tableWidth = tableRef.value!.offsetWidth
    const ws = store.columns.filter(item => {
      if (item.width) {
        tableWidth -= item.width as number
      }
      return !item.width
    })
    if (ws.length !== store.columns.length) {
      tableWidth /= ws.length
      ws.forEach(w => w.width = tableWidth)
    }
  })
})
</script>

<style lang="less">
@import './table.less';
</style>
