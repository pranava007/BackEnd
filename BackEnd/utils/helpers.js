/**
 * General Helper Functions
 */
export const formatCurrency = (amount, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency,
    }).format(amount);
};

export const generateRandomString = (length = 10) => {
    return Math.random().toString(36).substring(2, 2 + length);
};
