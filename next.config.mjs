/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
    images: {
        domains: ['cdn.dummyjson.com'], // Add the external domain here
      },
};

export default withNextIntl(nextConfig);
