import { NextResponse } from "next/server";
import connect from "@/lib/db";
import CalculatorBooking from "@/models/CalculatorBooking";

export async function POST(request) {
  await connect();
  try {
    const body = await request.json();
    const { dayRate, currency, totalCost, configHash } = body;
    
    await CalculatorBooking.create({
        dayRate,
        currency,
        totalCost,
        configHash
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
