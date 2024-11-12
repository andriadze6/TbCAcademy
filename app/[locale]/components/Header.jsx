'use client'
import '../assets/css/Header.css'
import { useRouter } from 'next/navigation';
import {useTranslations, useLocale } from 'next-intl';
import { LanguagePicker } from './Header/languageSwitcher';

import { ThemeProvider } from '../../providers/ThemeProvider';
import instagramIcon from '../assets/img/InstagramIcon.png'
import facebookIcon from '../assets/img/facebookIcon.png';
import twitterIcon from '../assets/img/twitterIcon.png';
import logo from '../assets/img/Logo.png';
import cartIcon from '../assets/img/icon-cart.png';
import Image from "next/image";
import Link from 'next/link';
import Search from './SearchInput';
import UserDropDownList from './UserdropDownManue';
import useTheme from '../../hooks/changeTheme';
import { MdOutlineDarkMode } from "react-icons/md";

function Header(){
    let {theme, changeTheme} = useTheme();
    const router = useRouter();
    const t = useTranslations('HomePage');
    const currentLanguage = useLocale(); // Get current language from next-intl
    debugger
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
            <div className='header2-div'>
                <div className='header2-content'>
                    <Search></Search>
                    <div className='Logo-Div'>
                        <Image className='header-logo-img' src={logo} alt="" />
                    </div>
                    <div className='cart-Div'>
                        <div className='img-container'>
                            <Image className='header-logo-img' src={cartIcon} alt="" />
                            <p id='HeaderCartID'>6</p>
                        </div>
                        <p>Item(s) - <span>50$</span></p>
                    </div>
                </div>
            </div>
            <div className='header3-div'>
                <nav className='header3-content'>
                    <div className='navName-div'>
                        <Link href={`/${currentLanguage}`} className='navName'>{t('Home')}</Link>
                    </div>
                    <div className='navName-div'>
                        <Link href={`/${currentLanguage}/ShopLayout/woman/`} className='navName'>{t('Woman')} <i className="fa fa-angle-down"></i></Link>
                        {/* <div className='drop-down-manu'>
                            <div>
                                <h3 className='category-name'>Clothing</h3>
                                <ul>
                                    <Link href={`/ShopLayout/woman/womens-dresses`}><li>Dresses</li></Link>
                                    <li>Tops</li>
                                    <li>Jeans</li>
                                    <li>View all</li>
                                </ul>
                            </div>
                            <div>
                            <h3 className='category-name'>Shoes</h3>
                                <ul>
                                    <li>Shirt</li>
                                    <li>Tops</li>
                                    <li>Jeans</li>
                                    <li>View all</li>
                                </ul>
                            </div>
                            <div className='category-name'>
                                <h3>Shoes</h3>
                                <ul>
                                    <li>Shirt</li>
                                    <li>Tops</li>
                                    <li>Jeans</li>
                                    <li>View all</li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                    <div className='navName-div'>
                        <Link href='' className='navName'>{t('Man')}<i className="fa fa-angle-down"></i></Link>
                        {/* <div className='drop-down-manu'>
                            <div>
                                <h3 className='category-name'>Clothing1</h3>
                                <ul>
                                    <li>Shirt</li>
                                    <li>Tops</li>
                                    <li>Jeans</li>
                                    <li>View all</li>
                                </ul>
                            </div>
                            <div>
                            <h3 className='category-name'>Shoes2</h3>
                                <ul>
                                    <li>Shirt</li>
                                    <li>Tops</li>
                                    <li>Jeans</li>
                                    <li>View all</li>
                                </ul>
                            </div>
                            <div className='category-name'>
                                <h3>Shoes3</h3>
                                <ul>
                                    <li>Shirt</li>
                                    <li>Tops</li>
                                    <li>Jeans</li>
                                    <li>View all</li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                    <div className='navName-div'>
                        <Link href='' className='navName'>{t('Kids')}<i className="fa fa-angle-down"></i></Link>
                        <div className='drop-down-manu'>
                            <div>
                                <h3 className='category-name'>test</h3>
                                <ul>
                                    <li>Shirt</li>
                                    <li>Tops</li>
                                    <li>Jeans</li>
                                    <li>View all</li>
                                </ul>
                            </div>
                            <div>
                            <h3 className='category-name'>tes2</h3>
                                <ul>
                                    <li>Shirt</li>
                                    <li>Tops</li>
                                    <li>Jeans</li>
                                    <li>View all</li>
                                </ul>
                            </div>
                            <div className='category-name'>
                                <h3>test3</h3>
                                <ul>
                                    <li>Shirt</li>
                                    <li>Tops</li>
                                    <li>Jeans</li>
                                    <li>View all</li>
                                </ul>
                            </div>
                        </div>
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
            </div>
        </header>
        </ThemeProvider>
    )
}
export default Header;
