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
  console.log('MEXC_API', MEXC_API);
  try {
    const supabase = createCustomServerClient();

    const { data: transactions, error: transactionError } = await supabase
      .from("user_crgpt_token_history")
      .select("*")
      .eq("status", "blockchain_processing");

    if (transactionError) {
      return NextResponse.json(
        { error: "Error fetching transactions." },
        { status: 500 }
      );
    }

    if (!transactions || transactions.length === 0) {
      return NextResponse.json(
        { error: "No transactions found with the given status." },
        { status: 404 }
      );
    }

    console.log('transactions', transactions);

    const mexcAccessKey = MEXC_API.accessKey || '';
    const mexcSecretKey = MEXC_API.secretKey || '';

    if (!mexcAccessKey.trim() || !mexcSecretKey.trim()) {
      return NextResponse.json({ error: 'Could not send money to customers.' }, { status: 400 });
    }
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const startTime = twoDaysAgo.getTime().toString();

    const params = {
      coin: 'CRGPT',
      timestamp: Date.now().toString(),
      startTime
    };

    const sortedParams = Object.keys(params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});

    const queryString = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');


    const signature = createSignature(queryString, mexcSecretKey);

    const finalParams = { ...sortedParams, signature };

    const url = `https://api.mexc.com/api/v3/capital/withdraw/history?${queryString}&signature=${signature}`;

    const response = await axios({
      method: 'get',
      url,
      data: finalParams,
      headers: {
        'X-MEXC-APIKEY': mexcAccessKey,
        'Content-Type': 'application/json'
      }
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const transaction of transactions) {
      const matchingMexcTransaction = response.data.find(
        (mexcTx: { id: any; }) => mexcTx.id === transaction.w_id
      );

      if (matchingMexcTransaction && matchingMexcTransaction.explorerUrl) {
        // eslint-disable-next-line no-await-in-loop
        const { error: updateError } = await supabase
          .from("user_crgpt_token_history")
          .update({
            status: "paid",
            explorer_url: matchingMexcTransaction.explorerUrl
          })
          .eq("id", transaction.id);

        if (updateError) {
          console.error(`Error updating transaction ${transaction.id}:`, updateError);
        } else {
          console.log(`Successfully updated transaction ${transaction.id}`);
        }
      }
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error:', error);
    if (axios.isAxiosError(error) && error.response) {
      // console.error('MEXC API Error Response:', error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: error.response.status });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}