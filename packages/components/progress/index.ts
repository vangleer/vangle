export * from './src/progress'
import { withInstall } from '@vangle/utils'
import Progress from './src/progress.vue'

export const VanProgress = withInstall(Progress)

export default VanProgress