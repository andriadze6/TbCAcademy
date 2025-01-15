/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
    images: {
        domains: ['cdn.dummyjson.com', "http://www.w3.org/2000/svg", 'coma-demo.myshopify.com','wvxbnexypjgxmyxiuiaw.supabase.co'], // Add the external domain here
      },
};

export default withNextIntl(nextConfig);
