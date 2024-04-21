import User from "@/model/userSchema";
import connection from "@/utils/DB/connection"
import { NextResponse } from "next/server";


export const PATCH = async (req, res) => {
    await connection();
    try {
        const body = await req.json();
        const { id, userId } = body;
        const friend = await User.findById({ _id: id });
        const user = await User.findById({ _id: userId });
        const isFriendAlreadyAdded = user.friendList.some(friend => friend.id.equals(id));
        if (isFriendAlreadyAdded) {
            return NextResponse.json({ msg: "Friend Already Added" }, { status: 400 })
        } else {
            const friendObject = {
                id: friend._id,
                firstName: friend.firstName,
                lastName: friend.lastName,
                email: friend.email,
                profile: friend.profile
            };
            await User.findByIdAndUpdate(userId, { $push: { friendList: friendObject } });
            const updatedUser = await User.findById({ _id: userId })
            return NextResponse.json({ user: updatedUser }, { status: 200 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}