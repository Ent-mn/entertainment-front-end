/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/api_open",
        destination: "http://202.179.6.27:7000/api_open",
      },
      {
        source: "/api",
        destination: "http://202.179.6.27:7000/api",
      },
    ];
  },
};

module.exports = nextConfig;
