import mongoose from "mongoose";

const CalculatorLeadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: { // Often useful to have, even if not strictly in the initial prompt "Enter your email" - we can make it optional
        type: String, 
    },
    answers: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    estimatedCost: {
      type: Number,
    },
    estimatedDays: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.CalculatorLead ||
  mongoose.model("CalculatorLead", CalculatorLeadSchema);
