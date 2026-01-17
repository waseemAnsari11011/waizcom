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
        country: {
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
        followupCount: {
            type: Number,
            default: 0,
        },
        followupDescription: {
            type: String,
            default: "",
        },
        source: {
            type: String,
            default: "Website", // "App Cost Calculator", "Contact Form", "Footer", etc.
        },
        calculatorData: {
            type: Object, // Stores { dayRate, currency, totalCost, appSize, etc. }
            default: null,
        },
        configHash: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
