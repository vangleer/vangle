import { computed, getCurrentInstance } from 'vue'
export const useNowrap = () => {
  const ctx = getCurrentInstance()
  const nowrap = computed(() => {
    if (ctx?.slots.default) {
      const defaults = ctx?.slots.default()
      if (!defaults[0] || defaults[0].shapeFlag === 8) {
        return false
      }
      return true
    }
  })

  return nowrap
}