import axios from "axios";
import { shopifyConfig } from "../config/shopify.js";

/**
 * Service to handle Shopify API interactions
 */
export const fetchShopifyOrders = async (shop, accessToken) => {
    try {
        const response = await axios.get(`https://${shop}/admin/api/${shopifyConfig.apiVersion}/orders.json`, {
            headers: {
                "X-Shopify-Access-Token": accessToken,
            },
        });
        return response.data.orders;
    } catch (error) {
        console.error("Shopify API Error:", error.message);
        throw error;
    }
};

export const fetchShopifyProducts = async (shop, accessToken) => {
    try {
        const response = await axios.get(`https://${shop}/admin/api/${shopifyConfig.apiVersion}/products.json`, {
            headers: {
                "X-Shopify-Access-Token": accessToken,
            },
        });
        return response.data.products;
    } catch (error) {
        console.error("Shopify API Error:", error.message);
        throw error;
    }
};
