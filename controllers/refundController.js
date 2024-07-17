const paymentModel = require("./../models/payment");
const { v4: uuidv4 } = require("uuid");
const refundModel = require("./../models/refund");

const paymentRefund = async (req, res) => {
  try {
    const userId = req.user.userId;
    const transactionID = req.params.payment_id;

    const payment = await paymentModel.findOne({ transactionID });
    if (!payment) {
      return res.status(404).json({
        MIDIMessageEvent: "Payment not found",
      });
    }
    console.log(payment);
    if (payment.status !== "completed") {
      return res.status(500).json({
        msg: "Your payment is not completed, you are not getting any refund",
      });
    }

    const refundId = uuidv4();
    
    const refundDetails = new refundModel({
        user_id:userId,
        transactionID,
        refundId,
        amount:payment.amount,
        status: "completed"
    })

    await refundDetails.save();
    payment.status = "refunded"
    await payment.save();

    return res.status(200).json({
        msg: "refund completed successfully",
      });

  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
};
const refundController = {
  paymentRefund,
};

module.exports = refundController;
