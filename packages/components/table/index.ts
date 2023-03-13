export * from './src/table'
import { withInstall } from '@vangle/utils'
import Table from './src/table.vue'
import TableColumn from './src/table-column.vue'

export const VanTable = withInstall(Table)
export const VanTableColumn = withInstall(TableColumn)

export default VanTable