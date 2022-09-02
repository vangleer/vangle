export * from '../components'

import installer from './defaults'

export const install = installer.install
export default installer

// export * from '../components'
// import type { App, Plugin } from 'vue'

// import { VanButton } from '@vangle/components'

// const components = [VanButton] as Plugin[]

// const INSTALLED_KEY = Symbol('INSTALLED_KEY')
// export const install = (app: App) => {
//   if (app[INSTALLED_KEY]) return
//   app[INSTALLED_KEY] = true
//   components.forEach(comp => app.use(comp))
// }

// export default {
//   install
// }
