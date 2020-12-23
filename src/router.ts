import { createRouter, createWebHashHistory, Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { baseLoading } from '@/App'
import { message, Modal } from 'ant-design-vue'
import { canTurnTo } from '@/components/main/util'
import { getToken, removeToken, removeUsername } from '@/common/auth'
import { homeName } from '@/config'
import store from '@/store/index'
import { GET_USER_INFO, UserInfo } from '@/store/modules/user'
import routes from '@/routes/index'

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

function turnTo (to: RouteLocationNormalized, access: Array<string | number>, next: NavigationGuardNext): void {
  if (canTurnTo((to.name as string), access, routes)) {
    next()
  } else {
    next({ replace: true, name: 'error-401' })
  }
}

const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
  baseLoading.hide()
  message.destroy()
  Modal.destroyAll()
  const token: string | undefined = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    next({ name: LOGIN_PAGE_NAME })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    next()
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    next({ name: homeName })
  } else {
    if (store.state.user.userInfo.hasGetInfo) {
      turnTo(to, store.state.user.userInfo.access, next)
    } else {
      baseLoading.show()
      store.dispatch(GET_USER_INFO)
        .then((userInfo: UserInfo) => {
          turnTo(to, userInfo.access, next)
        })
        .catch((err) => {
          removeUsername()
          removeToken()
          Modal.error({
            title: '错误',
            content: err.message,
            onOk () {
              next({ name: LOGIN_PAGE_NAME })
            }
          })
        })
        .finally(() => {
          baseLoading.hide()
        })
    }
  }
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
