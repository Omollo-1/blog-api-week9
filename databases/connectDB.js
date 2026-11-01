const mongoose = require('mongoose');

const connectDB = async () => {
    try {
    await mongoose.connect(process.env.MONGOD_URL);
    console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.log("DB Connection Failed");
        process.exit(1);
    }
};

module.exports = connectDB;
