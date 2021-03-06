import { App, Component, Plugin } from 'vue'
import {
  Modal,
  Space,
  Row,
  Col,
  Button,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Radio,
} from 'ant-design-vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'

const OIcon: Component = (createFromIconfontCN({
  scriptUrl: require('@/assets/icon/iconfont.js')
}) as Component)

const components: Array<Plugin> = [
  Modal,
  Space,
  Row,
  Col,
  Button,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Radio,
]

function plugin (app: App<Element>): void {
  app.component('o-icon', OIcon)
  components.map((item) => {
    app.use(item)
  })
}

export default plugin
