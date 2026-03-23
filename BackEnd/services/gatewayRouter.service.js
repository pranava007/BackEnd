import GatewayConfig from "../models/GatewayConfig.model.js";

import { razorpayPayment } from "./gateways/razorpay.service.js";
import { cashfreePayment } from "./gateways/cashfree.service.js";
import { phonepePayment } from "./gateways/phonepe.service.js";
import { payuPayment } from "./gateways/payu.service.js";
import { stripePayment } from "./gateways/stripe.service.js";

export const routePayment = async (amount, orderId) => {

  const config = await GatewayConfig.findOne();

  if (!config) {
    throw new Error("Payment Gateway Configuration not found in database. Please run seed.js or set a gateway in settings.");
  }

  switch (config.activeGateway) {

    case "razorpay":
      return await razorpayPayment(amount, orderId);

    case "cashfree":
      return await cashfreePayment(amount, orderId);

    case "phonepe":
      return await phonepePayment(amount, orderId);

    case "payu":
      return await payuPayment(amount, orderId);

    case "stripe":
      return await stripePayment(amount, orderId);

    default:
      throw new Error("No gateway selected");
  }
};