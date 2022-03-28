"use strict";
// const path = require("path");

console.log("当前环境===>", process.env.NODE_ENV);
module.exports = {
  /**
   * 如果您计划在子路径下部署网站，则需要设置PublicPath，
   * 例如github页面。如果您计划将您的网站部署到https://foo.github.io/bar/，
   * 然后puistpath应该设置为“/ bar /”。
   * 在大多数情况下请使用'/'!!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  runtimeCompiler: true,
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    // port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/dev-api": {
        //target: `http://192.168.3.3:8901`, // lyy使用s代理地址进行访问
        // target: `http://39.106.15.162:8081/xmwebapi`, // lyy使用代理地址进行访问
        target: `http://weixin.tjl.tj.cn/`, // 使用代理地址进行访问
        changeOrigin: true,
        pathRewrite: {
          "^/dev-api": "",
        },
      },
    },
    // disableHostCheck:true,
    // before: require("./mock/mock-server.js"),
  },
};
