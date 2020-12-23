import { hasOneOf } from '@/util/oneOf'
import { RouteRecordRaw, RouteMeta } from 'vue-router'

/**
 * Menu item
 */
export interface MenuItem {
  icon: string;
  name: string;
  meta: RouteMeta | undefined;
  children?: Array<MenuItem>;
}

/**
 * 路由权限效验
 */
function showThisMenuEle (item: RouteRecordRaw, access: Array<string | number>): boolean {
  if (item.meta && item.meta.access && item.meta.access.length) {
    return hasOneOf<string | number>(item.meta.access, access)
  } else {
    return true
  }
}

/**
 * 判断子元素 children
 */
function hasChild (item: RouteRecordRaw): boolean {
  return !!(item.children && item.children.length !== 0)
}

/**
 * hasAccess
 */
function hasAccess (access: Array<string | number>, route: RouteRecordRaw): boolean {
  if (route.meta && route.meta.access) {
    return hasOneOf(access, route.meta.access)
  } else {
    return true
  }
}

/**
 * 生成动态路由 list
 */
export function getMenuList (routers: RouteRecordRaw[] = [], access: Array<string | number>): MenuItem[] {
  const arr: MenuItem[] = []
  routers.forEach((item) => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      const obj: MenuItem = {
        icon: (item.meta && item.meta.icon) || '',
        name: (item.name as string),
        meta: item.meta
      }
      if (hasChild(item) && showThisMenuEle(item, access)) {
        obj.children = getMenuList(item.children, access)
      }
      if (showThisMenuEle(item, access)) {
        arr.push(obj)
      }
    }
  })
  return arr
}

/**
 * 一个子元素时 独占一行 不生成下拉菜单
 */
export function showChildren (item: MenuItem): boolean {
  return !!(item.children && item.children.length > 1)
}

/**
 * 权鉴
 */
export function canTurnTo (name: string, access: Array<string | number>, routes: RouteRecordRaw[]): boolean {
  function routePermissionJudge (list: RouteRecordRaw[]): boolean {
    return list.some((item) => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return routePermissionJudge(routes)
}
