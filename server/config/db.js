const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
    try {
        // Deployment Config: In production (Render), process.env.MONGO_URI must be provided.
        // For local development, fall back to local MongoDB URI if MONGO_URI is not set.
        const dbURI = process.env.MONGO_URI || (process.env.NODE_ENV !== "production" ? "mongodb://127.0.0.1:27017/literaryfest_db" : null);

        if (!dbURI) {
            throw new Error("MONGO_URI environment variable is missing. Please add MONGO_URI to your Render environment variables.");
        }

        // Deployment Config: Skip local DNS override in production containers (e.g., Render) to avoid resolution conflicts
        if (process.env.NODE_ENV !== "production") {
            try {
                dns.setServers(["8.8.8.8", "8.8.4.4"]);
            } catch (dnsErr) {
                console.warn("DNS server override skipped:", dnsErr.message);
            }
        }

        const conn = await mongoose.connect(dbURI);

        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;