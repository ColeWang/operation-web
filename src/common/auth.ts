import Cookies from 'js-cookie'
import { cookieExpires } from '@/config'

// token
export const TOKEN_KEY = 'token'

export function setToken (token: string): void {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export function getToken (): string | undefined {
  const token: string | undefined = Cookies.get(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return undefined
  }
}

export function removeToken (): void {
  Cookies.remove(TOKEN_KEY)
}

// 水印 and 用户名
export const USERNAME_KEY = 'username'

export function setUsername (name: string): void {
  Cookies.set(USERNAME_KEY, name, { expires: cookieExpires || 1 })
}

export function getUsername (): string | undefined {
  const username: string | undefined = Cookies.get(USERNAME_KEY)
  if (username) {
    return username
  } else {
    return undefined
  }
}

export function removeUsername (): void {
  Cookies.remove(USERNAME_KEY)
}
