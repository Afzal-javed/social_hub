import Post from "@/model/postSchema";
import User from "@/model/userSchema";
import connection from "@/utils/DB/connection"
import { NextResponse } from "next/server";


export const PATCH = async (req, res) => {
    await connection();
    try {
        const body = await req.json();
        const { postId, userId, userComment } = body;
        const user = await User.findById({ _id: userId });
        const commentObject = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            comment: userComment
        }
        await Post.findByIdAndUpdate({ _id: postId }, { $push: { comment: commentObject } });
        const updatedPost = await Post.find();
        return NextResponse.json({ post: updatedPost }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}