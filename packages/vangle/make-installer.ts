import type { App, Plugin } from 'vue'

const INSTALLED_KEY = Symbol('INSTALLED_KEY')

export function makeInstaller(components: Plugin[] = []) {
  const install = (app: App) => {
    if ((app as any)[INSTALLED_KEY]) return
      ; (app as any)[INSTALLED_KEY] = true
    components.forEach(comp => app.use(comp))
  }

  return {
    install
  }
}
