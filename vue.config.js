module.exports = {
  transpileDependencies: true,

  devServer: {
    open: true,
    port: 8801, // 自定义修改8080端口
    // 代理跨域
    proxy: {
      "/proxy1/adm/": {
        target: "http://192.168.0.xx:xxxx/",
        changeOrigin: true,
      },
    },
  },
};
