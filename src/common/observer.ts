// eslint-disable-next-line
export interface ObserverKey<T> extends Symbol {
}

interface ObserverFunc<T> {
  (value: T): void;
}

const targetsMap: Map<Symbol, Array<Function>> = new Map<Symbol, Array<Function>>()

export function subscribe<T> (key: ObserverKey<T>, func: ObserverFunc<T>): void {
  const depsMap: Array<Function> | undefined = targetsMap.get(key)
  if (!depsMap) {
    targetsMap.set(key, [func])
  } else {
    depsMap.push(func)
    targetsMap.set(key, depsMap)
  }
}

export function publish<T> (key: ObserverKey<T>, value: T): void {
  const depsMap: Array<Function> | undefined = targetsMap.get(key)
  if (!depsMap) {
    console.warn('"ObserverKey" is not defined')
  } else {
    depsMap.forEach((callback) => {
      callback(value)
    })
  }
}

export function unsubscribe<T> (key: ObserverKey<T>, func?: ObserverFunc<T>): void {
  const depsMap: Array<Function> | undefined = targetsMap.get(key)
  if (depsMap) {
    if (func && depsMap.length > 0) {
      const index: number = depsMap.findIndex((item) => {
        return func === item
      })
      if (index === -1) {
        console.warn('"ObserverFunc" is not defined')
      } else {
        depsMap.splice(index, 1)
        if (depsMap.length) {
          targetsMap.set(key, depsMap)
        } else {
          targetsMap.delete(key)
        }
      }
    } else {
      targetsMap.delete(key)
    }
  }
}
