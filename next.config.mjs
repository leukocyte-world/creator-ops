/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'creator-ops.vercel.app',
          },
        ],
        destination: 'https://creatorops.site/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
