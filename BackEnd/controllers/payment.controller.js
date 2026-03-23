import Product from "../models/Product.model.js";
import Order from "../models/Order.model.js";
import GatewayConfig from "../models/GatewayConfig.model.js";
import { routePayment } from "../services/gatewayRouter.service.js";

export const createOrder = async (req, res) => {

  try {

    const { items, customerId } = req.body;

    let total = 0;
    let orderItems = [];

    // ✅ Dynamic pricing
    for (let item of items) {

      const product = await Product.findById(item.productId);

      if (!product) throw new Error("Product not found");

      const price = product.price * item.quantity;

      total += price;

      orderItems.push({
        productId: item.productId,
        name: product.name,
        quantity: item.quantity,
        price: product.price
      });
    }

    // ✅ Create order in DB
    const order = await Order.create({
      customerId,
      items: orderItems,
      totalAmount: total,
      status: "pending"
    });

    // ✅ Dynamic gateway routing
    const payment = await routePayment(total, order._id);

    res.json({
      success: true,
      orderId: order._id,
      payment
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGatewayConfig = async (req, res) => {
  try {
    let config = await GatewayConfig.findOne();
    if (!config) {
      config = await GatewayConfig.create({ activeGateway: "razorpay" });
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateGatewayConfig = async (req, res) => {
  try {
    const { activeGateway } = req.body;
    let config = await GatewayConfig.findOne();
    if (config) {
      config.activeGateway = activeGateway;
      await config.save();
    } else {
      config = await GatewayConfig.create({ activeGateway });
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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