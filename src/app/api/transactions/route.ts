import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const wallet_id = req.nextUrl.searchParams.get("wallet_id");

    if (!wallet_id) {
      return NextResponse.json(
        { error: "Wallet ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("wallet_id", wallet_id)
      .order("created_at", { ascending: false });

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error to fetch data: ", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
