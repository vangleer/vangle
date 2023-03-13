
import { InjectionKey, PropType } from 'vue'
type TableData = {
  [key: string]: any
}
export const TableProps = {
  data: {
    type: Array as PropType<TableData[]>,
    default: () => []
  }
}

export const TableColumnProps = {
  prop: {
    type: String
  },
  label: String,
  width: {
    type: [Number, String]
  }
}

export interface Store {
  columns: TableData[]
}

export interface Table {
  store: any,
  tableName: string
}

export const TableContextKey: InjectionKey<Table> =
  Symbol('TableContextKey')