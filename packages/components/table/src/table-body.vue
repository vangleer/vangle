<template>
  <!-- <tbody>
    <tr v-for="row, index in data" :class="[n('row'), getRowClassName(row, index)]">
      <td v-for="col in store.columns" :class="n('cell')">
        <div class="cell">{{ row[col.prop] }}</div>
      </td>
    </tr>
  </tbody> -->
</template>
<script lang="ts">
import { defineComponent, h, inject, PropType } from 'vue'
import { createNamespace, isFunction } from '@vangle/utils'
import { TableData, Store, TableContextKey, TableProps } from './table'

export default defineComponent({
  name: 'VanTableColumn',
  props: {
    data: TableProps.data,
    store: {
      type: Object as PropType<Store>
    },
    rowClassName: TableProps.rowClassName
  },
  setup(props, { slots }) {
    const { n } = createNamespace('table')
    const parent = inject(TableContextKey)
    const getRowClassName = (row: TableData, rowIndex: number) => {
      return props.rowClassName && isFunction(props.rowClassName)
        ? props.rowClassName({ row, rowIndex })
        : props.rowClassName
    }
    const renderRow = () => {
      return props.data!.map((row, index) => {
        return h(
          'tr',
          { class: [n('row'), getRowClassName(row, index)] },
          parent?.store.columns.map((col: any) => {
            const content = col.renderCell({ row, colomn: col }) || [row[col.prop]]
            return h('td', { class: n('cell') }, h('div', { class: 'cell' }, content))
          })
        )
      })
    }

    return () => h('tbody', {}, renderRow())
  }
})

</script>

<style lang="less">
</style>
