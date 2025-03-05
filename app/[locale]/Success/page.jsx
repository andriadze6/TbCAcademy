import { redirect } from 'next/navigation'
import { stripe } from '../../../utils/stripe'
import { createClient } from '../../../utils/supabase/server'
import { getLocale } from 'next-intl/server';

export default async function Success({ searchParams }) {
  const supabase = await createClient();
  const { session_id } = await searchParams
  if (!session_id) throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details: { email: customerEmail }, line_items, metadata} = session

  console.log("metadata",metadata)
  console.log("line_items",line_items.data)
  if (status === 'open') {
    await stripe.checkout.sessions.expire(session_id);
    return redirect('/')
  }

  const { data: existingOrder, error: checkError } = await supabase
    .from('Orders')
    .select('id')
    .eq('session_id', session_id)
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
    try {
      const results = await Promise.all(
        line_items.data.map(async (item) => {
          const [stockResult, orderResult, cartResult] = await Promise.all([
            supabase.rpc('decrement_stock', { sid: item.price.id, quantity: item.quantity }),
            supabase.from('Orders').insert([
              {
                user_id: metadata.user_id,
                session_id: session_id,
                amount_money: item.amount_total / 100,
                quantity: item.quantity,
                currency: session.currency,
                pay_status: session.payment_status,
                delivery_address: metadata.delivery_address,
                delivery_status: 'pending',
                product: metadata[item.price.id],
              }
            ]),
            supabase.from('Cart').delete().eq('user_ID', metadata.user_id)
          ]);
          const [stockError, orderError, cartError] = [stockResult.error, orderResult.error, cartResult.error];
          if (cartError) throw new Error(`Error deleting cart items: ${cartError.message}`);
          if (orderError) throw new Error(`Error creating order: ${orderError.message}`);
          if (stockError) throw new Error(`Error updating stock for ${item.price.id}: ${stockError.message}`);

          return { stockResult, orderResult, cartResult };
        })
      );
      console.log('Updated stock:', results);
    } catch (error) {
      console.error('Error updating stock:', error);
      return redirect('/');
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
              {item.quantity} x {item.description} - {item.amount_total / 100} {session.currency.toUpperCase()}
            </li>
          ))}
        </ul>
      </section>
    )
  }
}
