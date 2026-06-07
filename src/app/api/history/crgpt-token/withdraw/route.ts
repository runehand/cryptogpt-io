import axios from 'axios';
import crypto from 'crypto';
import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

import { MEXC_API } from 'src/config-global';

function createSignature(queryString: string, secretKey: string): string {
  return crypto
    .createHmac('sha256', secretKey)
    .update(queryString)
    .digest('hex');
}

export async function POST(req: Request) {
  const supabase = createCustomServerClient();
  console.log('MEXC_API', MEXC_API);
  try {
    const { transaction_id } = await req.json();

    console.log(transaction_id)

    if (!transaction_id) {
      return NextResponse.json({ success: false, error: 'Missing transaction id' }, { status: 400 });
    }

    const userHeader = req.headers.get('x-user') as string;

    if (!userHeader) {
      return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
    }
    const user = JSON.parse(userHeader);

    const { data, error }: any = await supabase.from("users_profile").select("is_admin").eq("user_id", user?.id).single();

    if (error)
      return NextResponse.json(
        { code: error.code, error: error.message },
        { status: 500 }
      );
    
    console.log('data', data);

    if (!data?.is_admin)
      return NextResponse.json(
        { error: "Only admin can call this endpoint." },
        { status: 401 }
      );

    const { data: transaction, error: transactionError }: any = await supabase.from("user_crgpt_token_history").select("*").eq("id", transaction_id).single();

    if (transactionError)
      return NextResponse.json(
        { code: transactionError.code, error: transactionError.message },
        { status: 500 }
      );

    if (!transaction)
      return NextResponse.json(
        { error: "The transaction id is not correct." },
        { status: 400 }
      )

    const mexcAccessKey = MEXC_API.accessKey || '';
    const mexcSecretKey = MEXC_API.secretKey || '';

    if (!mexcAccessKey.trim() || !mexcSecretKey.trim()) {
      return NextResponse.json({ error: 'Could not send money to customers.' }, { status: 400 });
    }

    const params = {
      coin: 'CRGPT',
      address: transaction.address,
      amount: transaction.amount,
      netWork: 'ETH',
      timestamp: Date.now().toString()
    };

    // Sort the params alphabetically
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});

    const queryString = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    console.log('Query string before signature:', queryString);

    const signature = createSignature(queryString, mexcSecretKey);

    console.log('Generated signature:', signature);

    const finalParams = { ...sortedParams, signature };

    const url = `https://api.mexc.com/api/v3/capital/withdraw?${queryString}&signature=${signature}`;

    const response = await axios({
      method: 'post',
      url,
      data: finalParams,
      headers: {
        'X-MEXC-APIKEY': mexcAccessKey,
        'Content-Type': 'application/json'
      }
    });
    if (response.data?.id) {
      const { error: updateTransactionError }: any = await supabase.from("user_crgpt_token_history").update({ status: "blockchain_processing", 'w_id': response.data.id   }).eq("id", transaction_id);

      if (updateTransactionError)
        return NextResponse.json(
          { code: updateTransactionError.code, error: updateTransactionError.message },
          { status: 500 }
        );
    }
    
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    // console.error('Error:', error);
    if (axios.isAxiosError(error) && error.response) {
      // console.error('MEXC API Error Response:', error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: error.response.status });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}