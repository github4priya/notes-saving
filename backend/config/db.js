const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://priyagupta8000:zsyJrdkhUG31NMnM@cluster0.oi2hk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connection successfull`)
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connectDB;