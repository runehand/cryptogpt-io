import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const symbol = req.nextUrl.searchParams.get("symbol") || "BTC";
    const { data: cachedData } = await supabase
      .from("crypto_data_cache")
      .select("*")
      .eq("endpoint", "prices")
      .eq("params", { symbol })
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

    if (
      cachedData &&
      Date.now() - new Date(cachedData.timestamp).getTime() < 60000
    )
      return NextResponse.json(cachedData.data);

    const response = await fetch(
      `${process.env.RUST_BACKEND_URL}/market/prices?symbol=${symbol}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from backend" },
        { status: response.status }
      );
    }

    const data = await response.json();

    await supabase.from("crypto_data_cache").insert({
      endpoint: "prices",
      params: { symbol },
      data,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error to fetch data: ", error);
    return NextResponse.json({ error: "Error to fetch data" }, { status: 500 });
  }
}
