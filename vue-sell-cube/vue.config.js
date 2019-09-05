const appData = require('./data.json')
const path = require('path')
const seller = appData.seller
// const goods = appData.goods
const ratings = appData.ratings
const buyerinfo = appData.buyerinfo
// const list = appData.list
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    proxy: {
      '/sellapi': {
        target: 'https://www.qiuki.top/sell/buyer/',
        changeOrigin: true,
        pathRewrite: {
          '^/sellapi': ''
        }
      }
    },
    before(app) {
      app.get('/api/seller', function (req, res) {
        const id = req.query.id
        res.json({
          errno: 1,
          data: Object.assign({}, seller, { id })
        })
      })
      // app.get('/api/goods', function (req, res) {
      //   res.json({
      //     errno: 0,
      //     data: goods
      //   })
      // })
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 1,
          data: ratings
        })
      })
      app.get('/api/buyerinfo', function (req, res) {
        res.json({
          errno: 1,
          data: buyerinfo
        })
      })
      // app.get('/api/list', function (req, res) {
      //   res.json({
      //     errno: 0,
      //     data: list
      //   })
      // })
    }
  },
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  },
  // 拼接js css文件的前缀
  publicPath: './'
}
