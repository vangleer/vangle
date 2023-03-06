export * from './src/scrollbar'
import { withInstall } from '@vangle/utils'
import Scrollbar from './src/scrollbar.vue'

export const VanScrollbar = withInstall(Scrollbar)

export default VanScrollbar