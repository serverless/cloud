import withCloud from "@serverless/cloud/svelte";

export default withCloud({
  kit: {
    methodOverride: {
      allowed: ["PATCH", "DELETE"],
    },
  },
});
