import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function POST(req: Request) {
  const supabase = createCustomServerClient();
  try {
    const { id, address } = await req.json();

    if (!id || !address) {
      return NextResponse.json({ success: false, error: 'Missing id or address' }, { status: 400 });
    }

    const { error } = await supabase
      .from('user_crgpt_token_history')
      .update({ address, status: 'admin_waiting' })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
