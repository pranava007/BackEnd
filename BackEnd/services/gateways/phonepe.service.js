import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export const phonepePayment = async (amount, orderId) => {
  const merchantId = process.env.PHONEPE_MERCHANT_ID;
  const saltKey = process.env.PHONEPE_SALT_KEY;
  const saltIndex = process.env.PHONEPE_SALT_INDEX || "1";

  const payload = {
    merchantId,
    merchantTransactionId: String(orderId),
    merchantUserId: "user_123",
    amount: amount * 100, // Amount in paise
    redirectUrl: `http://localhost:5000/api/payment/verify-payment?orderId=${orderId}`,
    redirectMode: "POST",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
  const base64EncodedPayload = bufferObj.toString("base64");
  const xVerifyString = base64EncodedPayload + "/pg/v1/pay" + saltKey;
  const checksum = crypto.createHash("sha256").update(xVerifyString).digest("hex") + "###" + saltIndex;

  console.log("🔍 PhonePe Merchant ID:", merchantId);
  console.log("🔍 PhonePe X-VERIFY generated (first 10 chars):", checksum.substring(0, 10));

  const options = {
    method: "post",
    url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
    },
    data: {
      request: base64EncodedPayload,
    },
  };

  try {
    const response = await axios.request(options);
    return {
      type: "redirect",
      url: response.data.data.instrumentResponse.redirectInfo.url,
    };
  } catch (error) {
    console.error("PhonePe Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "PhonePe payment creation failed");
  }
};