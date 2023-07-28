export * from './src/sortable'
import { withInstall } from '@vangle/utils'
import Sortable from './src/sortable.vue'

export const VanSortable = withInstall(Sortable)

export default VanSortable