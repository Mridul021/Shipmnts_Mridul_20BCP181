import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log('connected to databse'))
        .catch((e) => console.log(e));
}