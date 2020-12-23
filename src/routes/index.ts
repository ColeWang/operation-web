import { RouteRecordRaw } from 'vue-router'
import Main from '../components/main'

/**
 * meta: {
 *  title: 导航栏title
 *  icon: 导航栏icon
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  access: (null) 可访问该页面的权限数组 当前路由设置的权限会影响子路由
 * }
 */

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/',
    name: '_home',
    component: Main,
    redirect: { name: 'home' },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'iconhome-filling'
        },
        component: () => import('@/views/home/Home.vue')
      }
    ]
  },
  {
    path: '/alpha-menu',
    name: 'alpha-menu',
    meta: {
      title: '多级菜单',
      icon: 'iconhome-filling'
    },
    component: Main,
    children: [
      {
        path: 'level-1',
        name: 'level-1',
        meta: {
          title: 'level-1',
          icon: 'iconhome-filling'
        },
        component: () => import('@/views/alpha-menu/Level1.vue')
      },
      {
        path: 'level-2',
        name: 'level-2',
        meta: {
          title: 'level-2',
          icon: 'iconhome-filling'
        },
        component: () => import('@/views/alpha-menu/Level2.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error-401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error-500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/500.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error-404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/404.vue')
  }
]

export default routes
