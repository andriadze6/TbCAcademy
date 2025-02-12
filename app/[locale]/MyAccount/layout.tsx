import LocaleLayout from "../layout"; // Import parent layout
import Link from "next/link";
import "../../globals.css";
import "./css/layout.css";
import {useTranslations, useLocale } from 'next-intl';

export default function MyAccountLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = useTranslations('LoginCreateAccount');

  return (
      <div className="myAccount-wrapper">
        <h1>Your Account</h1>
        <main>
          <header className="header-MyAccount">
            <nav className="nav-MyAccount">
                <Link href={`/${locale}/MyAccount`} className='navName'>{t("Address")}</Link>
                <Link href={`/${locale}/CheckOut`} className='navName'>Check out</Link>
                <Link href={`/${locale}/ShoppingCart`} className='navName'>Shopping cart</Link>
                <Link href={`/${locale}/WishList`} className='navName'>Wish list</Link>
            </nav>
          </header>
          <div className="myAccount-Page">
            {children}
          </div>
        </main>
      </div>
  );
}
