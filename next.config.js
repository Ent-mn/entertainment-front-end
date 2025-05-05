/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/api_open",
        destination: "http://202.179.6.27:7000/api_open",
      },
      {
        source: "/api/api",
        destination: "http://202.179.6.27:7000/api",
      },
    ];
  },
  images: {

  },
};

module.exports = nextConfig;
