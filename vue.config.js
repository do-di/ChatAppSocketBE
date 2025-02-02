const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      'dodi.local', // add your custom domain here
    ],
  },
})
