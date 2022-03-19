const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:" + process.env.CLOUD_PORT,
      },
    },
  },
  outputDir: "./static",
});
