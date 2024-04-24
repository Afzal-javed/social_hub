import connection from "@/utils/DB/connection"
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import Post from "@/model/postSchema";


export const POST = async (req, res) => {
    await connection();
    try {
        const body = await req.formData();
        const firstName = body.get("firstName");
        const lastName = body.get("lastName");
        const profile = body.get("profile");
        const userId = body.get("userId");
        const description = body.get("description");
        const post = body.get("post");
        const byteLength = await post.arrayBuffer();
        const BufferData = Buffer.from(byteLength);
        const imageName = `${new Date().getTime()}${path.extname(post.name)}`
        const postPath = `./public/uploads/posts/${imageName}`
        await writeFile(postPath, BufferData);
        const newPost = new Post({
            userId,
            firstName,
            lastName,
            profile,
            description,
            post: imageName
        })
        await newPost.save();
        return NextResponse.json({ msg: "Post Uploaded Successfully" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}

export const PATCH = async (req, res) => {
    await connection();
    try {
        const body = await req.json();
        const { postId, userId } = body;
        const post = await Post.findById({ _id: postId })
        const isLike = post.like.includes(userId);
        if (isLike) {
            await Post.findByIdAndUpdate(postId, { $pull: { like: userId } });
        }
        else {
            await Post.findByIdAndUpdate(postId, { $addToSet: { like: userId } });
        }
        const updatedPost = await Post.find()
        return NextResponse.json({ post: updatedPost }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}

export const GET = async (req, res) => {
    await connection();
    try {
        const allPosts = await Post.find();
        if (!allPosts || allPosts.length === 0) {
            return NextResponse.json({ msg: "No posts are available" }, { status: 405 });
        } else {
            return NextResponse.json({ posts: allPosts }, { status: 200 });
        }
        // const filterPost = allPosts.filter(post => post.userId === id || user.friendList.some(friend => friend.id.toString() === post.userId));
        // if (filterPost.length === 0) {
        //     return NextResponse.json({ msg: "No posts from friends are available" }, { status: 403 });
        // } else {
        //     return NextResponse.json({ posts: filterPost }, { status: 200 });
        // }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }

}