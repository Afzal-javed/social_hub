"use client"
import Image from "next/image";
import NavBar from "@/components/NavBar/NavBar";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "@/components/Card/postCard/PostCard";
import axios from "axios";
import { toast } from "react-toastify";
import { allPosts } from "@/redux/Slice/postsSlice";

const PostSection = ({ isSame, posts, userData }) => {
    const dispatch = useDispatch();

    const likedPost = async (postId) => {
        try {
            const userId = userData.id
            const res = await axios.patch("/api/posts", { postId, userId })
            if (res.status === 200) {

                dispatch(allPosts(res?.data?.post))
            }
        } catch (error) {
            if (error?.response?.status === 500) {
                toast(error?.response?.data?.msg)
            }
        }
    }
    const deletePost = async (postId) => {
        console.log(postId)
        try {
            const res = await axios.delete(`/api/posts/${postId}`);
            if (res.status === 200) {
                console.log(res.data);
            }
        } catch (error) {
            if (error?.response?.status === 500) {
                toast(error?.response?.data?.msg)
            }
        }

    }

    return (

        <div className="w-full shadow-xl relative">
            <NavBar />
            <div className="w-full h-screen relative flex flex-col items-center border-b border-black overflow-y-scroll">
                {
                    posts.map((post, index) => (

                        <PostCard deletePost={deletePost} isSame={isSame} idx={index} userId={userData.id} postedUserId={post.userId} onClick={likedPost} postId={post._id} isLiked={post.like.includes(userData.id) ? true : false} firstName={post.firstName} lastName={post.lastName} profile={post.profile} createdAt={post.createdAt} description={post.description} postImage={post.post} like={post.like} comment={post.comment} />
                    ))
                }
                <Link href={"/uploadPost"} className="sticky bottom-[8rem] lg:bottom-5 xl:bottom-5 ml-auto mr-5 lg:mr-8 xl:mr-8  bg-yellow-400 shadow-lg w-[5rem] h-[5rem] flex items-center justify-center rounded-full  cursor-pointer ">
                    <h1 className="text-5xl leading-[5rem] text-black">+</h1>
                </Link>
            </div>
        </div>


    )
}

export default PostSection