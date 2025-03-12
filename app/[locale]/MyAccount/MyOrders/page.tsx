'use client'
 import './MyOrder.css'
import { useEffect, useState, } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/UserSessionProvider';
import Tooltip from '../../components/ToolTip2';
import {orderType, delivery_status} from '@/Type/type'
import {useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from "next/image";


export default function MyOrders() {
    const [tooltip, setTooltip] = useState(null);
    const locale = useLocale();
    const { user } = useAuth();
    const router = useRouter();
    const [userOrder, setUserOrder] = useState<orderType[] | null>(null);
    const currentLanguage = useLocale();
    useEffect(() => {
        async function fetchOrders() {
            let data = await fetch('/api/GetUserOrders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID: user.id }),
            });
            if (data.ok) {
                let jsonData = await data.json();
                console.log(jsonData);
                setUserOrder(jsonData);
            }
        }
        if (user) {
            fetchOrders();
        }
    }, [user]);
    function formatDate(isoString) {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat(currentLanguage, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }
    const showTooltip = (event, delivery_address) => {
        const rect = event.target.getBoundingClientRect();
        setTooltip({
          text:(
                <>
                    <p>{delivery_address.first_Name + " " + delivery_address.last_Name}</p>
                    <p>{delivery_address.city}</p>
                    <p>{delivery_address.street_Address}</p>
                    <p>{delivery_address.zip_Code}</p>
                </>
          ),
          position: {
            top: rect.bottom + window.scrollY + 10,
            left: rect.left + window.scrollX - 10,
          },
        });
    };
    const hideTooltip = () => {
    setTooltip(null);
    };
    return (
        userOrder && (
            userOrder.map((order) => {
                return(
                    <div key={order.id} style={{padding:"5px", border:"1px solid #708d97", borderRadius:"5px", marginBottom:"10px"}}>
                        <div className="header" style={{marginBottom:"10px"}}>
                            <div>
                                <p>ORDER PLACED</p>
                                <p>{formatDate(order.created_at)}</p>
                            </div>
                            <div>
                                <p>TOTAL</p>
                                <p>${order.amount_money}</p>
                            </div>
                            <div>
                                <p>SHIP TO</p>
                                <p style={{display:"flex", alignItems:"center", gap:"5px", cursor:"pointer",textDecoration:"underline"}}
                                onMouseEnter={(e) => showTooltip(e, order.delivery_address)}
                                onMouseLeave={() => {hideTooltip()}}>
                                    {order.delivery_address.first_Name + " " + order.delivery_address.last_Name}
                                    &#x2B9F;
                                </p>
                            </div>
                        </div>
                        <div style={{display:'grid',gridTemplateColumns:"1fr auto"}}>
                            <div style={{display:"flex", gap:"20px"}}>
                                <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                                    <Link style={{height:"100%"}} href={`/${locale}/ProductPage/${order.product.product_ID}/${order.product.product_ColorID}`}>
                                        <Image className='cart-item-image' height={100} width={100} src={order.product.isPrimary} alt=""></Image>
                                    </Link>
                                </div>
                                <div style={{display:"flex", alignItems:"left",
                                    flexDirection:"column", gap:"10px"}}>
                                    <h4>{locale === "en" ? order.product.title_en : order.product.title_ge}</h4>
                                    <p>color: {locale === "en" ? order.product.color_en : order.product.color_ge}</p>
                                    <p>size: {order.product.size}</p>
                                </div>
                            </div>
                            <div>
                                <ul className="tracking-container">
                                {
                                    Object.keys(delivery_status)
                                        .filter(key => isNaN(Number(key))) // Ensures numeric values are not included
                                        .map((key) => {
                                            const status = delivery_status[key] < delivery_status[order.delivery_status];
                                            const checkbox = delivery_status[key] <= delivery_status[order.delivery_status];
                                            return (
                                                <li key={key} className="tracking-step">
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                                        width={15} height={15}
                                                        fill={!checkbox ? "none" : "currentColor"} stroke={ !checkbox ? "black" : "currentColor"} viewBox="0 0 24 24" strokeWidth={1.5}  className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                        <div className={delivery_status[key] != 4 ?  (!status ? 'v1_dotted_line' : 'v1_solid_line'): " "}></div>
                                                    </div>
                                                    <label>{locale === "en" ? key : key}</label>
                                                </li>
                                            );
                                        })
                                    }
                                    {/* <li className="tracking-step">
                                        <div>
                                            <input type="checkbox" checked disabled/>
                                            <div style={{position:"relative", left:"45%"}} className='v1'></div>
                                        </div>
                                        <label><strong>Ordered today</strong></label>
                                    </li>
                                    <li className="tracking-step">
                                        <div>
                                            <input type="checkbox" disabled/>
                                            <div style={{position:"relative", left:"45%"}} className='v1'></div>
                                        </div>
                                        <label>Shipped</label>
                                    </li>
                                    <li className="tracking-step">
                                        <div>
                                            <input type="checkbox" disabled/>
                                            <div style={{position:"relative", left:"45%"}} className='v1'></div>
                                        </div>
                                        <label>Out for delivery</label>
                                    </li>
                                    <li className="tracking-step">
                                        <input type="checkbox" disabled/>
                                        <label>Arriving tomorrow by 9pm</label>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                        {tooltip && <Tooltip text={tooltip.text} position={tooltip.position} />}
                    </div>
                )
            })
        )
    );
}

