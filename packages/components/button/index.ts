export * from './src/button'
import { withInstall } from '@vangle/utils'
import type { App } from 'vue'
import Button from './src/button.vue'

Button.install = (app: App) => {
  app.component(Button.name, Button)
}

export const VanButton = withInstall(Button)

export default VanButton
