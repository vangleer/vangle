export const isNumber = (val: any): val is number => typeof val === 'number'
export const isString = (val: any): val is string => typeof val === 'string'
export const isFunction = (val: any): val is Function => typeof val === 'function'
export const hasOwn = (val: any, key: string) => Object.hasOwn(val, key)
