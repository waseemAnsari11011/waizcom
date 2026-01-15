import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Lead from "@/models/Lead";
import CalculatorBooking from "@/models/CalculatorBooking";

export async function GET(request) {
  await connect();
  try {
    const { searchParams } = new URL(request.url);
    const rate = searchParams.get("rate");
    // const currency = searchParams.get("currency"); // Optional filter if rates are same across currencies?
    // User said "for every rate".
    
    if (!rate) {
        return NextResponse.json({ success: false, error: "Rate required" }, { status: 400 });
    }
    
    const rateNum = Number(rate);
    
    // Count Leads with this rate
    const leadsCount = await Lead.countDocuments({
        "calculatorData.dayRate": rateNum,
        source: "App Cost Calculator"
    });
    
    // Count Bookings with this rate
    const bookingsCount = await CalculatorBooking.countDocuments({
        dayRate: rateNum
    });
    
    const conversionRate = leadsCount > 0 ? ((bookingsCount / leadsCount) * 100).toFixed(1) : 0;
    
    return NextResponse.json({
        success: true,
        data: {
            leads: leadsCount,
            bookings: bookingsCount,
            conversion: conversionRate
        }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
