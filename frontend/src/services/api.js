import axios from "axios";

const API_URL = "http://localhost:5000/api/payment";

const api = axios.create({
    baseURL: API_URL
});

export const getProducts = () => api.get("/products");
export const getOrders = () => api.get("/orders");
export const getGatewayConfig = () => api.get("/config");
export const updateGatewayConfig = (activeGateway) => api.patch("/config", { activeGateway });
export const createOrder = (items, customerId) => api.post("/create-order", { items, customerId });
export const verifyPayment = (paymentData) => api.post("/verify-payment", paymentData);

export default api;
