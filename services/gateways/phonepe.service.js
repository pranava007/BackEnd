export const phonepePayment = async (amount) => {

  return {
    type: "redirect",
    url: `upi://pay?pa=merchant@upi&am=${amount}`
  };
};