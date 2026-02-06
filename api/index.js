const express = require("express");
const app = express();
const cors = require('cors'); // Use standard require for CommonJS
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.warn("MONGODB_URI is not defined");
            return;
        }
        await mongoose.connect(uri);
        isConnected = true;
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

app.get("/api", async (req, res) => {
    await connectDB();
    res.json({ message: "Hello from Express on Vercel!" });
});

app.get("/api/test", async (req, res) => {
    await connectDB();
    res.json({ message: "Test route working", dbStatus: isConnected ? "Connected" : "Disconnected" });
});

// For local development
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
}

module.exports = app;
