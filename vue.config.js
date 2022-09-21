const { defineConfig } = require('@vue/cli-service')
const process = require('process')

process.env.VUE_APP_VERSION = require('./package.json').version

process.env.VUE_APP_COMMIT_HASH = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString()

process.env.VUE_APP_BUILD_DATE = new Date().toISOString()

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  publicPath:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_PUBLIC_PATH || '/chart-studio/'
      : '/',
})
