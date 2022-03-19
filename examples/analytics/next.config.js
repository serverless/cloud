import { params } from "@serverless/cloud";
import withCloud from "@serverless/cloud/nextjs";

export default withCloud({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/tracking/:path*",
        destination: `${params.CLOUD_URL}/tracking/:path*`,
      },
    ];
  },
});
