import User from "@/model/userSchema";
import connection from "@/utils/DB/connection"
import { NextResponse } from "next/server";


export const GET = async (req, res) => {
    await connection();
    try {
        const getUsers = await User.find();
        return NextResponse.json({ allUsers: getUsers }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}