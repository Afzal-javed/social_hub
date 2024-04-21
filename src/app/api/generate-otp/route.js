import OTP from "@/model/OTPModel/otpSchema";
import User from "@/model/userSchema";
import connection from "@/utils/DB/connection";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function otpSender(email) {
    let otp = Math.floor((Math.random() * 1000000) + 1)
    sendOTPEmail(email, otp);
    let genOTP = new OTP({
        email,
        otp: otp,
        expireOTP: new Date().getTime() + 300 * 1000
    })
    const data = await genOTP.save();
    return NextResponse.json({ data: data._id }, { status: 200 })
}

export async function POST(req, res) {
    await connection();
    try {
        const body = await req.json();
        const { email, resetPassword } = body;
        const userExist = await User.findOne({ email });
        if (resetPassword) {
            if (!userExist) {
                return NextResponse.json({ msg: "User does not exist" }, { status: 404 })
            } else {
                return otpSender(email)
            }
        } else {
            if (userExist) {
                return NextResponse.json({ msg: "User already exist" }, { status: 400 })
            } else {
                return otpSender(email);
            }
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal server error" }, { status: 500 })
    }
}

const sendOTPEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_MY_EMAIL,
                pass: process.env.NEXT_PUBLIC_APP_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.NEXT_PUBLIC_MY_EMAIL,
            to: email,
            subject: 'OTP for Verification',
            text: `Your OTP is ${otp}. Please use it to verify your account.`,
        };
        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};