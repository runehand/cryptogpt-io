import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const symbol = req.nextUrl.searchParams.get("symbol") || "BTC";
    const from = req.nextUrl.searchParams.get("from") || "";
    const to = req.nextUrl.searchParams.get("to") || "";

    const response = await fetch(
      `${process.env.RUST_BACKEND_URL}/market/historical?symbol=${symbol}&from=${from}&to=${to}`
    );
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from backend" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error to fetch data: ", error);
    return NextResponse.json({ error: "Error to fetch data" }, { status: 500 });
  }
}
