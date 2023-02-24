export * from './src/collapse'
import { withInstall } from '@vangle/utils'
import Collapse from './src/collapse.vue'
import CollapseItem from './src/collapse-item.vue'

export const VanCollapse = withInstall(Collapse)
export const VanCollapseItem = withInstall(CollapseItem)

export default VanCollapse