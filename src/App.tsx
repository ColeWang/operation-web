import { defineComponent, ref, Ref } from 'vue'
import Loading, { BaseLoading } from '@/components/base-loading'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

const visible: Ref<boolean> = ref(false)
export const baseLoading: Loading = new Loading(visible)
export default defineComponent({
  render () {
    moment.locale('zh-cn')
    return (
      <ConfigProvider locale={zhCN}>
        <router-view/>
        <BaseLoading visible={visible.value}/>
      </ConfigProvider>
    )
  }
})
