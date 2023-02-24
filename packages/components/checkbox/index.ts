export * from './src/checkbox'
import { withInstall } from '@vangle/utils'
import Checkbox from './src/checkbox.vue'
import CheckboxGroup from './src/checkbox-group.vue'

export const VanCheckbox = withInstall(Checkbox)
export const VanCheckboxGroup = withInstall(CheckboxGroup)

export default VanCheckbox