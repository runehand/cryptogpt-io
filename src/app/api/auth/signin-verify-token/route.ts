import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function POST(req: Request) {
  try {
    const supabase = createCustomServerClient();
    const res = await req.json();

    const { email } = res;
    const { phone } = res;
    const { token } = res;
    const { type } = res;
    const options =
      type === "email"
        ? {
          email,
          token,
          type: "email" as any,
        }
        : {
          phone,
          token,
          type: "sms" as any,
        };
    const response = await supabase.auth.verifyOtp(options);
    console.log('response', response)
    const userId = response?.data?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Failed to sign in' }, { status: 500 })
    }
    const { error: upsertError } = await supabase
      .from('users')
      .update([
        {
          auth: {
            lastLoggedinTime: new Date().toISOString(),
            lastAuthStatus: "success",
            lastLoggedinProvider: type
          }
        }
      ])
      .eq('userId', userId)
    if (upsertError) {
      throw new Error("Failed to put data to users table")
    }
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
  }
}
