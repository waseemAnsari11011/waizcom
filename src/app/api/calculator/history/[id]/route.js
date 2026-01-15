import { NextResponse } from "next/server";
import connect from "@/lib/db";
import CalculatorConfigHistory from "@/models/CalculatorConfigHistory";

export async function DELETE(request, { params }) {
  await connect();
  try {
    const { id } = await params;
    await CalculatorConfigHistory.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
