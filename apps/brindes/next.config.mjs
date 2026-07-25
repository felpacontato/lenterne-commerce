/** @type {import('next').NextConfig} */
const restoreTargets = {
  prj_Yg2KWWjdXgAiizZpsnBNaeaBWGLb: "https://lenterne-v1-brindes-lj2bnyovb-felpa-dev-studio.vercel.app",
  prj_WnuPux6w0SRKtrkr6iHQ9uDdBMfR: "https://lenterne-v3-brindes-dwt68w2xy-felpa-dev-studio.vercel.app",
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
