import request from '@/common/request'

// 登录
export function login (data: Api.User.Login): Promise<Api.Res<Api.User.LoginData>> {
  return new Promise<Api.Res<Api.User.LoginData>>((resolve, reject) => {
    request.post<Api.Res<Api.User.LoginData>>('/api/login', data)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 用户信息
export function queryUserInfo (): Promise<Api.Res<Api.User.GetUserInfoData>> {
  return new Promise<Api.Res<Api.User.GetUserInfoData>>((resolve, reject) => {
    request.get<Api.Res<Api.User.GetUserInfoData>>('/api/getUserInfo')
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
