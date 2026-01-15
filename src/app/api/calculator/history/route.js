import { NextResponse } from "next/server";
import connect from "@/lib/db";
import CalculatorConfigHistory from "@/models/CalculatorConfigHistory";
import Lead from "@/models/Lead";
import CalculatorBooking from "@/models/CalculatorBooking";

export async function GET() {
  await connect();
  try {
    const history = await CalculatorConfigHistory.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean(); // Use lean() to allow modification
      
    // Augment with stats
    const historyWithStats = await Promise.all(history.map(async (item) => {
        const rate = item.configSnapshot?.developerDayRate;
        const hash = item.configSnapshot?.configHash;
        
        if (!rate && !hash) return { ...item, stats: { leads: 0, bookings: 0, conversion: 0 } };
        
        // Leads Query: Prefer Hash if available (Unique Bucket), else Fallback to Rate (Legacy)
        const leadQuery = hash 
            ? { configHash: hash } 
            : { "calculatorData.dayRate": rate, source: "App Cost Calculator" };
            
        const bookingQuery = hash 
            ? { configHash: hash }
            : { dayRate: rate };
        
        const leadsCount = await Lead.countDocuments(leadQuery);
        const bookingsCount = await CalculatorBooking.countDocuments(bookingQuery);
        
        const conversion = leadsCount > 0 ? ((bookingsCount / leadsCount) * 100).toFixed(1) : 0;
        
        return {
            ...item,
            stats: {
                leads: leadsCount,
                bookings: bookingsCount,
                conversion
            }
        };
    }));
      
    return NextResponse.json({ success: true, data: historyWithStats });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
