import { NextResponse } from "next/server";
import connect from "@/lib/db";
import CalculatorConfig from "@/models/CalculatorConfig";
import crypto from "crypto";

// Initial seed data based on the prompt
const INITIAL_CONFIG = {
  developerDayRate: 450,
  designDayRate: 450,
  developerDayRateINR: 15000,
  designDayRateINR: 15000,
  pmPercentage: 50, // Actually prompt says "Project Manager: 50" (days) - treating as fixed days for now in seed
  questions: [
    {
      id: "app_size",
      label: "How big is your e-commerce store?",
      type: "base_days",
      options: [
        { label: "Small (Startup)", value: 10 },
        { label: "Medium (Growth)", value: 30 },
        { label: "Large (Enterprise)", value: 50 },
      ],
    },

    {
      id: "catalog_discovery",
      label: "Catalog & Discovery",
      type: "fixed_days",
      options: [
        { label: "Advanced Search (ElasticSearch)", value: 5 },
        { label: "Product Filtering & Sorting", value: 4 },
        { label: "Wishlist & Favorites", value: 3 },
        { label: "Product Variants (Size/Color)", value: 4 },
        { label: "Product Reviews & Ratings", value: 4 },
        { label: "Image Zoom / Gallery", value: 2 },
      ],
    },
    {
      id: "cart_checkout",
      label: "Cart & Checkout",
      type: "fixed_days",
      options: [
        { label: "Coupon Codes & Discounts", value: 3 },
        { label: "Guest Checkout", value: 3 },
        { label: "Gift Wrapping / Notes", value: 2 },
        { label: "Abandoned Cart Recovery", value: 4 },
      ],
    },
    {
      id: "billing",
      label: "Billing",
      type: "fixed_days",
      options: [
        { label: "Third Party Payment Gateway Integration", value: 8 },
        { label: "Subscription Plans", value: 6 },
        { label: "Buy Now Pay Later", value: 4 },
      ],
    },
    {
      id: "users_accounts",
      label: "Users & Accounts",
      type: "fixed_days",
      options: [
        { label: "Email / Password Sign Up", value: 2 },
        { label: "Google Sign Up", value: 3 },
        { label: "Phone Number OTP Login", value: 4 },
        { label: "User Profiles & History", value: 3 },
        { label: "Loyalty Points System", value: 5 },
      ],
    },
    {
      id: "order_management",
      label: "Order Management",
      type: "fixed_days",
      options: [
        { label: "Real-time Order Tracking", value: 5 },
        { label: "Order History", value: 3 },
        { label: "Returns & Refunds System", value: 6 },
        { label: "Push Notifications (Status)", value: 4 },
        { label: "Invoice Generation", value: 3 },
      ],
    },
    {
      id: "social_engagement",
      label: "Customer Support",
      type: "fixed_days",
      options: [
        { label: "In-app Chat / Messaging", value: 6 },
        { label: "Customer Service Ticket Generation", value: 5 },
        { label: "FAQ / Help Center", value: 3 },
      ],
    },
    {
      id: "ecosystem_apps",
      label: "Ecosystem Apps",
      type: "fixed_days",
      options: [
        { label: "Separate Vendor/Seller App", value: 15 },
        { label: "Delivery Partner App", value: 12 },
      ],
    },
    {
      id: "admin_analytics",
      label: "Admin & Analytics",
      type: "fixed_days",
      options: [
        { label: "CMS / Product Management", value: 7 },
        { label: "Sales Analytics Dashboard", value: 5 },
        { label: "Multilingual Support", value: 6 },
      ],
    },
    {
      id: "dates_locations",
      label: "Dates & Locations",
      type: "fixed_days",
      options: [
        { label: "Calendaring (Booking slots)", value: 7 },
        { label: "Store Locator / Maps", value: 3 },
        { label: "Delivery Scheduling", value: 4 },
      ],
    },
    {
        id: "security",
        label: "Security",
        type: "fixed_days",
        options: [
          { label: "SSL & Data Encryption", value: 3 },
          { label: "Two Factor Authentication", value: 4 },
        ],
    }
  ],
};

export async function GET() {
  await connect();
  try {
    let config = await CalculatorConfig.findOne();
    if (!config) {
      config = await CalculatorConfig.create(INITIAL_CONFIG);
    }
    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ... imports
import CalculatorConfigHistory from "@/models/CalculatorConfigHistory";

export async function PUT(request) {
  await connect();
  try {
    const body = await request.json();
    
    // Remove _id to prevent "Mod on _id not allowed" error
    delete body._id;
    
    const skipHistory = body.skipHistory;
    delete body.skipHistory; // Don't save this flag to DB

    // Generate Config Hash for Bucket Tracking
    // Ensure strict determinism by stripping internal fields (_id, etc)
    const hashData = {
        rate: body.developerDayRate,
        rateInr: body.developerDayRateINR,
        pm: body.pmPercentage,
        questions: body.questions?.map(q => ({ 
            id: q.id, 
            type: (typeof q.type === 'object' ? q.type.type : q.type), // Handle object wrapper vs raw string
            options: q.options?.map(o => ({ label: o.label, value: o.value })) // Clean options
        }))
    };
    const configHash = crypto.createHash('sha256').update(JSON.stringify(hashData)).digest('hex');
    body.configHash = configHash;

    // Use findOneAndUpdate with upsert to ensure fields are saved even if schema cached instance had issues
    const config = await CalculatorConfig.findOneAndUpdate(
        {}, // find the first/only document
        { $set: body }, // update fields
        { new: true, upsert: true, setDefaultsOnInsert: true } // return new, create if missing
    );
    
    // Create History Entry from the NEW configuration
    // (User wants to see a log of what they just SET)
    // SKIP if this is a Restore operation (skipHistory: true)
    if (config && !skipHistory) {
        // Enforce UNIQUENESS: If this exact configuration (Hash) already exists in history, DO NOT add it again.
        // This transforms the log into a "Unique Versions List" rather than an "Activity Log".
        const existingEntry = await CalculatorConfigHistory.findOne({ 
            "configSnapshot.configHash": config.configHash 
        });
        
        if (!existingEntry) {
            await CalculatorConfigHistory.create({
                configSnapshot: config.toObject(), // Includes the new configHash
                changeSummary: `Created on ${new Date().toLocaleString()}`
            });
        } else {
             // Optional: Update the existing entry's timestamp (updatedAt) to bring it to top?
             // User said "Not activity log", so keeping it as is (old timestamp) is fine, 
             // OR touching it to show it's relevant.
             // Given "History Logs" is sorted by createdAt, touching updatedAt won't help unless I sort by updatedAt.
             // I'll leave it. The list will essentially be "First time this Config was observed".
        }
    }
    
    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
