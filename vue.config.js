const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'api': resolve('src/api'),
        'assets': resolve('src/assets'),
        'base': resolve('src/base'),
        'components': resolve('src/components'),
        'pages': resolve('src/pages'),
        'utils': resolve('src/utils'),
        'router': resolve('src/router')
      }
    }
  },
  productionSourceMap: false,
  devServer: {
    port: 3400,
    proxy: {
      '/api': {
        target: 'http://36.111.148.143:9101',
        pathRewrite: {
          '/api': ''
        }
      },
      // '/mock': {
      //   target: 'http://localhost:4300',
      //   pathRewrite: {
      //     '/mock': ''
      //   }
      // }
    }
  },
  lintOnSave: true
}