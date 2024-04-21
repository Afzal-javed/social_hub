import User from "@/model/userSchema";
import connection from "@/utils/DB/connection"
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    await connection();
    try {
        const id = params.id;
        const user = await User.findById({ _id: id });

        if (!user) {
            return NextResponse.json({ msg: "User Does not exists" }, { status: 404 })
        } else {
            return NextResponse.json({ user: user }, { status: 200 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}