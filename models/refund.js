const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    transactionID: {
      type: String,
      required: true,
    },
    refundId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const refundModel = mongoose.model("refund", refundSchema);
module.exports = refundModel;
