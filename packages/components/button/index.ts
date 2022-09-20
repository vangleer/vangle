export * from './src/button'
import { withInstall } from '@vangle/utils'
import Button from './src/button.vue'

export const VanButton = withInstall(Button)

export default VanButton
