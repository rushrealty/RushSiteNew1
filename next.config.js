/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/communities',
        destination: '/available-communities',
        permanent: true,
      },
      {
        source: '/communities/:slug',
        destination: '/available-communities/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;