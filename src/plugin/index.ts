import { App, Plugin } from 'vue'
import { default as directive } from './directive'
import { default as antD } from './ant-d'

export const plugin: Plugin = {
  install (app: App<Element>): void {
    directive(app)
    antD(app)
  }
}

export default plugin
