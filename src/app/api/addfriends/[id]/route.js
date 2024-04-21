import Post from "@/model/postSchema";
import connection from "@/utils/DB/connection"
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    await connection();
    try {
        const id = params.id;
        const allPost = await Post.find();
        const friendPost = allPost.filter((post) => post.userId === id);
        return NextResponse.json({ friendPost: friendPost }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}