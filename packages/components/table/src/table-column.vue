<script lang="ts">
import { defineComponent, h, inject, onMounted, onBeforeUnmount, watch, onUnmounted } from 'vue'
import { createNamespace } from '@vangle/utils'
import { TableColumnProps, TableContextKey, TableData,  } from './table'
import { columnId } from './utils'

export default defineComponent({
  name: 'VanTableColumn',
  props: TableColumnProps,
  setup(props, { slots }) {
    const { n } = createNamespace('table')
    const ctx = inject(TableContextKey)

    const id = columnId()

    function fn() {
      let width: number | undefined = parseInt(props.width as any)
      if (isNaN(width)) {
        width = undefined
      }
      return {
        ...props,
        width,
        id,
        renderCell(row: TableData) {
          if (slots.default) {
            return slots.default(row)
          }
        }
      }
    }
    watch(() => [props.width, props.label, props.prop], () => {
      const index = ctx?.store.columns.findIndex((c: TableData) => c.id === id)
      ctx?.store.columns.splice(index, 1, fn())
    })
    onMounted(() => {
      ctx?.store.columns.push(fn())
    })

    onUnmounted(() => {
      const index = ctx?.store.columns.findIndex((c: TableData) => c.id === id)
      ctx?.store.columns.splice(index, 1)
    })
    return () => h('div', { class: n('column') })
  }
})
</script>

<style lang="less">
</style>
