import { App } from 'vue'
export * from './src/ripple'
import './src/ripple.less'
import { ripple } from './src/ripple'
export default {
  install(app: App) {
    app.directive('ripple', ripple)
  }
}