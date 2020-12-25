## VUE3.0+TypeScript的后台管理系统基础架构

<img src="https://bio-assay-uploads-1258944054.cos.ap-guangzhou.myqcloud.com/one-piece.png" style="width: 50%;">

### 环境依赖
```
node v12.19.0+
vue/cli v4.5.0+
redIs ~
```

### 部署步骤

#### 1. 添加系统环境变量
```
NODE_ENV="production"
```

#### 2. 安装node运行环境
```
npm install
```

#### 3. 开启服务
```
npm run serve
```

#### 4. 前端编译
```
npm run build
```

### 目录结构描述
```
├── node_modules                // 依赖包
├── public                      // 公共文件
├── src                         // 源代码
│   ├── api                       // 请求api
│   ├── assets                    // 公共资源
│   ├── common                    // 公共方法
│   ├── components                // 组件
│   │   ├─ base-loading               // loading组件
│   │   └─ main                       // 布局文件
│   ├── config                    // 配置
│   ├── mock                      // mock数据
│   ├── plugin                    // 插件
│   ├── routes                    // 路由
│   ├── store                     // 公共数据管理
│   ├── util                      // 工具库
│   ├── views                     // 视图
│   ├── App.tsx                   // App
│   ├── main.ts                   // main
│   ├── router.ts                 // router
│   ├── shims-vue.d.ts            // ts声明文件
│   └── README.md                 // help 规范 
├── .env.alpha                  // 测试环境
├── .env.development            // 开发环境
├── .eslintrc.js                // eslint
├── package.json                // package
└── README.md                   // help
```
