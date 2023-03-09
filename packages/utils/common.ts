export const isNumber = (val: any) => typeof val === 'number'
export const isString = (val: any) => typeof val === 'string'
export const isFunction = (val: any) => typeof val === 'function'
export const hasOwn = (val: any, key: string) => Object.hasOwn(val, key)
