import mongoose from "mongoose";

const CalculatorConfigSchema = new mongoose.Schema(
  {
    developerDayRate: {
      type: Number,
      default: 450,
    },
    designDayRate: {
      type: Number,
      default: 450,
    },
    developerDayRateINR: {
      type: Number,
      default: 15000,
    },
    designDayRateINR: {
      type: Number,
      default: 15000,
    },
    pmPercentage: {
      type: Number,
      default: 50, // This seems to be fixed cost in the prompt, but I will name it generically to be flexible
    },
    questions: [
      {
        id: String, // e.g., "size", "ui_level"
        label: String, // e.g., "How big is your app?"
        type: {
          type: String,
          enum: ["base_days", "percentage", "fixed_days"],
          default: "fixed_days",
        },
        options: [
          {
            label: String, // e.g., "Small", "MVP"
            value: Number, // e.g., 10, 30
          },
        ],
      },
    ],
    configHash: {
        type: String,
    },
  },
  { timestamps: true }
);

// Prevent "OverwriteModelError" or stale schema in dev mode
if (mongoose.models.CalculatorConfig) {
  delete mongoose.models.CalculatorConfig;
}

export default mongoose.model("CalculatorConfig", CalculatorConfigSchema);
