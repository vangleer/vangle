export * from './src/tooltip'
import { withInstall } from '@vangle/utils'
import Tooltip from './src/tooltip.vue'
export const VanTooltip = withInstall(Tooltip)

export default VanTooltip