'use client'
import '../assets/css/Header.css'
import {useTranslations} from 'next-intl';
// import  {useTheme}  from '../hooks/useTheme';
import {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../providers/ThemeProvider'
import { ThemeProvider } from '../providers/ThemeProvider';
import instagramIcon from '../assets/img/InstagramIcon.png'
import facebookIcon from '../assets/img/facebookIcon.png';
import twitterIcon from '../assets/img/twitterIcon.png';
import logo from '../assets/img/Logo.png';
import cartIcon from '../assets/img/icon-cart.png';
import Image from "next/image";
import Link from 'next/link';
import Search from './SearchInput';
import UserDropDownList from './UserdropDownManue';
import { useSearchParams } from 'next/navigation';
import useTheme from '../hooks/changeTheme';
function Header(){
    let {theme, changeTheme} = useTheme();
    const t = useTranslations('HomePage');
    let test =  t("Home")
    debugger
    console.log(test)
    return(
        <ThemeProvider>
        <header>
            <div className="header1-Div">
                <div className='header1-content'>
                    <div className='language'>
                        <div>
                            <Link href=''>ქართული</Link>
                        </div>
                        <div className='lang-divider'></div>
                        <div>
                            <Link href=''>English</Link>
                        </div>
                    </div>
                    <div className='socialNetwork'>
                        <Image src={facebookIcon} alt="" />
                        <Image src={instagramIcon} alt=''/>
                        <Image src={twitterIcon} alt=''/>
                    </div>
                    <div style={{display:"flex",gap:"10px", alignItems:"center", justifyContent:"end"}}>
                        <div>
                            <p onClick={changeTheme} style={{cursor:'pointer'}}>Change theme</p>
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
                        <Link href="/" className='navName'>{t('Home')}</Link>
                    </div>
                    <div className='navName-div'>
                        <Link href='/ShopLayout/woman/' className='navName'>{t('Woman')} <i className="fa fa-angle-down"></i></Link>
                        <div className='drop-down-manu'>
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
                        </div>
                    </div>
                    <div className='navName-div'>
                        <Link href='' className='navName'>{t('Man')}<i className="fa fa-angle-down"></i></Link>
                        <div className='drop-down-manu'>
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
                        </div>
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
