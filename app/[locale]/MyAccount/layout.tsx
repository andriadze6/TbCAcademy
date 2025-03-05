'use client'
import LocaleLayout from "../layout"; // Import parent layout
import Link from "next/link";
import "../../globals.css";
import "./css/layout.css";
import { supabase } from "../../../utils/supabase/client";
import {useTranslations, useLocale } from 'next-intl';

export default function MyAccountLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = useTranslations('MyAccount');
  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
}
  return (
      <div className="myAccount-wrapper">
        <h1>{t("MyAccount")}</h1>
        <main>
          <header className="header-MyAccount">
            <nav className="nav-MyAccount">
                <Link href={`/${locale}/MyAccount`} className='navName_MyAccount'>{t("DeliveryAddress")}</Link>
                <Link href={`/${locale}/MyAccount`} className='navName_MyAccount'>{t("Orders")}</Link>
                <Link href={`/${locale}/ShoppingCart`} className='navName_MyAccount'>{t("ShoppingCart")}</Link>
                <Link href={`/${locale}/WishList`} className='navName_MyAccount'>{t("WishList")}</Link>
                <p onClick={()=>{handleLogout()}} className="navName_MyAccount">{t("LogOut")}</p>
            </nav>
          </header>
          <div className="myAccount-Page">
            {children}
          </div>
        </main>
      </div>
  );
}
