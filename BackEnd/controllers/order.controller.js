import Product from "../models/Product.model.js";
import Order from "../models/Order.model.js";
import ExternalServer from "../models/ExternalServer.model.js";
import { routePayment } from "../services/gatewayRouter.service.js";
import axios from "axios";

export const createOrder = async (req, res) => {
  try {
    const { items, customerId } = req.body;

    let total = 0;
    let orderItems = [];

    // ✅ Dynamic pricing
    const extConfig = await ExternalServer.findOne();
    const useExternal = extConfig && extConfig.isActive;

    for (let item of items) {
      let product;
      
      if (useExternal) {
        try {
          const headers = extConfig.apiKey ? { Authorization: `Bearer ${extConfig.apiKey}` } : {};
          const response = await axios.get(`${extConfig.baseUrl}/api/products/${item.productId}`, { headers });
          const extProd = response.data;
          product = {
            _id: extProd._id,
            name: extProd.productName,
            price: extProd.amt
          };
        } catch (error) {
          throw new Error(`Failed to verify external product: ${error.message}`);
        }
      } else {
        product = await Product.findById(item.productId);
      }

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
    const extConfig = await ExternalServer.findOne();
    
    if (extConfig && extConfig.isActive) {
      try {
        const headers = extConfig.apiKey ? { Authorization: `Bearer ${extConfig.apiKey}` } : {};
        const response = await axios.get(`${extConfig.baseUrl}/api/products`, {
            headers,
            timeout: 5000 
        });
        
        const mappedProducts = response.data.map(p => ({
            _id: p._id,
            name: p.productName,
            description: p.description,
            price: p.amt,
            imageUrl: p.imageUrl,
            isExternal: true
        }));
        
        return res.json(mappedProducts);
      } catch (error) {
        return res.status(502).json({ 
            error: `External Product API is unreachable: ${error.message}. Please check your configuration in Settings.` 
        });
      }
    }

    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { customerId: req.user._id };
    const orders = await Order.find(query)
      .populate("customerId", "username email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
