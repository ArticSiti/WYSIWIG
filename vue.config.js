const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "",
  filenameHashing: process.env.NODE_ENV !== "production",
  configureWebpack: {
    output: {
      filename: "wysiwig.js",
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
  },
  productionSourceMap: false,
  
})
