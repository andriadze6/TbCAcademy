import {logError} from '../../functions/logError'
import { createClient } from '../../../../utils/supabase/server';
import {OrderType} from '../../../Type/type'
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';


export async function POST(req: NextRequest) {
    try{
        const supabase = await createClient();
        const { userID } = await req.json();
        const { data, error } = await supabase.from<'Orders', OrderType[]>('Orders').select('*').eq('user_ID', userID);
        if (error) {
            console.log(error);
        }
        console.log("data:",data);
        let products = data.map((order) => order.product);
        const baseUrl = req.nextUrl.origin;
        const response = await fetch(`${baseUrl}/api/GetItems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(products),
        });
        let info = await response.json();
        let result = data.map((order)=>{
            return {...order,delivery_address: JSON.parse(order.delivery_address), product: info.find((item) => item.product_StockID === order.product.product_StockID)};
        })
        return NextResponse.json(result);
    }catch(error){
        logError(error, "GetUserOrders", "api/GetUserOrders/route.ts", 13);
        console.log(error)
    }
}