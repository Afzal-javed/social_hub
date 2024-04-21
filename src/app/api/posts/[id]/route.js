import Post from "@/model/postSchema";
import User from "@/model/userSchema";
import connection from "@/utils/DB/connection";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    await connection();
    try {
        const id = params.id;
        const user = await User.findById({ _id: id });
        if (!user) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }
        const allPosts = await Post.find();
        if (!allPosts || allPosts.length === 0) {
            return NextResponse.json({ msg: "No posts are available" }, { status: 405 });
        }
        const filterPost = allPosts.filter(post => post.userId === id || user.friendList.some(friend => friend.id.toString() === post.userId));
        if (filterPost.length === 0) {
            return NextResponse.json({ msg: "No posts from friends are available" }, { status: 403 });
        } else {
            return NextResponse.json({ posts: filterPost }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }

}

export const DELETE = async (req, { params }) => {
    await connection();
    try {
        const postId = params.postId;
        await Post.findByIdAndDelete({ _id: postId });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}