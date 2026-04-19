import dotenv from "dotenv";
dotenv.config();

export const shopifyConfig = {
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecret: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SHOPIFY_SCOPES || "read_orders,write_orders,read_products",
    hostName: process.env.SHOPIFY_HOST_NAME,
    apiVersion: "2024-01",
    isEmbeddedApp: true,
};
