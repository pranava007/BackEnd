import crypto from "crypto";
import { shopifyConfig } from "../config/shopify.js";

/**
 * Middleware to verify Shopify webhook HMAC signature
 */
export const verifyWebhook = (req, res, next) => {
    const hmac = req.headers["x-shopify-hmac-sha256"];
    const body = JSON.stringify(req.body);

    const generatedHash = crypto
        .createHmac("sha256", shopifyConfig.apiSecret)
        .update(body, "utf8")
        .digest("base64");

    if (generatedHash === hmac) {
        next();
    } else {
        res.status(401).send("Webhook verification failed");
    }
};
