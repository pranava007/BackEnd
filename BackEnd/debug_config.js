import mongoose from "mongoose";
import dotenv from "dotenv";
import GatewayConfig from "./models/GatewayConfig.model.js";
import connectDB from "./config/db.js";

dotenv.config();

const checkConfig = async () => {
    try {
        await connectDB();
        const configs = await GatewayConfig.find();
        console.log("Total Configs found:", configs.length);
        configs.forEach((c, i) => {
            console.log(`Config ${i + 1}:`, c);
        });
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkConfig();
