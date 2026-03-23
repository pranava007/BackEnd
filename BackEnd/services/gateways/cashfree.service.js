import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const cashfreePayment = async (amount, orderId) => {

  const isProduction = process.env.CASHFREE_ENV === "PROD";
  const baseUrl = isProduction
    ? "https://api.cashfree.com/pg/orders"
    : "https://sandbox.cashfree.com/pg/orders";

  try {
    console.log("🔍 Checking Env Vars... APP_ID length:", process.env.CASHFREE_APP_ID?.length);
    console.log("🔍 App ID prefix:", process.env.CASHFREE_APP_ID?.substring(0, 5));

    const headers = {
      "x-client-id": process.env.CASHFREE_APP_ID?.trim(),
      "x-client-secret": process.env.CASHFREE_SECRET?.trim(),
      "x-api-version": "2023-08-01"
    };

    console.log("🔍 Cashfree Request Headers (Client ID):", headers["x-client-id"]);
    console.log("🔍 Cashfree Base URL:", baseUrl);

    const res = await axios.post(
      baseUrl,
      {
        order_amount: amount,
        order_currency: "INR",
        order_id: String(orderId),
        customer_details: {
          customer_id: "customer_123",
          customer_phone: "9999999999"
        }
      },
      { headers }
    );

    return {
      type: "redirect",
      url: res.data.payment_link || (isProduction
        ? `https://payments.cashfree.com/pg/view/${res.data.payment_session_id}`
        : `https://payments-test.cashfree.com/pg/view/${res.data.payment_session_id}`)
    };
  } catch (err) {
    console.error("❌ Cashfree API Error Details:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || err.message);
  }
};