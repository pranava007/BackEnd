import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import app from "./app.js";

// ✅ DB connect
connectDB();

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});