import User from "@/model/userSchema";
import connection from "@/utils/DB/connection"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export const POST = async (req, { params }) => {
    await connection();
    try {
        const id = params.id
        const user = await User.findById({ _id: id });
        if (!user) {
            return NextResponse.json({ msg: "User not Exists" }, { status: 404 })
        } else {
            await User.updateOne({ _id: id }, { $set: { token: "" } })
            user.token = ""
            await user.save();
            cookies().delete("token");
            return NextResponse.json({ msg: "Logout successfully" }, { status: 200 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}