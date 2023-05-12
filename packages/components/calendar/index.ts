export * from './src/calendar'
import { withInstall } from '@vangle/utils'
import Calendar from './src/calendar.vue'

export const VanCalendar = withInstall(Calendar)

export default VanCalendar