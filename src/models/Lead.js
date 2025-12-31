import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        company: {
            type: String,
        },
        message: {
            type: String,
            required: true,
        },
        callStatus: {
            type: String,
            default: "Select",
        },
        leadStatus: {
            type: String,
            default: "Select",
        },
        followUpDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
