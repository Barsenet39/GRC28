/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // ✅ Fix: Changed from true to object
  },
  allowedDevOrigins: [
    'http://localhost:3000',
    
  ],
 
};

export default nextConfig;
