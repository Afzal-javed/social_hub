"use client"
import Image from "next/image"
import dislike from "../../../../public/dislike.png";
import likeLogo from "../../../../public/like.png";
import { IoIosSend } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import Input from "@/components/UsableComponents/Input/Input";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { allPosts } from "@/redux/Slice/postsSlice";
import CommentRead from "@/components/UsableComponents/Comment/CommentRead";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

const PostCard = ({ isSame, deletePost, isLiked, userId, postId, postedUserId, onClick, profile, idx, firstName, lastName, createdAt, description, postImage, like, comment }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [allComments, setAllComments] = useState(false);
    const [postComment, setPostComment] = useState(false);
    const [doComment, setDoComment] = useState('');
    const seeComments = () => {
        setAllComments(!allComments);
        setPostComment(false)
    }
    const postComments = () => {
        setPostComment(!postComment);
        setAllComments(false);
    }
    console.log(profile);
    const addComments = async (postId) => {
        try {
            const res = await axios.patch("/api/posts/comments", { postId, userId, userComment: doComment });
            if (res?.status === 200) {
                dispatch(allPosts(res?.data?.post))
                setDoComment('');
            }
        } catch (error) {
            if (error?.response?.status === 500) {
                toast(error?.response?.data?.msg)
            }
        }
    }
    // const getfriendData = async () => {
    //     try {
    //         const res = await axios.get(`/api/userData/${postedUserId}`)
    //         if (res?.status === 200) {

    //             dispatch(friendInfo(res?.data?.user))
    //             // setFriendData(res?.data?.user)
    //             router.push(`/friendProfile?query=${postedUserId}`)
    //         }
    //     } catch (error) {
    //         if (error?.response?.status === 404) {
    //             toast(error?.response?.data?.msg)
    //         }
    //         if (error?.response?.status === 500) {
    //             toast(error?.response?.data?.msg)
    //         }
    //     }
    // }
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (
        <div key={idx} className="w-full relative ">
            <div className="w-full flex border-b  items-center gap-2 px-4 py-2 my-2">
                <div onClick={() => router.push(`/friendProfile?query=${postedUserId}`)} className="w-[4rem] h-[4rem] border border-black overflow-hidden relative  rounded-full shadow-lg flex flex-col items-center ">
                    {/* <Image src={profilePic} router.push(`/login?query=${user.email}`) */}
                    <Image src={`${profile}`}
                        alt="profile" className="object-cover cursor-pointer"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="flex flex-col items-start ">
                    <span onClick={() => router.push(`/friendProfile?query=${postedUserId}`)} className="text-xl cursor-pointer">{firstName + " " + lastName}</span>
                    <span className="text-sm font-light">{`${day}/${month}/${year}`}</span>
                </div>
                {isSame && <p className="ml-auto mr-3 text-4xl cursor-pointer text-red-700 transition-all hover:translate-y-100 hover:scale-150 duration-500"><MdDelete className="inline-block" onClick={() => deletePost(postId)} /></p>}
            </div>
            <div className="w-full flex flex-col items-center  border-b border-black px-4">
                <div className="w-full flex items-start">
                    <p className="text-justify mb-2">{description}</p>
                </div>
                {/* <Image className="w-[100%] max-h-[40rem] object-cover" src={profilePic} width={100} height={100} alt="posts" /> */}
                <Image className="w-[100%] max-h-[40rem] object-contain" src={postImage} width={100} height={100} alt="posts" />
                <div className="w-full flex flex-col items-center  ">
                    <div className="w-full flex items-center justify-between p-4">
                        <span onClick={() => onClick(postId)} className="flex items-center justify-center text-lg lg:text-xl xl:text-xl cursor-pointer">{like.length > 0 ? like.length : ""}
                            {
                                !isLiked ? <Image src={dislike} alt="dislike" className="w-[3rem] h-[3rem]  cursor-pointer" />
                                    :
                                    <Image src={likeLogo} alt="dislike" className="w-[3rem] h-[3rem] cursor-pointer" />
                            }
                        </span>
                        <span className="flex items-center justify-center font-light text-xl cursor-pointer" onClick={postComments}><FaRegComment className="inline-block text-3xl lg:text-4xl xl:text-4xl " /></span>
                        <span className="cursor-pointer textl-lg" onClick={seeComments}>See all comments {comment.length}</span>
                    </div>
                    {
                        postComment &&
                        <div className="w-full relative">
                            <Input
                                type={"text"}
                                placeholder={"Add Comment"}
                                value={doComment}
                                onChange={(e) => setDoComment(e.target.value)}
                                label={"Add Comment"}
                                htmlFor={"addComment"}
                                name={"addComment"}

                            />
                            {
                                doComment &&
                                <span className="p-1 absolute top-12 right-4 cursor-pointer" onClick={() => addComments(postId)}>
                                    <IoIosSend className="inline-block text-4xl font-semibold" />
                                </span>
                            }
                        </div>
                    }
                    {allComments &&
                        comment.map((comm, index) => (
                            <CommentRead idx={index} email={comm.email} firstName={comm.firstName} lastName={comm.lastName} comment={comm.comment} id={comm.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PostCard