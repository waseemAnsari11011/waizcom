import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/models/Lead";

export async function PUT(req, props) {
    const params = await props.params;
    try {
        await connectDB();
        console.log("PUT request params:", params);
        const { id } = params;
        console.log("Updating lead with ID:", id);
        const body = await req.json();
        console.log("Update body:", body);

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
