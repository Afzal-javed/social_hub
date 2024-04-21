import User from "@/model/userSchema";
import connection from "@/utils/DB/connection"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'

export const POST = async (req, res) => {
    await connection();
    try {
        const body = await req.json();
        const { email, password } = body;
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ msg: "User does not exist" }, { status: 404 })
        } else {
            const matchPassword = await bcrypt.compare(password, user.password)
            if (!matchPassword) {
                return NextResponse.json({ msg: "Invalid credential" }, { status: 400 })
            } else {
                const payload = {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    location: user.location,
                    occupation: user.occupation,
                    profile: user.profile
                }
                const JWT = process.env.NEXT_PUBLIC_JWT_KEY

                const token = jwt.sign(payload, JWT, { expiresIn: 84600 }
                    //     async (err, token) => {
                    //     if (err) {
                    //         console.error('Error generating JWT:', err);
                    //     } else {
                    //         await User.updateOne({ _id: user.id }, { $set: { token } });
                    //         user.token = token;
                    //         await user.save();
                    //     }
                    // }
                );
                if (token) {
                    await User.updateOne({ _id: user.id }, { $set: { token } });
                    user.token = token;
                    await user.save();
                } else {
                    console.log("error in token generation")
                }
                const expires = new Date(Date.now() + 86400e3);
                cookies().set("token", token, { expires })
                return NextResponse.json({ user: user }, { status: 200 });
            }
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}

export const PUT = async (req, res) => {
    await connection();
    try {
        const body = await req.json();
        const { email, password } = body;
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ msg: "User does not exist" }, { status: 404 })
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await User.updateOne({ email: user.email }, { $set: { password } });
            user.password = hashedPassword;
            await user.save()
            return NextResponse.json({ msg: "Password updated successfully" }, { status: 200 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}