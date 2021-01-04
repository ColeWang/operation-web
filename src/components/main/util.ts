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
 * 判断子元素 children
 */
function hasChild (item: RouteRecordRaw): boolean {
  return !!(item.children && item.children.length !== 0)
}

/**
 * hasAccess
 */
function hasAccess (route: RouteRecordRaw, access: Array<string | number>): boolean {
  if (route.meta && route.meta.access && route.meta.access.length) {
    return hasOneOf<string | number>(access, route.meta.access)
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
      if (hasChild(item) && hasAccess(item, access)) {
        obj.children = getMenuList(item.children, access)
      }
      if (hasAccess(item, access)) {
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
export function canTurnTo (name: string, routes: RouteRecordRaw[], access: Array<string | number>): boolean {
  function routePermissionJudge (list: RouteRecordRaw[]): boolean {
    return list.some((item) => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(item, access)
      }
    })
  }

  return routePermissionJudge(routes)
}
