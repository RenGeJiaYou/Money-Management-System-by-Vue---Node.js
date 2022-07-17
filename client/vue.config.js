const { defineConfig } = require("@vue/cli-service");

//defineConfig 是vue-cli v5 提供的"帮手函数" ,写法和普通一样,但是有更好的代码提示
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "dist", // 构建输出目录
  assetsDir: "asset",
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    //↑是前端项目地址

    //↓是后端项目地址
    proxy: {
      // 配置跨域
      "/api": {
        target: "http://localhost:3000/api/", //"/api" 将在发送请求时 替换为 target 值
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/api": "", //请求的时候使用这个api就可以
        },
      },
    },
  },
});
