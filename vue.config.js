const themes = require('./themes')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: themes,
          javascriptEnabled: true
        }
      },
      scss: {
        additionalData: `@import "~@/assets/css/common.scss";`
      }
    }
  }
}
