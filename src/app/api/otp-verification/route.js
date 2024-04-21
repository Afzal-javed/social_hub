import OTP from "@/model/OTPModel/otpSchema";
import connection from "@/utils/DB/connection"
import { NextResponse } from "next/server";


export const POST = async (req, res) => {
    await connection();
    try {
        const body = await req.json();
        const { userOtp, id } = body;
        const verifyOtp = await OTP.findById({ _id: id })
        let currTime = new Date().getTime();
        if (verifyOtp.expireOTP - currTime >= 0) {
            if (verifyOtp.otp == userOtp) {
                return NextResponse.json({ msg: "OTP verified successfully" }, { status: 200 })
            } else {
                return NextResponse.json({ msg: "Invalid OTP" }, { status: 401 })
            }
        } else {
            return NextResponse.json({ msg: "Your OTP has Been Expire" }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ msg: "Internal Server Erron" }, { status: 500 })
    }
}