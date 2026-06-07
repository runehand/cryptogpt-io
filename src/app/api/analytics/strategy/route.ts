import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const strategyId = req.nextUrl.searchParams.get("strategyId");

    if (!strategyId) {
      return NextResponse.json(
        { error: "Strategy ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("analytics_strategy_performance_metrics")
      .select("*")
      .eq("strategy_id", strategyId)
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error) {
    console.log("Failed to fetch data: ", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
