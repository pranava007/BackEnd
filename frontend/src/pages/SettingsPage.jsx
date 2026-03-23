import { useState, useEffect } from "react";
import { getGatewayConfig, updateGatewayConfig } from "../services/api";
import { ShieldCheck, Zap, CreditCard, Save, Loader2 } from "lucide-react";

const SettingsPage = () => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const { data } = await getGatewayConfig();
            setConfig(data);
        } catch (err) {
            console.error("Failed to fetch config", err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (gateway) => {
        if (saving) return;
        setSaving(true);
        try {
            const { data } = await updateGatewayConfig(gateway);
            setConfig(data);
        } catch (err) {
            alert("Failed to update config");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin w-8 h-8 text-indigo-500" /></div>;

    const gateways = [
        { id: "razorpay", name: "Razorpay", description: "Accept payments via credit/debit cards, UPI, and wallets.", icon: <ShieldCheck className="w-6 h-6 text-indigo-500" /> },
        { id: "cashfree", name: "Cashfree", description: "Next-gen payment gateway for high growth businesses.", icon: <Zap className="w-6 h-6 text-amber-500" /> },
        { id: "payu", name: "PayU", description: "Leading payment service provider in India.", icon: <CreditCard className="w-6 h-6 text-green-500" /> },
        { id: "phonepe", name: "PhonePe", description: "Safe and secure payments with PhonePe.", icon: <Zap className="w-6 h-6 text-purple-500" /> }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold">Payments Settings</h1>
                <p className="text-gray-400 mt-2">Manage your active payment gateways and configurations.</p>
            </header>

            <div className="space-y-4">
                {gateways.map((g) => (
                    <div
                        key={g.id}
                        onClick={() => handleToggle(g.id)}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${config?.activeGateway === g.id
                            ? "bg-indigo-500/5 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                            : "bg-gray-900 border-gray-800 hover:border-gray-700"
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${config?.activeGateway === g.id ? 'bg-indigo-500/20' : 'bg-gray-800'}`}>
                                    {g.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{g.name}</h3>
                                    <p className="text-gray-400 text-sm">{g.description}</p>
                                </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${config?.activeGateway === g.id ? "border-indigo-500 bg-indigo-500" : "border-gray-700"
                                }`}>
                                {config?.activeGateway === g.id && <div className="w-2 h-2 rounded-full bg-white transition-all scale-100" />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {saving && (
                <div className="flex items-center gap-2 text-indigo-400 justify-center animate-pulse">
                    <Save className="w-4 h-4" /> Updating settings...
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
