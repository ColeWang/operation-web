import { Ref } from 'vue'
import BaseLoading from './BaseLoading.vue'

interface DefineLoading {
  show (): void;

  hide (): void;

  isVisible (): boolean;
}

class Loading implements DefineLoading {
  private visible: Ref<boolean>

  constructor (value: Ref<boolean>) {
    this.visible = value
  }

  show (): void {
    this.visible.value = true
  }

  hide (): void {
    this.visible.value = false
  }

  isVisible (): boolean {
    return this.visible.value
  }
}

export {
  BaseLoading
}

export default Loading
