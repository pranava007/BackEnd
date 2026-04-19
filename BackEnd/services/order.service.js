import Order from "../models/Order.model.js";

/**
 * Business logic for order management
 */
export const updateOrderStatus = async (orderId, status) => {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};

export const getOrderById = async (orderId) => {
    return await Order.findById(orderId).populate("customerId", "username email");
};
