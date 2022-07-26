import { sveltekit } from "@sveltejs/kit/vite";
import withCloud from "@serverless/cloud/vite";

/** @type {import('vite').UserConfig} */
const config = withCloud({
  plugins: [sveltekit()],
  server: {
    proxy: {
      "/api": `http://localhost:${process.env.CLOUD_PORT}`,
    },
  },
});

export default config;
