
import mongoose from "mongoose";

const connection_url = process.env.NEXT_PUBLIC_MONGO_URL
export default async () => {
    try {
        await mongoose.connect(connection_url);
        console.log("DB connected")

    } catch (error) {
        console.log("error in data base connection ", error)
    }
}