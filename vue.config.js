const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  assetsDir: '',
  css: {
    loaderOptions: {
      sass: {
        /**
         * 把prependData里面的资源全部分别加入到每个css文件里面
         * 适合放scss的变量/函数/混合等不会生成css，从而避免在每个用的的地方@import引入
         * 不适合放基础样式/全局样式，因为这样会在生成的每个css中都有基础或全局的样式
         */
        prependData: `
          @import "@styles/common.scss";
        `,
      },
    },
  },
  devServer: {
    hot: true,
    liveReload: true,
    port: 1300,
  },
  chainWebpack: config => {
    // 引入路劲的别名
    config.resolve.alias
      .set('@components', resolve('src/components'))
      .set('@assets', resolve('src/assets'))
      .set('@styles', resolve('src/styles'))
      .set('@utils', resolve('src/utils'))
    // html标题
    config.plugin('html').tap(args => {
      args[0].title = '冰封商城后台管理'
      return args
    })
  },
}
