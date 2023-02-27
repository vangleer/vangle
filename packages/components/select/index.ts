export * from './src/select'
import { withInstall } from '@vangle/utils'
import Select from './src/select.vue'
import Option from './src/option.vue'

export const VanSelect = withInstall(Select)
export const VanOption = withInstall(Option)

export default VanSelect