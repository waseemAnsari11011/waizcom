import mongoose from "mongoose";

const CalculatorConfigHistorySchema = new mongoose.Schema(
  {
    configSnapshot: {
      type: Object,
      required: true,
    },
    // Optional: track who made the change if session info available
    updatedBy: {
        type: String, 
        default: "Admin"
    },
    changeSummary: String, // e.g. "Rate Change"
  },
  { timestamps: true }
);

// Prevent "OverwriteModelError" or stale schema in dev mode
if (mongoose.models.CalculatorConfigHistory) {
  delete mongoose.models.CalculatorConfigHistory;
}

export default mongoose.model("CalculatorConfigHistory", CalculatorConfigHistorySchema);
