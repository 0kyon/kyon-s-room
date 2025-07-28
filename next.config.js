/** @type {import('next').NextConfig} */
const nextConfig = {
  // MicroCMSのコンテンツが更新された場合にキャッシュを再検証
  experimental: {
    // ISRのようなキャッシュ再検証機能を有効化
  },
  images: {
    domains: ['images.microcms-assets.io', 'files.stripe.com', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'stripe.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig; 