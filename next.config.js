/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.medpharmconsult.org",
        port: "",
        pathname: "/multimedia/**",
      },
    ],
  },
};

module.exports = nextConfig;
