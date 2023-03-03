export * from './src/popper'
import { withInstall } from '@vangle/utils'
import Popper from './src/popper.vue'

export const VanPopper = withInstall(Popper)

export default VanPopper