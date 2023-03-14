
import { InjectionKey, PropType, ExtractPropTypes, Ref } from 'vue'
export type TableData = {
  [key: string]: any
}
export type TableLayout = 'fixed' | 'auto'
export const TableProps = {
  data: {
    type: Array as PropType<TableData[]>,
    default: () => []
  },
  tableLayout: {
    type: String as PropType<TableLayout>,
    default: 'auto'
  },
  width: {
    type: String
  },
  border: Boolean,
  stripe: Boolean,
  rowClassName: {
    type: [Function, String]
  },
  height: {
    type: [String, Number]
  }
}

export type TableTypes = ExtractPropTypes<typeof TableProps>

export const TableColumnProps = {
  id: Number,
  prop: {
    type: String
  },
  label: String,
  width: {
    type: [Number, String]
  }
}

export type TableColumnTypes = ExtractPropTypes<typeof TableColumnProps>

export interface Store {
  columns: TableColumnTypes[]
}

export interface Table {
  columns: Ref<TableData[]>
  store: any,
  tableName: string
}

export const TableContextKey: InjectionKey<Table> =
  Symbol('TableContextKey')
