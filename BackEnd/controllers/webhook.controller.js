import { shopifyConfig } from "../config/shopify.js";

export const handleShopifyWebhook = async (req, res) => {
    try {
        const topic = req.headers["x-shopify-topic"];
        const shop = req.headers["x-shopify-shop-domain"];
        const payload = req.body;

        console.log(`Received Shopify Webhook: ${topic} from ${shop}`);

        // Logic to handle specific topics
        switch (topic) {
            case "orders/create":
                // Handle order creation
                break;
            case "app/uninstalled":
                // Handle app uninstallation
                break;
            default:
                console.log(`Unhandled webhook topic: ${topic}`);
        }

        res.status(200).send("Webhook received");
    } catch (error) {
        console.error("Webhook Error:", error.message);
        res.status(500).json({ error: "Webhook handling failed" });
    }
};
