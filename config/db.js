import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri);
        console.log("Db connected");
    } catch (error) {
        console.log(error.message);
        throw error
    }
}

export default connectDb;