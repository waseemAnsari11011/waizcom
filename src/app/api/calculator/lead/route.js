import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Lead from "@/models/Lead";
import CalculatorConfig from "@/models/CalculatorConfig";
import axios from "axios";

export async function POST(request) {
  await connect();

  try {
    const body = await request.json();
    const { email, phone, answers, currency } = body;

    if (!email || !answers) {
      return NextResponse.json(
        { success: false, error: "Email and answers are required." },
        { status: 400 }
      );
    }

    // 1. Fetch current config
    const config = await CalculatorConfig.findOne();
    if (!config) {
      return NextResponse.json(
        { success: false, error: "Calculator configuration not found." },
        { status: 500 }
      );
    }

    // Determine rates based on currency
    const isINR = currency === "INR";
    const devRate = isINR ? (config.developerDayRateINR || 15000) : config.developerDayRate;
    // const designRate = ... (Deprecated: using single rate)

    // 2. Perform Calculation
    let totalDays = 0;
    // ... [Rest of calculation logic remains same until cost] ...
    
    // Helper to find question config
    const getQuestion = (id) => config.questions.find((q) => q.id === id);

    // Process "app_size" (Base Days)
    let baseDays = 0;
    const sizeQ = getQuestion("app_size");
    if (sizeQ && answers["app_size"]) {
        // Look up option by label (preferred) or value
        const answer = answers["app_size"];
        // Ensure accurate matching for both string/number types
        const option = sizeQ.options.find(opt => opt.label === answer || opt.value == answer); 
        
        if (option) {
            baseDays = option.value;
        } else {
             // Fallback if direct numeric value was sent (legacy support)
             baseDays = Number(answer) || 0;
        }
        totalDays += baseDays;
    }

    let devDays = baseDays;
    // designDays removal - strictly developer days now

    // Process other fixed-day questions
    const devFeatureIds = [
        "catalog_discovery",
        "cart_checkout",
        "billing",
        "users_accounts", 
        "order_management", 
        "dates_locations", 
        "social_engagement", 
        "ecosystem_apps",
        "admin_analytics", 
        "security"
    ];

    devFeatureIds.forEach(id => {
        if (answers[id]) {
            const qConfig = getQuestion(id);
            // answers[id] can be array (multiselect) or single value
            const selectedAnswers = Array.isArray(answers[id]) ? answers[id] : [answers[id]];
            
            selectedAnswers.forEach(ans => {
                // Find option by label or value
                let val = 0;
                if (qConfig) {
                    const option = qConfig.options.find(opt => opt.label === ans || opt.value == ans);
                    if (option) {
                        val = option.value;
                    } else {
                        val = Number(ans) || 0;
                    }
                } else {
                     val = Number(ans) || 0;
                }
                devDays += val;
            });
        }
    });

    // PM Cost (Only for Non-INR / International)
    // User requested to exclude PM cost for India
    let pmDays = 0;
    if (!isINR && config.pmPercentage) {
        pmDays = (devDays * config.pmPercentage) / 100;
    }

    // Consolidated Rate Calculation (Dev + PM use the same 'Day Rate')
    const dayRate = devRate; 

    const totalDevCost = devDays * dayRate;
    const totalPmCost = pmDays * dayRate;

    const estimatedCost = totalDevCost + totalPmCost;
    const estimatedTotalDays = devDays + pmDays; 

    // 3. Save Lead
    // 3. Save Lead using the main Lead model
    const lead = await Lead.create({
      email,
      phone,
      source: "App Cost Calculator",
      message: `App Cost Calculator: Est ${isINR ? '₹' : '$'}${Math.round(estimatedCost)} (${Math.round(estimatedTotalDays)} Days)`,
      calculatorData: {
          dayRate,
          currency: isINR ? "INR" : "USD",
          totalCost: Math.round(estimatedCost),
          totalDays: Math.round(estimatedTotalDays),
          answers, // Store full answers here if needed for deeper analysis
      },
      configHash: config.configHash,
      // Lead schema fields
    });

    // Send Notification Email to Admin
    try {
        await axios.post("https://email-server-new.netlify.app/.netlify/functions/api/send-email", {
            name: "App Cost Calculator User",
            email,
            phone,
            company: "App Cost Calculator",
            country: isINR ? "India" : "Global",
            subject: "New Lead from App Cost Calculator",
            message: `New Estimate Generated: ${isINR ? '₹' : '$'}${Math.round(estimatedCost)} (${Math.round(estimatedTotalDays)} Days). \nAnswers: ${JSON.stringify(answers)}`
        });
    } catch (emailError) {
        console.error("Failed to send notification email", emailError.message);
        // Do not fail the request, just log it.
    }

    return NextResponse.json({
      success: true,
      data: {
        estimate: Math.round(estimatedCost),
        days: Math.round(estimatedTotalDays),
        leadId: lead._id
      },
    });

  } catch (error) {
    console.error("Calculator Error:", error);
    return NextResponse.json(
      { success: false, error: "Calculation failed." },
      { status: 500 }
    );
  }
}
