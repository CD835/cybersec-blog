import createMDX from "@mdx-js/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  trailingSlash: true,
};

export default nextConfig;
