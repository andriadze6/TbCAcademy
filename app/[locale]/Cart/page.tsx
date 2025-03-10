"use client"
import './style/CartStyle.css'
import AddressFormCart from '../components/AddressFormCart'
import Tooltip from '../components/Tooltip'
import Loading from './loading'
import { useAuth } from '../../providers/UserSessionProvider';
import { useEffect, useState, } from 'react';
import Link from 'next/link';
import Image from "next/image";
import {useTranslations, useLocale } from 'next-intl';


export default function Cart() {
    const locale = useLocale();
    const [loading, setLoading] = useState(true); // Track loading state
    const [tooltip, setTooltip] = useState(null);
    const [deliveryAddress, setDeliveryAddress] = useState(null);
    const [data, setData] = useState({
        isEmpty: true,
        cartItems: [],
    });
    const { cart, DeleteItemFromCart } = useAuth();
    useEffect(() => {
        async function fetchData() {
            try {
                if (cart.length === 0) {
                    setData({
                        isEmpty: true,
                        cartItems: []
                    });
                } else {
                    const response = await fetch('/api/GetItems', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(cart),
                    });
                    const result = await response.json();
                    console.log(result);
                    setData({
                        isEmpty: result.length === 0, // Check if fetched cart is empty
                        cartItems: result
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Stop loading after fetch
            }
        }
        fetchData();
    }, [cart]);

    const handleCheckout = async () => {
        const response = await fetch('/api/Create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cartItems: data.cartItems, delivery_address: deliveryAddress }), // Send cart items
        });

        if (response.ok) {
          const session = await response.json();
          window.location.href = session.url;
        }else{
            const error = await response.json();
            console.log(error);
        }

      };
    const showTooltip = (event, text) => {
        event.preventDefault();
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

    function changeAmount(n, index) {
        let newData = [...data.cartItems];
        let prev = newData[index].amount;
        let cAmount = prev + n;
        if (cAmount < 1) {
            cAmount = 1
        }
        newData[index].amount = cAmount;
        console.log(newData);
        setData(()=>({...data, cartItems: newData}));
    }
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="cart-container">
                        <div style={{margin:"30px auto", width:"50%", textAlign:"center", position:"relative"}}>
                            <h1 style={{borderBottom:"1px solid #ccc", paddingBottom:"10px"}}>{!data.isEmpty ? "Your Cart" : "Your Cart is Empty"}</h1>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr",  gap: "20px", margin: "0 auto", width: "90%"}}>
                            <div className='cart-Div'>
                                <div className='cart-body'>
                                    {
                                        data.cartItems.length > 0 &&
                                        data.cartItems.map((item, index) => {
                                            return (
                                                <div className='cart-item' key={item.product_StockID}>
                                                    <div style={{display:"flex", alignItems:"center", gap:"20px"}}>
                                                        <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                                                            <svg
                                                                onClick={() => DeleteItemFromCart(item.id,  item.product_StockID)}
                                                                style={{cursor:"pointer"}}
                                                                onMouseEnter={(e) => showTooltip(e, "Delete")}
                                                                onMouseLeave={hideTooltip}
                                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                            <Link href={`/${locale}/ProductPage/${item.product_ID}/${item.product_ColorID}`}>
                                                                <Image className='cart-item-image' height={100} width={100} src={item.isPrimary} alt=""></Image>
                                                            </Link>
                                                        </div>
                                                        <div style={{display:"flex", alignItems:"left",
                                                            flexDirection:"column", gap:"10px"}}>
                                                            <h4>{locale === "en" ? item.title_en : item.title_ge}</h4>
                                                            <p>color: {locale === "en" ? item.color_en : item.color_ge}</p>
                                                            <p>size: {item.size}</p>
                                                        </div>
                                                    </div>
                                                    <div style={{display:"flex", alignItems:"center", gap:"20px",width:"100%", justifyContent:"center"}}>
                                                        <p>₾{item.price_lari}</p>
                                                    </div>
                                                    <div style={{display:"flex", alignItems:"center", gap:"20px", width:"100%", justifyContent:"center"}} >
                                                            <div className='select-Amount-Div'>
                                                                <button onClick={()=>{changeAmount(-1, index)}} className='select-Amount-Button'>-</button>
                                                                <h5 className='select-Amount-Number'>{item.amount}</h5>
                                                                <button onClick={()=>{changeAmount(1, index)}} className='select-Amount-Button'>+</button>
                                                            </div>
                                                    </div>
                                                    <div style={{display:"flex", alignItems:"center", gap:"20px", width:"100%", justifyContent:"center"}}>
                                                        <p>₾{item.price_lari * item.amount}</p>
                                                    </div>
                                                    {tooltip && <Tooltip text={tooltip.text} position={tooltip.position} />}
                                                </div>
                                        )})
                                    }
                                </div>
                                {
                                    data.cartItems.length > 0 &&
                                    <div className='cart-footer'>
                                        <button onClick={handleCheckout} className='to-checkout-button'>To check out</button>
                                        <div className='price-sum-div'>
                                            <h3>Total Price: ₾{data.cartItems.reduce((acc, item) => acc + item.price_lari * item.amount, 0).toFixed(2)}</h3>
                                        </div>
                                    </div>
                                }
                            </div>
                            {
                                data.cartItems.length > 0 &&
                                <AddressFormCart setDeliveryAddress={setDeliveryAddress}></AddressFormCart>
                            }
                        </div>
                    </div>
            }
        </>
    );
}