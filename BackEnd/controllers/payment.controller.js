import Order from "../models/Order.model.js";

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, status, txnid, mihpayid, transactionId, code } = { ...req.query, ...req.body };

    const finalOrderId = orderId || txnid || transactionId;
    const finalPaymentId = paymentId || mihpayid || transactionId;

    let finalStatus = "paid";
    if (status === "failure" || status === "failed" || code === "PAYMENT_ERROR") {
      finalStatus = "failed";
    } else if (status === "success" || status === "paid" || code === "PAYMENT_SUCCESS") {
      finalStatus = "paid";
    }

    if (!finalOrderId) throw new Error("Order ID missing");

    const order = await Order.findById(finalOrderId);
    if (!order) throw new Error("Order not found");

    order.paymentId = finalPaymentId;
    order.status = finalStatus;
    await order.save();

    // If it's a PayU redirect, we might want to redirect the user to a success page
    if (txnid) {
      return res.redirect("http://localhost:5173/history");
    }

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};