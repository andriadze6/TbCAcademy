'use client'
 import './MyOrder.css'
import { useEffect, useState, } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/UserSessionProvider';
import Tooltip from '../../components/Tooltip';
import {useTranslations, useLocale } from 'next-intl';

export default function MyOrders() {
    const [tooltip, setTooltip] = useState(null);
    const { user } = useAuth();
    const router = useRouter();
    const [userOrder, setUserOrder] = useState(null);
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
                data = await data.json();
                console.log(data);
                setUserOrder(data);
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
    return (
        userOrder && (
            userOrder.map((order) => {
                return(
                    <div key={order.id} style={{padding:"5px", border:"1px solid #708d97", borderRadius:"5px"}}>
                        <div className="header">
                            <div style={{display:"flex", gap:"20px"}}>
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
                                    onMouseEnter={(e) => showTooltip(e, order.delivery_address.first_Name + " " + order.delivery_address.last_Name)}
                                    onMouseLeave={() => {hideTooltip()}}>
                                        {order.delivery_address.first_Name + " " + order.delivery_address.last_Name}
                                        <svg width={"20px"} height={"20px"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </p>
                                </div>
                            </div>
                            <div style={{display:"flex", justifyContent:"end"}}>

                            </div>
                        </div>
                        {tooltip && <Tooltip text={tooltip.text} position={tooltip.position} />}
                    </div>
                )
            })
        )
    );
}

