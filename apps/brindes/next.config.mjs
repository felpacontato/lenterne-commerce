/** @type {import('next').NextConfig} */
const config = { transpilePackages: ["@lenterne/storefront", "@lenterne/catalog", "@lenterne/ui"], images: { remotePatterns: [{ protocol: "https", hostname: "static.wixstatic.com" }] } };
export default config;
