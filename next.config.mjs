/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/cybersec-blog",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  trailingSlash: true,
};

export default nextConfig;
