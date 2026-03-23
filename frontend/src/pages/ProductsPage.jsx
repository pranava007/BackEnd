import { useState, useEffect } from "react";
import { getProducts, createOrder, verifyPayment } from "../services/api";
import { ShoppingCart, Loader2, CheckCircle2 } from "lucide-react";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await getProducts();
            setProducts(data);
        } catch (err) {
            console.error("Failed to fetch products", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async (product) => {
        setPurchasing(product._id);
        try {
            const { data } = await createOrder([{ productId: product._id, quantity: 1 }], "customer_123");
            if (data.success) {
                if (data.payment.type === "razorpay") {
                    const options = {
                        key: data.payment.key,
                        amount: product.price * 100,
                        currency: "INR",
                        name: "Virtua Pay",
                        description: `Purchase ${product.name}`,
                        order_id: data.payment.orderId,
                        handler: async (response) => {
                            try {
                                await verifyPayment({
                                    orderId: data.orderId,
                                    paymentId: response.razorpay_payment_id,
                                    status: "paid"
                                });
                                alert("Payment Successful! Order ID: " + data.orderId);
                                window.location.href = "/history";
                            } catch (err) {
                                alert("Verification failed: " + err.message);
                            }
                        },
                        prefill: {
                            name: "Customer Name",
                            email: "customer@example.com",
                            contact: "9999999999"
                        },
                        theme: {
                            color: "#4f46e5"
                        }
                    };
                    const rzp1 = new window.Razorpay(options);
                    rzp1.open();
                } else if (data.payment.type === "payu") {
                    const form = document.createElement("form");
                    form.method = "POST";
                    form.action = data.payment.url;

                    Object.entries(data.payment.params).forEach(([key, value]) => {
                        const input = document.createElement("input");
                        input.type = "hidden";
                        input.name = key;
                        input.value = value;
                        form.appendChild(input);
                    });

                    document.body.appendChild(form);
                    form.submit();
                } else if (data.payment.type === "redirect") {
                    window.location.href = data.payment.url;
                }
            }
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.message;
            alert("Purchase failed: " + errorMsg);
        } finally {
            setPurchasing(null);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin w-8 h-8 text-indigo-500" /></div>;

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold">Featured Products</h1>
                <p className="text-gray-400 mt-2">Premium gadgets for your digital lifestyle.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all group">
                        <div className="h-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                            <span className="text-4xl">📱</span>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold group-hover:text-indigo-400 transition-colors">{product.name}</h3>
                                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{product.description}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
                                <button
                                    onClick={() => handlePurchase(product)}
                                    disabled={purchasing === product._id}
                                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all active:scale-95"
                                >
                                    {purchasing === product._id ? <Loader2 className="animate-spin w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
