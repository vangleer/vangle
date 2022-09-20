export * from './src/message-box'
import { withInstall } from '@vangle/utils'
import MessageBox from './src/message-box.vue'

export const VanMessageBox = withInstall(MessageBox)

export default VanMessageBox