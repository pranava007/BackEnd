# Virtua Pay - Backend

Express.js backend for Virtua_PAY_ALTERNATIVE.

## Setup

1.  Navigate to the `BackEnd` directory:
    ```bash
    cd BackEnd
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables in `.env`:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/virtua-pay
    RAZORPAY_KEY_ID=your_key_id
    RAZORPAY_KEY_SECRET=your_key_secret
    CASHFREE_APP_ID=your_app_id
    CASHFREE_SECRET=your_secret
    ```
4.  Seed initial products (optional):
    ```bash
    node seed.js
    ```
5.  Start the server:
    ```bash
    npm run dev
    ```

## API Endpoints

- `GET /api/payment/products`: Fetch all active products.
- `POST /api/payment/create-order`: Create a new purchase order.
- `GET /api/payment/orders`: Fetch purchase history.
- `GET /api/payment/config`: Get current gateway configuration.
- `PATCH /api/payment/config`: Update the active payment gateway.
