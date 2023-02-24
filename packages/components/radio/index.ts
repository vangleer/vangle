export * from './src/radio'
import { withInstall } from '@vangle/utils'
import Radio from './src/radio.vue'
import RadioGroup from './src/radio-group.vue'

export const VanRadio = withInstall(Radio)
export const VanRadioGroup = withInstall(RadioGroup)

export default VanRadio