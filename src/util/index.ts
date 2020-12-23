export const isArray = Array.isArray
export const objectToString = Object.prototype.toString

export function toTypeString (value: unknown): string {
  return objectToString.call(value)
}

export function toRawType (value: unknown): string {
  return toTypeString(value).slice(8, -1)
}

export function isFunction (val: unknown): val is Function {
  return typeof val === 'function'
}

export function isString (val: unknown): val is string {
  return typeof val === 'string'
}

export function isNumeric (val: any): boolean {
  return !isNaN(parseFloat(val)) && isFinite(val)
}

export function isValid (val: unknown): boolean {
  return val !== undefined && val !== null && val !== ''
}

export function isSymbol (val: unknown): val is symbol {
  return typeof val === 'symbol'
}

export function isObject (val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}

export function isEmptyObject (value: Record<any, any>): boolean {
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false
    }
  }
  return true
}

export function isPromise<T = any> (val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function toNumber (val: any): any {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

const onRE = /^on[^a-z]/

export function isOn (key: string): boolean {
  return onRE.test(key)
}

export function NO (): false {
  return false
}
