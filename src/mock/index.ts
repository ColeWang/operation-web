import Mock from 'mockjs'

//延时500-1000毫秒请求到数据
Mock.setup({
  timeout: '500-1000'
})

function createReturnedData<T> (data: T): Api.Res<T> {
  return {
    actionResult: '1',
    data: data,
    message: ''
  }
}

// login
Mock.mock('/api/login', 'post', () => {
  const data: Api.User.LoginData = {
    token: '123456'
  }
  return createReturnedData(data)
})

// getUserInfo
Mock.mock('/api/getUserInfo', 'get', () => {
  const data: Api.User.GetUserInfoData = {
    name: 'cole.wang'
  }
  return createReturnedData(data)
})
