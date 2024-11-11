import {NextIntlClientProvider} from 'next-intl';
import {getTranslations} from 'next-intl/server';

import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import localFont from "next/font/local";
import "../globals.css";
import Header from "../components/Header";
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
 

export const metadata = {
  title: "Shopping site",
  description: "Generated by create next app",
};


export default async function LocaleLayout({
  children,
  params: {locale}
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const t = await getTranslations('ProfilePage');
  return (
    <html lang={locale}>
      <UserProvider>
      <body>
        <NextIntlClientProvider messages={messages}>
            <Header></Header>
            {children}
        </NextIntlClientProvider>
      </body>
    </UserProvider>
    </html>
  );
}