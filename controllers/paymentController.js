const paymentModel = require("./../models/payment");
const { v4: uuidv4 } = require("uuid");

const createPayment = async (req, res) => {
  try {
    const { amount, currency ,transactionType} = req.body;

    if(parseInt(amount)<=0){
      return res.status(400).json({
        message: "amount must be greater than 0",
      });
    }

    if (!amount && !currency) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    const payment = new paymentModel({
      user_id: req.user.userId,
      transactionID: uuidv4(),
      amount,
      currency,
      transactionType
    });
    console.log(payment);

    await payment.save();
    res.status(201).json({
      msg:"transaction Created Sucssefully",
      transactionID:payment.transactionID,
      status:payment.status,
    });
    console.log("payment created");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

const processPayment = async (req, res) => {
  try {
    const transactionID  = req.params.payment_id;
    const userId = req.user.userId;
    console.log(transactionID);

    
    const payment = await paymentModel.findOne({
      transactionID,
      user_id: userId,
    });


  
    if (!payment)
      return res.status(404).json({
        msg: "Payment not found",
      });

      if(payment.status === "completed" ){
        return res.status(404).json({
          msg: "Payment is already done",
        });
      }
    payment.status = "completed";
   
    await payment.save();
    return res.status(200).json({
      msg: "Transaction completed successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server error",
    });
  }
};

const getPaymentStatus = async (req, res) => {
  try {
    const  transactionID  = req.params.payment_id;
    const payment = await paymentModel.findOne({transactionID});
    if (!payment) return res.status(404).json({ error: "Payment not found" });

    res.status(200).json({
      status:payment.status
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getallPayment =async (req, res)=>{
  try {
    const userId = req.user.userId;
    // const all = await paymentModel.find({})
    // console.log(all);
    // console.log(userId);
    const allpayment = await paymentModel.find({user_id:userId});
    if (!allpayment){
      return res.status(404).json({ 
        error: "Payment not found" 
      });
    } 

    res.status(200).json(allpayment);
  } catch (err) {
    res.status(500).json({ 
      error: "Server error" 
    });
  }
}



const paymentController = {
  createPayment,
  processPayment,
  getPaymentStatus,
  getallPayment,

};

module.exports = paymentController;
