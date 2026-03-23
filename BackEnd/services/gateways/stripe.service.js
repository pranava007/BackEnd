export const stripePayment = async (amount) => {
    return {
        type: "redirect",
        url: "https://stripe.com/placeholder-pay",
        message: "Stripe integration placeholder",
        amount
    };
};
