import { createApp, App } from 'vue'
import Root from '@/App'
import router from '@/router'
import store from '@/store'
import plugin from '@/plugin'
import '@/assets/css/reset.css'
import preloader from '@/config/preloader'
import preloaderList from '@/config/preloaderList'

if (process.env.NODE_ENV === 'development') require('@/mock')

const app: App<Element> = createApp(Root)
app.use(router)
app.use(store)
app.use(plugin)

void async function (): Promise<void> {
  await preloader(preloaderList)
  app.mount('#app')
}()
