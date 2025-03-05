import { NextResponse, NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '../../../../utils/stripe';
import { createClient } from '../../../../utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const body = await request.json();
    const { cartItems, delivery_address } = body;
    let supabase = await createClient();
    const {data: { user }} = await supabase.auth.getUser();
    let metadata ={
      delivery_address: JSON.stringify(delivery_address),
      user_id: user.id
    }
    let lineItems = [];
    cartItems.forEach(item => {
      metadata[item.stripe_ProductID] = JSON.stringify({
        product_id:item.product_id,
        product_ColorID : item.product_ColorID,
        productStockID : item.productStockID})
      lineItems.push({priceId: item.stripe_ProductID, quantity: item.amount})
    })
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems.map((item) => ({
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: item.priceId,
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${origin}/Success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      metadata:metadata,
    });

    return NextResponse.json({url:session.url})
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
