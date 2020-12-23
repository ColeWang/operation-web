import { Directive } from 'vue'
import { isArray } from '@/util'
import { hasOneOf } from '@/util/oneOf'
import store from '@/store'

const has: Directive<any, string | number | string[] | number[] | undefined> = {
  mounted (element: HTMLElement, binding) {
    if (typeof binding.value !== 'undefined') {
      let target: Array<string | number>
      if (isArray(binding.value)) {
        target = [...binding.value]
      } else {
        target = [binding.value]
      }
      if (!hasOneOf(target, store.state.user.userInfo.access)) {
        element.remove()
      }
    }
  }
}

export default has
