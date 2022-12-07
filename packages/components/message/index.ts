export * from './src/message'
import { withInstallFunction } from '@vangle/utils'
import Message from './src/message-method'

export const VanMessage = withInstallFunction(Message, '$message')

export default VanMessage