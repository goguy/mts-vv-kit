const path = require('path');

module.exports = {
  configureWebpack: {
    devtool:'source-map',
    //entry: ["babel-polyfill", "./src/main.js"]
  },
  transpileDependencies: [
    'vuetify'
  ],
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/mts-vv-kit/'
    : '/',
  devServer: {
    historyApiFallback: true,
    //contentBase: path.join(__dirname, '') // 설정하면 url(/src/assets") 경로 사용 가능 
  }
}
