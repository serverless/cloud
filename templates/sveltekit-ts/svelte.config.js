import withCloud from "@serverless/cloud/svelte";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = withCloud({
  preprocess: [
    preprocess({
      preserve: ["ld+json", "module"],
      typescript: true,
    }),
  ],
  kit: {
    methodOverride: {
      allowed: ["PATCH", "DELETE"],
    },
  },
});

export default config;
