/** @type {import('next').NextConfig} */
const restoreTargets = {
  prj_S2TL5Uzp9vFNR2VhdimJEI9VWc08: "https://lenterne-v1-ferragens-an0dc31hy-felpa-dev-studio.vercel.app",
  prj_K8ElitHNEAnkVPaN9yK8MNZ0i4q6: "https://lenterne-v3-ferragens-8kao5m00b-felpa-dev-studio.vercel.app",
};

const restoreTarget = restoreTargets[process.env.VERCEL_PROJECT_ID];

const config = {
  transpilePackages: ["@lenterne/storefront", "@lenterne/catalog", "@lenterne/ui"],
  images: { remotePatterns: [{ protocol: "https", hostname: "static.wixstatic.com" }] },
  async rewrites() {
    if (!restoreTarget) return [];
    return {
      beforeFiles: [
        {
          source: "/:path*",
          destination: `${restoreTarget}/:path*`,
        },
      ],
    };
  },
};

export default config;
