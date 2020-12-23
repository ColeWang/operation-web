import { Ref } from 'vue'

/**
 * 解决 button等组件loading状态
 */
export function pendingEffect (loading: Ref<boolean>, func: Function): Function {
  function setLoading (val: boolean): void {
    loading.value = val
  }

  const baseHandler: ProxyHandler<Function> = {
    construct () {
      throw new TypeError('Does not support the new ()')
    },
    apply (trapTarget: Function, thisArg: any, argumentList: any) {
      if (!loading.value) {
        void async function (): Promise<void> {
          setLoading(true)
          await Reflect.apply(trapTarget, thisArg, argumentList)
          setLoading(false)
        }()
      }
    }
  }
  return new Proxy<Function>(func, baseHandler)
}
