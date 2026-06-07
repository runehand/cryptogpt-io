import { NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const { email } = res;
    const { phone } = res;
    if (typeof email !== "undefined") {
      const response = await supabase.auth.signInWithOtp({
        email,
        // options: {
        //   emailRedirectTo: 'https://example.com/welcome'
        // }
      });
      return NextResponse.json(response);
    }
    const response = await supabase.auth.signInWithOtp({
      phone,
      // options: {
      //   phoneRedirectTo: 'https://example.com/welcome'
      // }
    });
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
  }
}
