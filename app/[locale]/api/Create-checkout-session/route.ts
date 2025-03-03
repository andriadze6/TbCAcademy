import { NextResponse, NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '../../../../utils/stripe';
import{ createClient } from '../../../../utils/supabase/server'
import { json } from 'stream/consumers';
import { url } from 'inspector';

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const body = await request.json();
    const { cartItems } = body;    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map((item) => ({
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: item.priceId,
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${origin}/Success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.json({url:session.url})
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
