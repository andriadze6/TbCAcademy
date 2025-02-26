
"use client"
import './style/WishListStyle.css'
import Tooltip from '../components/Tooltip'
import { useAuth } from '../../providers/UserSessionProvider';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import {useTranslations, useLocale } from 'next-intl';


export default function WishListPage() {
    const [tooltip, setTooltip] = useState(null);
    const[data, setData] = useState([]);
    const {  wishList, cart,AddToCart,DeleteItemFromWishList, DeleteItemFromCart } = useAuth();
    const currentLanguage = useLocale();
    const [gridView, setView] = useState(true);
    const [showElements, setShowElements] = useState(false);
    const [message, setMessage] = useState(null);
    const t = useTranslations('LoginCreateAccount');
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/GetItems',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify( wishList ),
                });
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        if(wishList.length > 0){
            fetchData();
        }else{
            setData([]);
        }
    }, [wishList]);
    useEffect(() => {
        setShowElements(false); // Reset animation on view change
        setTimeout(() => setShowElements(true), 400);
    }, [gridView]); // Run when view changes

    const showTooltip = (event, text) => {
        const rect = event.target.getBoundingClientRect();
        setTooltip({
          text,
          position: {
            top: rect.top + window.scrollY - 30,
            left: rect.left + window.scrollX + rect.width / 2,
          },
        });
    };
    const hideTooltip = () => {
    setTooltip(null);
    };

    function AddCart(productID, colorID, productStockID, amount){
        let checkItemExist = cart.find((item) => item.product_ID === productID && item.color_ID === colorID && item.productStockID === productStockID);
        if(!checkItemExist){
            AddToCart(productID, colorID, productStockID, amount);
            setMessage("Item added to cart");
        }else{
            DeleteItemFromCart(checkItemExist.id, productStockID);
            setMessage("Item Deleted from cart");
        }
        setTimeout(() => {
            setMessage(null);
        }, 2000);
    }

    return (
        <div>
            <div className="WishList-Page">
                <div style={{margin:"30px auto", width:"50%", textAlign:"center", position:"relative"}}>
                    <h1 style={{borderBottom:"1px solid #ccc", paddingBottom:"10px"}}>Wish List</h1>
                    <div className={`message ${message ? "showMessage" : ""}`}>
                        <p>{message}</p>
                    </div>
                </div>
                <div className='toolbar' style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
                    <div style={{display:"flex", gap:"16px", alignItems:"center"}}>
                        <div onClick={() => setView(true)}>
                            <svg
                            style={{cursor:"pointer"}}
                            onMouseEnter={(e) => showTooltip(e, "Grid View")}
                            onMouseLeave={hideTooltip} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M8.13731 1.27499H3.3748C2.0998 1.27499 1.0498 2.32499 1.0498 3.59999V8.36249C1.0498 9.63749 2.0998 10.6875 3.3748 10.6875H8.13731C9.4123 10.6875 10.4623 9.63749 10.4623 8.36249V3.63749C10.4998 2.32499 9.44981 1.27499 8.13731 1.27499ZM8.8123 8.39999C8.8123 8.77499 8.51231 9.07499 8.13731 9.07499H3.3748C2.9998 9.07499 2.6998 8.77499 2.6998 8.39999V3.63749C2.6998 3.26249 2.9998 2.96249 3.3748 2.96249H8.13731C8.51231 2.96249 8.8123 3.26249 8.8123 3.63749V8.39999Z" fill="#A3AEB9"></path>
                                <path d="M20.6246 1.27499H15.8621C14.5871 1.27499 13.5371 2.32499 13.5371 3.59999V8.36249C13.5371 9.63749 14.5871 10.6875 15.8621 10.6875H20.6246C21.8996 10.6875 22.9496 9.63749 22.9496 8.36249V3.63749C22.9496 2.32499 21.8996 1.27499 20.6246 1.27499ZM21.2996 8.39999C21.2996 8.77499 20.9996 9.07499 20.6246 9.07499H15.8621C15.4871 9.07499 15.1871 8.77499 15.1871 8.39999V3.63749C15.1871 3.26249 15.4871 2.96249 15.8621 2.96249H20.6246C20.9996 2.96249 21.2996 3.26249 21.2996 3.63749V8.39999Z" fill="#A3AEB9"></path>
                                <path d="M8.13731 13.2375H3.3748C2.0998 13.2375 1.0498 14.2875 1.0498 15.5625V20.325C1.0498 21.6 2.0998 22.65 3.3748 22.65H8.13731C9.4123 22.65 10.4623 21.6 10.4623 20.325V15.6C10.4998 14.2875 9.44981 13.2375 8.13731 13.2375ZM8.8123 20.3625C8.8123 20.7375 8.51231 21.0375 8.13731 21.0375H3.3748C2.9998 21.0375 2.6998 20.7375 2.6998 20.3625V15.6C2.6998 15.225 2.9998 14.925 3.3748 14.925H8.13731C8.51231 14.925 8.8123 15.225 8.8123 15.6V20.3625Z" fill="#A3AEB9"></path>
                                <path d="M20.6246 13.2375H15.8621C14.5871 13.2375 13.5371 14.2875 13.5371 15.5625V20.325C13.5371 21.6 14.5871 22.65 15.8621 22.65H20.6246C21.8996 22.65 22.9496 21.6 22.9496 20.325V15.6C22.9496 14.2875 21.8996 13.2375 20.6246 13.2375ZM21.2996 20.3625C21.2996 20.7375 20.9996 21.0375 20.6246 21.0375H15.8621C15.4871 21.0375 15.1871 20.7375 15.1871 20.3625V15.6C15.1871 15.225 15.4871 14.925 15.8621 14.925H20.6246C20.9996 14.925 21.2996 15.225 21.2996 15.6V20.3625Z" fill="#A3AEB9"></path>
                            </svg>
                        </div>
                        <div onClick={() => setView(false)}>
                            <svg
                            style={{cursor:"pointer"}}
                            onMouseEnter={(e) => showTooltip(e, "List View")}
                            onMouseLeave={hideTooltip}
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M6.0373 5.43749H22.7248C23.1748 5.43749 23.5873 5.06249 23.5873 4.57499C23.5873 4.08749 23.2123 3.71249 22.7248 3.71249H6.0373C5.5873 3.71249 5.1748 4.08749 5.1748 4.57499C5.1748 5.06249 5.5498 5.43749 6.0373 5.43749Z" fill="#A3AEB9"></path>
                                <path d="M22.6873 11.175H6.0373C5.5873 11.175 5.1748 11.55 5.1748 12.0375C5.1748 12.4875 5.5498 12.9 6.0373 12.9H22.7248C23.1748 12.9 23.5873 12.525 23.5873 12.0375C23.5498 11.55 23.1748 11.175 22.6873 11.175Z" fill="#A3AEB9"></path>
                                <path d="M22.6873 18.5625H6.0373C5.5873 18.5625 5.1748 18.9375 5.1748 19.425C5.1748 19.9125 5.5498 20.2875 6.0373 20.2875H22.7248C23.1748 20.2875 23.5873 19.9125 23.5873 19.425C23.5873 18.9375 23.1748 18.5625 22.6873 18.5625Z" fill="#A3AEB9"></path>
                                <path d="M2.325 5.5875C2.88419 5.5875 3.3375 5.13419 3.3375 4.575C3.3375 4.01581 2.88419 3.5625 2.325 3.5625C1.76581 3.5625 1.3125 4.01581 1.3125 4.575C1.3125 5.13419 1.76581 5.5875 2.325 5.5875Z" fill="#A3AEB9"></path>
                                <path d="M2.325 13.0125C2.88419 13.0125 3.3375 12.5592 3.3375 12C3.3375 11.4408 2.88419 10.9875 2.325 10.9875C1.76581 10.9875 1.3125 11.4408 1.3125 12C1.3125 12.5592 1.76581 13.0125 2.325 13.0125Z" fill="#A3AEB9"></path>
                                <path d="M2.325 20.4375C2.88419 20.4375 3.3375 19.9842 3.3375 19.425C3.3375 18.8658 2.88419 18.4125 2.325 18.4125C1.76581 18.4125 1.3125 18.8658 1.3125 19.425C1.3125 19.9842 1.76581 20.4375 2.325 20.4375Z" fill="#A3AEB9"></path>
                            </svg>
                        </div>

                    </div>
                    {tooltip && <Tooltip text={tooltip.text} position={tooltip.position} />}
                </div>
            </div>
            <div className="WishList-Page">
                {
                    gridView ?
                    <div className={`animation-grid ${showElements ? "showGrid" : ""}`} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr", gap:"20px", width:"80%", margin:"0 auto"}}>
                        {
                            data.length > 0 &&
                            data.map((item, index) =>{
                                return(
                                    <div className="product-card-grid" key={item.productStock.productStockID + "grid"}>
                                        <Link  href={`/ProductPage/${item.product.product_id}/${item.images.productColorID}`} >
                                            {
                                                item?.images &&
                                                <>
                                                    <Image style={{borderRadius:"10px",border:"1px solid #ccc", overflow:"hidden"}} className={`Image animation-grid ${showElements ? "showGrid" : ""}`} alt="" height={500} width={500} src={item.images.isPrimary}/>
                                                </>
                                            }
                                        </Link>
                                        <div style={{padding:"10px"}}>
                                            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                    <p className={`animation-grid ${showElements ? "showGrid" : ""}`} style={{padding:"10px"}}>
                                                        ₾{item.productStock.price_lari}
                                                    </p>
                                                </div>
                                                {
                                                    item.productStock.size &&
                                                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                        <p className={`animation-grid ${showElements ? "showGrid" : ""}`} style={{padding:"10px"}}>
                                                            Size:{item.productStock.size}
                                                        </p>
                                                    </div>
                                                }
                                                <div className={`animation-grid ${showElements ? "showGrid" : ""}`}
                                                    onClick={() => DeleteItemFromWishList(item.id,item.productStock.productStockID)}>
                                                    <svg
                                                        style={{cursor:"pointer"}}
                                                        onMouseEnter={(e) => showTooltip(e, "Delete")}
                                                        onMouseLeave={hideTooltip}
                                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div style={{
                                                width:"100%",  
                                                margin:"0 auto",
                                                }}>
                                                <button
                                                className="addToCart-Button"
                                                style={{
                                                    background:`${
                                                    cart.find((cartItem) => cartItem.productStockID === item.productStock.productStockID) ?
                                                    "radial-gradient(circle, rgba(230,139,0,1) 9%, rgba(230,123,0,1) 50%, rgba(230,92,0,1) 100%)":
                                                    "radial-gradient(circle, rgba(76,129,144,1) 28%, rgba(40,24,52,0.9360119047619048) 100%)"}`
                                                }}
                                                    onClick={() => AddCart(item.product.product_id, item.images.productColorID, item.productStock.productStockID, item.amount)} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                                                        <path strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <div className={`animation-line ${showElements ? "showLine" : ""}`} style={{display:"grid",gridTemplateColumns:"1fr", gap:"20px", width:"80%", margin:"0 auto"}}>
                        {
                            data.length > 0 &&
                            data.map((item, index) =>{
                                return(
                                    <div className='product-card-line' key={item.productStock.productStockID + "line"}>
                                        <Link  href={`/ProductPage/${item.product.product_ID}/${item.images.productColorID}`} >
                                                {
                                                    item?.images &&
                                                    <>
                                                        <Image style={{borderRadius:"10px",border:"1px solid #ccc", overflow:"hidden"}} className={`animation-line Image ${showElements ? "showLine" : ""}`} alt="" height={500} width={500} src={item.images.isPrimary}/>
                                                    </>
                                                }
                                        </Link>
                                        <div style={{padding:"10px", width:"86%", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                            <h3 className={`animation-line ${showElements ? "showLine" : ""}`} style={{padding:"10px 0px"}}>{currentLanguage === "en" ? item.product.title_en : item.product.title_ge}</h3>
                                            <p  className={`animation-line ${showElements ? "showLine" : ""}`}>{currentLanguage === "en" ? item.product.description_en : item.product.description_ge}</p>
                                            <div style={{ padding:"10px 0px"}}>
                                                {
                                                    item.productStock &&
                                                    <p className={`animation-line ${showElements ? "showLine" : ""}`}>
                                                        ₾{item.productStock.price_lari}
                                                    </p>
                                                }

                                            </div>
                                            <div style={{ padding:"10px 0px"}}>
                                            {
                                                item.productStock.size &&
                                                <p className={`animation-grid ${showElements ? "showGrid" : ""}`}>
                                                    Size:{item.productStock.size}
                                                </p>
                                            }
                                            </div>
                                            <div className={`animation-line ${showElements ? "showLine" : ""}`} style={{display:"flex", gap:"10px", alignItems:"center", padding:"30px 0px"}}>
                                                <div>
                                                    <button 
                                                    style={{
                                                        background:`${
                                                        cart.find((cartItem) => cartItem.productStockID === item.productStock.productStockID) ?
                                                        "radial-gradient(circle, rgba(230,139,0,1) 9%, rgba(230,123,0,1) 50%, rgba(230,92,0,1) 100%)":
                                                        "radial-gradient(circle, rgba(76,129,144,1) 28%, rgba(40,24,52,0.9360119047619048) 100%)"}`
                                                    }}
                                                    onClick={() => AddCart(item.product.product_id, item.images.productColorID, item.productStock.productStockID, item.amount)}
                                                    className='addToCart-Button'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                                                            <path strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div
                                                    onClick={() => DeleteItemFromWishList(item.id,item.productStock.productStockID)}>
                                                    <svg
                                                        style={{cursor:"pointer"}}
                                                        onMouseEnter={(e) => showTooltip(e, "Delete")}
                                                        onMouseLeave={hideTooltip}
                                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}