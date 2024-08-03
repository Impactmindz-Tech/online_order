import i18nConfig from './next-i18next.config.mjs';

const nextConfig = {
  reactStrictMode: true,
  i18n: i18nConfig.i18n,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

export default nextConfig;
