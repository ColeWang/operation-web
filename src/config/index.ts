// 默认首页
export const homeName = 'home'

// token过期时间 默认一天
export const cookieExpires = 1

interface EnvObj {
  [key: string]: {
    baseURL: string;
  }
}

enum EnvKey {
  DEVELOPMENT = 'development',
  ALPHA = 'alpha',
  TSB = 'tsb',
  UAT = 'uat',
  ETS = 'ets',
  PRE = 'pre',
  PRODUCTION = 'production'
}

// 环境变量
const evn: EnvObj = {
  [EnvKey.DEVELOPMENT]: {
    baseURL: '',
  },
  [EnvKey.ALPHA]: {
    baseURL: '',
  },
  [EnvKey.TSB]: {
    baseURL: '',
  },
  [EnvKey.UAT]: {
    baseURL: '',
  },
  [EnvKey.ETS]: {
    baseURL: '',
  },
  [EnvKey.PRE]: {
    baseURL: '',
  },
  [EnvKey.PRODUCTION]: {
    baseURL: '',
  }
}

const NODE_ENV: EnvKey = process.env.NODE_ENV

export function baseURL (): string {
  return evn[NODE_ENV].baseURL
}
