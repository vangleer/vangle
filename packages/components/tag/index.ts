export * from './src/tag'
import { withInstall } from '@vangle/utils'
import Tag from './src/tag.vue'

export const VanTag = withInstall(Tag)

export default VanTag