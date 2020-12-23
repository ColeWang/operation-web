import { App } from 'vue'
import has from './has'
import watermark from './watermark'

function plugin (app: App<Element>): void {
  // 按钮权限 v-has="options: string | number | string[] | number[]"
  app.directive('has', has)
  // 水印 v-watermark
  app.directive('watermark', watermark)
}

export default plugin
