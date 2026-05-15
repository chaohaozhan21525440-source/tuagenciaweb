import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: { mdxRs: false },
  images: { remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }] },
};

export default withNextIntl(nextConfig);
