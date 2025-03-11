'use client'
 import './MyOrder.css'
import { useEffect, useState, } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/UserSessionProvider';
import Tooltip from '../../components/ToolTip2';
import {orderType} from '@/Type/type'
import {useTranslations, useLocale } from 'next-intl';

export default function MyOrders() {
    const [tooltip, setTooltip] = useState(null);
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
                        <div className="header">
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
                        <div>

                        </div>
                        {tooltip && <Tooltip text={tooltip.text} position={tooltip.position} />}
                    </div>
                )
            })
        )
    );
}

