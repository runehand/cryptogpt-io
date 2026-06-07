import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

import { retrievePaymentIntent } from 'src/lib/stripeLib';

export async function POST(req: Request) {
  const supabase = createCustomServerClient();
  try {
    const { payment_intent_id, amount, address } = await req.json();

    console.log(payment_intent_id, amount)

    if (!payment_intent_id || !amount) {
      return NextResponse.json({ success: false, error: 'Missing payment_intent_id or amount' }, { status: 400 });
    }

    const userHeader = req.headers.get('x-user') as string;

    if (!userHeader) {
      return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
    }
    const user = JSON.parse(userHeader);

    const payment_intent = await retrievePaymentIntent(payment_intent_id);

    const { data: stripeCustomer, error: stripeCustomerError } = await supabase
      .from('stripe_customer')
      .select()
      .eq('user_id', user?.id);

    if (stripeCustomerError) {
      return NextResponse.json({ success: false, error: 'Error fetching stripe customer' }, { status: 500 });
    }

    const customer_id = stripeCustomer[0]?.customer_id;

    if (payment_intent.customer === customer_id && payment_intent.status === 'succeeded') {

      if (address) {
        const { error } = await supabase
          .from('user_crgpt_token_history')
          .insert([{ user_id: user?.id, amount, address }]);
        if (error) return NextResponse.json({ success: false, error }, { status: 400 });
      } else {
        const { error } = await supabase
          .from('user_crgpt_token_history')
          .insert([{ user_id: user?.id, amount, status: 'address_waiting' }]);
        if (error) return NextResponse.json({ success: false, error }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}