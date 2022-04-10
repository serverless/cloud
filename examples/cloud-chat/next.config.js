import { params } from "@serverless/cloud";
import withCloud from "@serverless/cloud/nextjs";

export default withCloud({
  reactStrictMode: true,
  async rewrites() {
    // in production mode, requests automatically fall through to the cloud api
    if (process.env.NODE_ENV === "production") {
      return [];
    }

    // have the dev server fall back to the cloud api
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `${params.CLOUD_URL}/:path*`,
        },
      ],
    };
  },
});
