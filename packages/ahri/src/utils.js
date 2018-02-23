export const assert = (condition, msg) => {
  if (!condition) throw new Error(`${msg}`)
}
export const isObject = obj => obj !== null && typeof obj === 'object'
export const isFunction = fn => typeof fn === 'function'
export const isElement = node => typeof node === 'object' && node !== null && node.nodeType && node.nodeName
