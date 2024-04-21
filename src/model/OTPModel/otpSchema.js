import mongoose from "mongoose";


export const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: Number,
    expireOTP: Number
}, { timestamps: true })

const OTP = mongoose.models.OTP || mongoose.model('OTP', otpSchema)
export default OTP;