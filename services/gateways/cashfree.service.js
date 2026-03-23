import axios from "axios";

export const cashfreePayment = async (amount, orderId) => {

  const res = await axios.post(
    "https://api.cashfree.com/pg/orders",
    {
      order_amount: amount,
      order_currency: "INR",
      order_id: orderId
    },
    {
      headers: {
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET
      }
    }
  );

  return {
    type: "redirect",
    url: res.data.payment_link
  };
};