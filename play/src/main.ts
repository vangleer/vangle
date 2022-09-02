import { createApp } from 'vue'
import '../../packages/vangle/dist/style.css'
import vangle from '../../packages/vangle/dist'
import App from './App.vue'

createApp(App).use(vangle).mount('#app')
