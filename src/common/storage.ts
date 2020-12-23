import { isValid } from '@/util'

interface ICache {
  set (key: string, value: any): void;

  setObj<T> (key: string, value: T): void;

  get (key: string): string | undefined;

  getObj<T> (key: string): T | undefined;

  remove (key: string): void;

  clear (): void;
}

class GalleryCache implements ICache {
  private cache: Storage

  constructor (target: Storage) {
    this.cache = target
  }

  set (key: string, value: string): void {
    if (key && value) {
      try {
        this.cache.setItem(key, value)
      } catch (e) {
        console.warn('Exceeding the available storage space')
      }
    }
  }

  setObj<T> (key: string, value: T): void {
    if (key && isValid(value)) {
      try {
        this.cache.setItem(key, JSON.stringify(value))
      } catch (e) {
        console.warn('Exceeding the available storage space')
      }
    }
  }

  get (key: string): string | undefined {
    if (key) {
      return this.cache.getItem(key) || undefined
    }
    return undefined
  }

  getObj<T> (key: string): T | undefined {
    if (key) {
      let value: T | undefined = undefined
      try {
        value = JSON.parse(this.cache.getItem(key) || 'null')
      } catch (e) {
        console.warn('Error JSON.parse()')
      }
      return value === null ? undefined : value
    }
    return undefined
  }

  remove (key: string): void {
    if (key) {
      this.cache.removeItem(key)
    }
  }

  clear (): void {
    this.cache.clear()
  }
}

export const localCache: GalleryCache = new GalleryCache(localStorage)
export const sessionCache: GalleryCache = new GalleryCache(sessionStorage)

// 用户账号
export const LOCAL_USERNAME = 'username'
