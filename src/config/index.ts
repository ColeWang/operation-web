interface EnvObj {
  [key: string]: {
    baseURL: string;
  }
}

// 默认首页
export const homeName = 'home'

// token过期时间 默认一天
export const cookieExpires = 1

// 环境变量
const evn: EnvObj = {
  'development': {
    baseURL: '',
  },
  'alpha': {
    baseURL: '',
  },
  'production': {
    baseURL: '',
  }
}

const NODE_ENV: string = process.env.NODE_ENV

export function baseURL (): string {
  return evn[NODE_ENV].baseURL
}
