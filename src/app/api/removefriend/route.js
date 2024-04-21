import User from "@/model/userSchema";
import connection from "@/utils/DB/connection"
import { NextResponse } from "next/server";

export const PATCH = async (req, res) => {
    await connection();
    try {
        const body = await req.json();
        const { currUserId, id } = body;
        const user = await User.findById({ _id: currUserId });
        if (!user) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        } else {
            const indexToRemove = user.friendList.findIndex(friend => friend.id.toString() === id);
            if (indexToRemove === -1) {
                return NextResponse.json({ msg: "This friend is not available in your Friend List" }, { status: 400 });
            } else {
                user.friendList.splice(indexToRemove, 1);
                await user.save();
            }
        }
        const updatedUser = await User.findById({ _id: currUserId });
        return NextResponse.json({ user: updatedUser }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}