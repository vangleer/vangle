<template>
  <div :class="[n()]" ref="tableRef">
    <div :class="[n('inner-wrapper')]">
      <div ref="hiddenColumns" class="hidden-columns">
        <slot />
      </div>
      <div :class="[n('header-wrapper')]">
        <table :class="n('header')">
          <colgroup>
            <col v-for="col in store.columns" :width="col.width" :name="col.name">
          </colgroup>
          <thead>
            <tr>
              <th v-for="col in store.columns">{{ col.label }}</th>
            </tr>
          </thead>
        </table>
      </div>
      <div :class="[n('body-wrapper')]">
        <table :class="n('body')">
          <colgroup>
            <col v-for="col in store.columns" :width="col.width">
          </colgroup>
          <tbody>
            <tr v-for="row in data">
              <td v-for="col in store.columns">{{ row[col.prop] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, provide, reactive, ref } from 'vue'
import { createNamespace } from '@vangle/utils'
import { TableProps, TableContextKey, Store } from './table'
import { createTableName } from './utils'

defineOptions({
  name: 'VanTable'
})

defineProps(TableProps)

const { n } = createNamespace('table')
const tableRef = ref<HTMLElement | null>(null)
const table = getCurrentInstance() as any

const store = reactive<Store>({
  columns: []
})
table.tableName = createTableName()
table.store = store

provide(TableContextKey, table)

</script>

<style lang="less">
@import './table.less';
</style>
