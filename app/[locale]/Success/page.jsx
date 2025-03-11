import { redirect } from 'next/navigation'
import { stripe } from '../../../utils/stripe'
import { createClient } from '../../../utils/supabase/server'
import {logError} from '../functions/logError'
import { getLocale } from 'next-intl/server';


export default async function Success({ searchParams }) {
  let notAdded = {

  }
  const supabase = await createClient();
  const { session_id } = await searchParams
  if (!session_id) throw new Error('Please provide a valid session_id (`cs_test_...`)')
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })
  const { status, customer_details: { email: customerEmail }, line_items, metadata} = session
  if (status === 'open') {
    await stripe.checkout.sessions.expire(session_id);
    return redirect('/')
  }
  const { data: existingOrder, error: checkError } = await supabase
    .from('Orders')
    .select('id')
    .eq('session_ID', session_id)
    .single();
  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking order:', checkError);
    return redirect('/');
  }
  if (existingOrder) {
    console.log('Order already processed, skipping stock update.');
    return redirect('/');
  }
  if (status === 'complete') {
    let supabase = await createClient();
    for (const [index, item] of line_items.data.entries()) {
        const [stockResult, orderResult, cartResult] = await Promise.all([
          supabase.rpc('decrement_stock', { sid: item.price.id, quantity: item.quantity }),
          supabase.from('Orders').insert([
            {
              session_ID: session_id,
              amount_money: item.amount_total / 100,
              quantity: item.quantity,
              currency: session.currency,
              pay_status: session.payment_status,
              delivery_address: metadata.delivery_address,
              delivery_status: 'pending',
              user_ID: metadata.user_id,
              product: JSON.parse(metadata[item.price.id]),
              up_date: new Date().toISOString(),
            }
          ]),
          console.log("metadata:",metadata[item.price.id]),
          console.log("metadata parse:",JSON.parse(metadata[item.price.id])),
          supabase.from('Cart').delete().eq('user_ID', metadata.user_id)
        ]);
        const [stockError, orderError, cartError] = [stockResult.error, orderResult.error, cartResult.error];
        if (cartError) {
          logError(cartError, "deleting cart", "Success", 65, metadata.user_id);
        }
        if (orderError) {
          try {
            notAdded[item.price.id] = true
            const refund = await stripe.refunds.create({
              payment_intent: session.payment_intent.id,
              reason: 'requested_by_customer',
              amount: item.amount_total,
              metadata: {
                user_id: metadata.user_id,
                reason: 'requested_by_customer',
              }
            });
            if (refund.status === 'succeeded') {
              supabase.from('refunds').insert([
              {
                user_id: metadata.user_id,
                session_id: session_id,
                payment_intent: session.payment_intent.id,
                customer_email: customerEmail,
                refunded_amount: item.amount_total / 100,
                currency: session.currency,
                status: 'processed',
                reason: 'Order was not saved',
                product: metadata[item.price.id],
                created_at: new Date().toISOString(),
                processed_at: new Date().toISOString(),
              }
              ]);
              logError(orderError, "writing order to table", "Success", 87, metadata.user_id);
            }
          } catch (error) {
            logError(error, "decrementing stock", "Success", 100, metadata.user_id);
          }
        }
        if (stockError) {
           logError(stockError, "decrementing stock", "Success", 100, metadata.user_id);
        }
    }
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}. If you have any questions, please email{' '}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
        <h2>Purchased Products:</h2>
        <ul>
          {line_items.data.map((item) => (
            <li key={item.id}>
              {
                notAdded[item.price.id] &&
                <p style={{color: "red"}}>product was not purchase money will be refunded</p>
              }
              {item.quantity} x {item.description} - {item.amount_total / 100} {session.currency.toUpperCase()}
            </li>
          ))}
        </ul>
      </section>
    )
  }
}
