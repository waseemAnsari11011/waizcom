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
    const isLocal = !ip || ip === "::1" || ip === "127.0.0.1";

    try {
      // Primary: ipapi.co
      let url = isLocal ? "https://ipapi.co/json/" : `https://ipapi.co/${ip}/json/`;
      const response = await axios.get(url, { timeout: 3000 });
      return NextResponse.json(response.data);
    } catch (primaryError) {
      console.warn("Primary location service (ipapi.co) failed/rate-limited. Switching to fallback.");
      
      // Fallback: ip-api.com (HTTP only for free tier)
      let url = isLocal ? "http://ip-api.com/json/" : `http://ip-api.com/json/${ip}`;
      const response = await axios.get(url, { timeout: 3000 });
      
      const data = response.data;
      if (data.status === 'success') {
        // Map ip-api.com fields to match ipapi.co structure where needed
        return NextResponse.json({
          ...data,
          country_code: data.countryCode, 
          country_name: data.country,
          ip: data.query
        });
      }
      throw new Error("Fallback API returned status: " + data.status);
    }
  } catch (error) {
    console.error("Location proxy error:", error.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
