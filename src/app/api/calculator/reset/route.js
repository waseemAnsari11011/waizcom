import { NextResponse } from "next/server";
import connect from "@/lib/db";
import CalculatorConfig from "@/models/CalculatorConfig";


// Hardcoding the config here again to be safe, or I can import it if I exported it.
// I didn't export INITIAL_CONFIG from the other file. 
// I will just delete the existing document so the next GET request re-seeds it.

export async function GET() {
  await connect();
  try {
    await CalculatorConfig.deleteMany({}); // Clear all configs
    return NextResponse.json({ success: true, message: "Configuration reset. Please refresh the Calculator page." });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
