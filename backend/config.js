const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
        console.error(" MongoDB Connection Error: MONGO_URI is not defined in .env file");
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected `);
    } catch (error) {
        console.error(` MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = { connectDB,
    JWT_SECRET: process.env.JWT_SECRET
};


