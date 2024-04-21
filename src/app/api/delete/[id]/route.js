import User from "@/model/userSchema";
import connection from "@/utils/DB/connection"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export const DELETE = async (req, { params }) => {
    await connection();
    try {
        const id = params.id;
        const user = await User.findById({ _id: id })
        if (!user) {
            return NextResponse.json({ msg: "user not exist" }, { status: 404 })
        } else {
            await User.findByIdAndDelete({ _id: id });
            cookies().delete("token");
            return NextResponse.json({ msg: "Account Deleted Successfully" }, { status: 200 })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server error" }, { status: 500 })
    }
}