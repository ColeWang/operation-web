import Mock from 'mockjs'

//延时200-600毫秒请求到数据
Mock.setup({
  timeout: '500-1000'
})

// login
Mock.mock('/api/login', 'post', () => {
  return {
    actionResult: '1',
    data: {
      token: '123456'
    },
    message: ''
  }
})

// getUserInfo
Mock.mock('/api/getUserInfo', 'get', () => {
  return {
    actionResult: '1',
    data: {
      name: 'cole.wang'
    },
    message: ''
  }
})
