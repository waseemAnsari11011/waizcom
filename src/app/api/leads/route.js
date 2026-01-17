import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/models/Lead";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const lead = await Lead.create(body);
        return NextResponse.json(lead, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create lead", details: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        await connectDB();
        const leads = await Lead.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 });
        return NextResponse.json(leads, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch leads", details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { error: "No IDs provided for deletion" },
                { status: 400 }
            );
        }

        const result = await Lead.updateMany(
            { _id: { $in: ids } },
            { $set: { isDeleted: true, deletedAt: new Date() } }
        );

        return NextResponse.json({ 
            message: "Leads deleted successfully", 
            deletedCount: result.modifiedCount 
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete leads", details: error.message },
            { status: 500 }
        );
    }
}
