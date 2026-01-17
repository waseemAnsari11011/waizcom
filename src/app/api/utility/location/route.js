import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  try {
    // Get IP from headers (x-forwarded-for is standard for proxies/load balancers)
    let ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
    
    // If multiple IPs, take the first one
    if (ip && ip.includes(",")) {
      ip = ip.split(",")[0].trim();
    }

    // Fallback for local development or if no header
    // Note: '::1' or '127.0.0.1' won't work with external geolocation APIs
    // Fallback for local development
    // If localhost, fetch external IP location directly
    let url = `https://ipapi.co/${ip}/json/`;
    if (!ip || ip === "::1" || ip === "127.0.0.1") {
       url = "https://ipapi.co/json/";
    }

    const response = await axios.get(url);
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Location proxy error:", error.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
