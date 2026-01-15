import mongoose from "mongoose";

const CalculatorBookingSchema = new mongoose.Schema(
  {
    dayRate: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
    },
    // Optional: Capture configured value of the calculator when booking happened?
    totalCost: {
      type: Number,
    },
    configHash: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.CalculatorBooking ||
  mongoose.model("CalculatorBooking", CalculatorBookingSchema);
