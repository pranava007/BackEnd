import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const razorpayPayment = async (amount) => {

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR"
  });

  return {
    type: "razorpay",
    orderId: order.id,
    key: process.env.RAZORPAY_KEY_ID
  };
};