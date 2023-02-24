import { isString, isNumber } from './common'
export function addUnit(value: string | number, defaultUnit = 'px') {
  if (!value) return ''
  if (isString(value)) {
    return `${value}`.indexOf(defaultUnit) === -1 ? `${value}${defaultUnit}` : value
  } else if (isNumber(value)) {
    return `${value}${defaultUnit}`
  }
}