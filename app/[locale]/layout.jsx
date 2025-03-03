import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { AuthProvider } from '../providers/UserSessionProvider';
import "../globals.css";
import Header from './components/Header/NewHeader';
import Footer from './components/Footer/footer'

export const metadata = {
  title: "Shopping site",
  description: "Generated by create next app",
};

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body style={{display:"grid", gridTemplateRows:"auto 1fr auto", height:"100vh", margin:"0"}}>
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
              <Header />
                {children}
              <div id="popup-root"></div>
              <Footer/>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
