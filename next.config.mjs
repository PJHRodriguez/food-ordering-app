/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pablo08-next-ecommerce.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
