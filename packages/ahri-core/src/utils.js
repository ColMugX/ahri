export const assert = (condition, msg) => {
  if (!condition) throw new Error(`[Ahri] ${msg}`)
}
export const isObject = obj => obj !== null && typeof obj === 'object'
export const isFunction = fn => typeof fn === 'function'
export const isString = str => typeof str === 'string'
export const isArray = Array.isArray.bind(Array)
