import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.model.js";
import GatewayConfig from "./models/GatewayConfig.model.js";
import connectDB from "./config/db.js";

dotenv.config();

const products = [
    {
        name: "iPhone 15 Pro",
        description: "Titanium design, A17 Pro chip, customizable Action button.",
        price: 134900,
        currency: "INR",
        stock: 10
    },
    {
        name: "MacBook Air M3",
        description: "Stunningly thin and fast so you can work, play or create anywhere.",
        price: 114900,
        currency: "INR",
        stock: 5
    },
    {
        name: "AirPods Pro (2nd Gen)",
        description: "Up to 2x more Active Noise Cancellation than the previous generation.",
        price: 24900,
        currency: "INR",
        stock: 20
    }
];

const seedDB = async () => {
    try {
        await connectDB();
        await Product.deleteMany({});
        await Product.insertMany(products);

        await GatewayConfig.deleteMany({});
        await GatewayConfig.create({ activeGateway: "razorpay" });

        console.log("Database Seeded! 🌱");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
