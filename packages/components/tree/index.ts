export * from './src/tree'
import { withInstall } from '@vangle/utils'
import Tree from './src/tree.vue'

export const VanTree = withInstall(Tree)

export default VanTree