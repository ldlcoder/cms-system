const path = require('path')
const apiMock = require('./apiMock/apiMock')

const branch = require('git-branch')
// 获取当前git分支版本号，如果是日常版本则截取版本号
const branchName = branch.sync()
const version = branchName.indexOf('daily-') === 0 ? branchName.split('-')[1] : ''

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config
      .plugin('define')
      .tap(args => {
        Object.assign(args[0], { 'APP_VERSION': `'${version}'` })
        return args
      })
  },
  pluginOptions: {
    'style-resources-loader': {
      patterns: [path.resolve(__dirname, 'src/public/styles/mixin.scss'), path.resolve(__dirname, 'src/public/styles/variables.scss')],
      preProcessor: 'scss'
    }
  },
  devServer: {
    before: apiMock(path.join(__dirname, 'apiMock/'))
  }
}
