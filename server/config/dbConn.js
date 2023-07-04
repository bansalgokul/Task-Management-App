const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (er) {
        console.log("error", er)
    }
}

module.exports = connectDB;