import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export const payuPayment = async (amount, orderId) => {
    const key = process.env.PAYU_MERCHANT_KEY;
    const salt = process.env.PAYU_MERCHANT_SALT;
    const txnid = String(orderId);
    const productinfo = "OrderPayment";
    const firstname = "User";
    const email = "test@example.com";
    const formattedAmount = parseFloat(amount).toFixed(2);

    // Hash sequence: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt
    const hashString = `${key}|${txnid}|${formattedAmount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    return {
        type: "payu",
        url: "https://test.payu.in/_payment",
        params: {
            key,
            txnid,
            amount: formattedAmount,
            productinfo,
            firstname,
            email,
            phone: "9999999999",
            surl: "http://localhost:5000/api/payment/verify-payment", // Success URL
            furl: "http://localhost:5000/api/payment/verify-payment", // Failure URL
            hash
        }
    };
};
