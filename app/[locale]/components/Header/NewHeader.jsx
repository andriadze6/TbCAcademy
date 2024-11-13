'use client'
import '../../assets/css/NewHeader.css'
import { useRouter } from 'next/navigation';
import {useTranslations, useLocale } from 'next-intl';
import { LanguagePicker } from '../Header/languageSwitcher';

import { ThemeProvider } from '@/app/providers/ThemeProvider';
import instagramIcon from '../../assets/img/InstagramIcon.png'
import facebookIcon from '../../assets/img/facebookIcon.png';
import twitterIcon from '../../assets/img/twitterIcon.png';
import logo from '../../assets/img/Logo.png';
import cartIcon from '../../assets/img/icon-cart.png';
import Image from "next/image";
import Link from 'next/link';
import Search from '../SearchInput';
import UserDropDownList from '../UserdropDownManue';
import useTheme from '@/app/hooks/changeTheme';
import { MdOutlineDarkMode } from "react-icons/md";

function Header(){
    let {theme, changeTheme} = useTheme();
    const router = useRouter();
    const t = useTranslations('HomePage');
    const currentLanguage = useLocale(); // Get current language from next-intl
    return(
        <ThemeProvider>
        <header>
            <div className="header1-Div">
                <div className='header1-content'>
                    <LanguagePicker></LanguagePicker>
                    <div className='socialNetwork'>
                        <Image src={facebookIcon} alt="" />
                        <Image src={instagramIcon} alt=''/>
                        <Image src={twitterIcon} alt=''/>
                    </div>
                    <div style={{display:"flex",gap:"10px", alignItems:"center", justifyContent:"end"}}>
                        <div className='Mode-ChangeDiv'>
                            {
                                theme == "dark" ?
                                <svg onClick={changeTheme} className='sun' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                </svg>
                                :
                                <svg onClick={changeTheme} className='moon' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
                                    <path  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                            }
                        </div>
                        <UserDropDownList></UserDropDownList>
                    </div>
                </div>
            </div>
            <div className='header2-wrapper'>
                <div className='header2-Div'>
                        <div className='Header-Logo-Div'>
                            <Image className='logo' src={logo} alt="" />
                        </div>
                        <nav>
                            <div className='navName-div'>
                                <Link href={`/${currentLanguage}`} className='navName'>{t('Home')}</Link>
                            </div>
                            <div className='navName-div'>
                                <Link href={`/${currentLanguage}/ShopLayout/woman/`} className='navName'>{t('Woman')} <i className="fa fa-angle-down"></i></Link>
                            </div>
                            <div className='navName-div'>
                                <Link href='' className='navName'>{t('Man')}<i className="fa fa-angle-down"></i></Link>
                            </div>
                            <div className='navName-div'>
                                <Link href='' className='navName'>{t('Kids')}<i className="fa fa-angle-down"></i></Link>
                            </div>
                            <div className='navName-div'>
                                <Link href='/AboutUs' className='navName'>{t('AboutUs')}</Link>
                            </div>
                            <div className='navName-div'>
                                <Link href='/Contact' className='navName'>{t('Contact')}</Link>
                            </div>
                            <div className='navName-div'>
                                <Link href='/BlogPage' className='navName'>{t('Blog')}</Link>
                            </div>
                        </nav>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <Search></Search>
                            <div className='favorite-Item-Div'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </div>
                            <div className='bag-Item-Div'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </div>
                        </div>
                </div>
            </div>

        </header>
        </ThemeProvider>
    )
}
export default Header;