/** @type {import('next').NextConfig} */
const nextConfig = {
  // MicroCMSのコンテンツが更新された場合にキャッシュを再検証
  experimental: {
    // ISRのようなキャッシュ再検証機能を有効化
  },
  images: {
    domains: ['images.microcms-assets.io'],
  },
};

module.exports = nextConfig; 