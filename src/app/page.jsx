"use client"
import ProfileSection from "@/components/Section/ProfileSection/ProfileSection";
import UserListSection from "@/components/Section/UserListSection/UserListSection";
import PostSection from "@/components/Section/postSection/PostSection";
import { allPosts } from "@/redux/Slice/postsSlice";
import { loginUser } from "@/redux/Slice/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import loading from "../../public/loading.gif";
import loading2 from "../../public/loading2.gif";

export default function Home() {
  const userData = useSelector((state) => state.user);
  const post = useSelector((state) => state.posts);
  let id = null;
  if (typeof window !== 'undefined') {
    id = localStorage.getItem("id");
  }
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUserData() {
      try {
        const res = await axios.get(`/api/userData/${id}`)
        if (res?.status === 200) {
          dispatch(loginUser(res?.data?.user));
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          toast(error?.response?.data?.msg)
        }
        if (error?.response?.status === 500) {
          toast(error?.response?.data?.msg)
        }
      }
    }
    async function getAllPosts() {
      try {
        const res = await axios.get(`/api/posts`)
        if (res?.status === 200) {
          dispatch(allPosts(res?.data?.posts));
        }
      } catch (error) {
        if (error?.response?.status === 405) {
          toast(error?.response?.data?.msg)
        }
        if (error?.response?.status === 500) {
          toast(error?.response?.data?.msg)
        }
      }
    }
    getUserData();
    getAllPosts();
  }, [])

  const filterPost = post.postList.filter(post => post.userId === userData.id || userData.friendList.some(frndPost => frndPost.id === post.userId));
  const reversedPosts = [...filterPost].reverse()
  return (
    <div className="w-full h-full lg:flex xl:flex xl:justify-between lg:justify-between ">
      <div className={` w-[27%] lg:w-[27%] xl:w-[27%] h-screen lg:flex lg:flex-col p-2 gap-6 overflow-y-scroll`}>
        {
          userData.email !== "" ?
            <ProfileSection
              userData={userData}
              post={post} />
            :
            <div className="w-full h-full flex items-center justify-center">

              <Image src={loading} alt="loading" width={150} height={150} />
            </div>
        }
      </div>
      <section className="w-[47%] h-screen lg:w-[47%] xl:w-[47%] shadow-xl ">
        {
          post.postList.length !== 0 ?
            <PostSection
              posts={reversedPosts}
              userData={userData} />
            :
            <div className="w-full h-full flex items-center justify-center">
              <Image src={loading2} alt="loading" width={150} height={150} />
            </div>
        }
      </section>
      <div className=" h-screen w-[23%] lg:flex lg:flex-col xl:flex-col xl:flex lg:w-[23%] xl:w-[23%]">
        <UserListSection
          userData={userData} />
      </div>
    </div>
  );
}
