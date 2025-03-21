/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 确保资源路径正确
  basePath: '',
  reactStrictMode: true,
  images: {
    // 禁用图像优化功能，因为它需要Node.js服务器
    unoptimized: true,
  },
};

module.exports = nextConfig;
