"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname  } from "next/navigation";
import React from "react";
import '../../assets/css/Header.css'


export const LanguagePicker = () => {
  const locale = useLocale();
  const router = useRouter();
  const currentPath = usePathname();
  function handleLocaleChange(newLocale) {
    if (newLocale === locale) return; // Prevent unnecessary navigation

    // Ensure the path updates correctly, even for root `/en`
    const newPath = currentPath === `/${locale}`
      ? `/${newLocale}`
      : currentPath.replace(`/${locale}/`, `/${newLocale}/`).replace(`/${locale}`, `/${newLocale}`);

    router.push(newPath);
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