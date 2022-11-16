export * from './src/overlay'
import { withInstall } from '@vangle/utils'
import Overlay from './src/overlay.vue'

export const VanOverlay = withInstall(Overlay)

export default VanOverlay