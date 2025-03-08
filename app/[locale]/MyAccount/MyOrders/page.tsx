'use client'
// import './style.css'
import { useEffect, useState, } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/UserSessionProvider';
import {useTranslations, useLocale } from 'next-intl';

export default function MyOrders() {
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
                setUserOrder(data);
            }
        }
        if (user) {
            fetchOrders();
        }
    }, [user]);

    return (

            <div><h1>t</h1>
            </div>
    );
}

