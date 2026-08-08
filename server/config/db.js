const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
    try {
        // Deployment Config: Skip local DNS override in production (e.g., Render containers) to avoid network resolution conflicts
        if (process.env.NODE_ENV !== "production") {
            try {
                dns.setServers(["8.8.8.8", "8.8.4.4"]);
            } catch (dnsErr) {
                console.warn("DNS server override skipped:", dnsErr.message);
            }
        }

        // Deployment Config: Connects to MongoDB Atlas using MONGO_URI environment variable defined on Render
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;