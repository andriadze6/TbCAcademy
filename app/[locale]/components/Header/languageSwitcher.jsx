"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import '../../assets/css/Header.css'


export const LanguagePicker = () => {
  const locale = useLocale();
  const router = useRouter();

  function handleLocaleChange(newLocale) {
    debugger
    // document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    // Redirect to the same page with the new locale
    const currentPath = window.location.pathname;
    router.push(`/${newLocale}`);
  }

  return (
      <div className='language'>
          <div>
              <button onClick={() => handleLocaleChange('ka')}>ქართული</button>
          </div>
          <div className='lang-divider'></div>
          <div>
              <button onClick={() => handleLocaleChange('en')}>English</button>
          </div>
      </div>
  );
};