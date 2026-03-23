import Product from "../models/Product.model.js";
import Order from "../models/Order.model.js";
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