export * from './src/date-picker'
import { withInstall } from '@vangle/utils'
import DatePicker from './src/date-picker.vue'

export const VanDatePicker = withInstall(DatePicker)

export default VanDatePicker