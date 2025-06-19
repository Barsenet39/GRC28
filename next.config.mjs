/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // your existing config
  },
  allowedDevOrigins: ['http://localhost:3000'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy all API calls
      },
    ];
  },
};

export default nextConfig;
