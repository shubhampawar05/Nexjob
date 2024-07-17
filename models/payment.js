const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionID:{
      type:String
    },
    transactionType:{
      type:String,
      enum: ["credit", "debet", "wallet"],
      default: "credit"

    },
    currency: {
      type: String,
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

const paymentModel = mongoose.model("payment", paymentSchema);
module.exports = paymentModel;
