export * from './src/dialog'
import { withInstall } from '@vangle/utils'
import Dialog from './src/dialog.vue'

export const VanDialog = withInstall(Dialog)

export default VanDialog