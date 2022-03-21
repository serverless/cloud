const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (config) {
  config.setBrowserSyncConfig({
    middleware: [
      {
        route: "/api",
        handle: createProxyMiddleware({
          target: "http://localhost:" + process.env.CLOUD_PORT,
        }),
      },
    ],
  });

  // Pass-through css and images
  config.addPassthroughCopy("./_site/css");
  config.addPassthroughCopy("./_site/images");

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "_site",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
      output: "./static",
    },
  };
};
