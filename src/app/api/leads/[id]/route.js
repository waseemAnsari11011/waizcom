import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/models/Lead";

export const dynamic = "force-dynamic";

export async function PUT(req, props) {
    const params = await props.params;
    try {
        await connectDB();
        console.log("PUT request params:", params);
        const { id } = params;
        console.log("Updating lead with ID:", id);
        const body = await req.json();
        console.log("Update body:", body);
        console.log("Model Schema Paths:", Object.keys(Lead.schema.paths));

        const updatedLead = await Lead.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        console.log("Updated lead result:", updatedLead);

        if (!updatedLead) {
            console.log("Lead not found in DB");
            return NextResponse.json({ error: "Lead not found" }, { status: 404 });
        }

        return NextResponse.json(updatedLead, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update lead", details: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req, props) {
    const params = await props.params;
    try {
        await connectDB();
        const { id } = params;
        const lead = await Lead.findOne({ _id: id, isDeleted: { $ne: true } });

        if (!lead) {
            return NextResponse.json({ error: "Lead not found" }, { status: 404 });
        }

        return NextResponse.json(lead, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch lead", details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req, props) {
    const params = await props.params;
    try {
        await connectDB();
        const { id } = params;
        
        const deletedLead = await Lead.findByIdAndUpdate(
            id,
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        );

        if (!deletedLead) {
            return NextResponse.json({ error: "Lead not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Lead soft deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete lead", details: error.message },
            { status: 500 }
        );
    }
}
