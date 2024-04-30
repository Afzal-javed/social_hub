"use client"
import UserListSection from '@/components/Section/UserListSection/UserListSection'
import FriendProfilePage from '@/components/Section/friendProfileSection/FriendProfilePage'
import PostSection from '@/components/Section/postSection/PostSection'
import { friendPosts } from '@/redux/Slice/friendPostSlice'
import { friendInfo } from '@/redux/Slice/friendSlice'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from "next/image";
import loading from "../../../public/loading.gif";
import loading2 from "../../../public/loading2.gif";

const FriendProfile = () => {
    const search = useSearchParams();
    const dispatch = useDispatch();
    const id = search.get("query");
    // useEffect(() => {
    //     const getfriendData = async () => {
    //         try {
    //             const res = await axios.get(`/api/userData/${id}`)
    //             if (res?.status === 200) {
    //                 dispatch(friendInfo(res?.data?.user))
    //             }
    //         } catch (error) {
    //             if (error?.response?.status === 404) {
    //                 toast(error?.response?.data?.msg)
    //             }
    //             if (error?.response?.status === 500) {
    //                 toast(error?.response?.data?.msg)
    //             }
    //         }
    //     }
    //     async function getfriendPosts() {
    //         try {
    //             const res = await axios.get(`/api/addfriends/${id}`)
    //             if (res?.status === 200) {
    //                 dispatch(friendPosts(res?.data?.friendPost));
    //             }
    //         } catch (error) {
    //             if (error?.response?.status === 500) {
    //                 toast(error?.response?.data?.msg)
    //             }
    //         }
    //     }
    //     getfriendPosts();
    //     getfriendData()
    // }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userDataRes, friendDataRes] = await Promise.all([
                    axios.get(`/api/userData/${id}`),
                    axios.get(`/api/addfriends/${id}`)
                ]);
                if (userDataRes?.status === 200) {
                    dispatch(friendInfo(userDataRes?.data?.user));
                }
                if (friendDataRes?.status === 200) {
                    dispatch(friendPosts(friendDataRes?.data?.friendPost));
                }
            } catch (error) {
                if (error?.response?.status === 404) {
                    toast(error?.response?.data?.msg)
                }
                if (error?.response?.status === 500) {
                    toast(error?.response?.data?.msg)
                }
            }
        };
        fetchData();
    }, [id, dispatch]);

    const friendPost = useSelector((state) => state.friendPost)
    const userData = useSelector((state) => state.user)
    const friendData = useSelector((state) => state.friend);
    const reverseFriendPost = [...friendPost.postList].reverse();
    const isSame = id === userData.id;

    return (

        <div className="w-full h-full grid grid-cols-1  snap-y lg:flex xl:flex xl:justify-between lg:justify-between ">
            <div className={`w-full snap-center lg:w-[27%] xl:w-[27%] h-screen lg:flex lg:flex-col p-2 gap-6 overflow-y-scroll`}>

                {friendData.email !== "" ?
                    <FriendProfilePage
                        userData={friendData}
                        totalPost={friendPost.postList.length} />
                    :
                    <div className="w-[27%] h-full flex items-center justify-center">
                        <Image src={loading} alt="loading" width={150} height={150} />
                    </div>}

            </div>
            <section className="w-full snap-center h-screen lg:w-[47%] xl:w-[47%] shadow-xl ">

                {friendPost.postList.length !== 0 ?
                    <PostSection
                        posts={reverseFriendPost}
                        userData={userData}
                        isSame={isSame} />
                    :
                    <div className="w-[47%] h-full flex items-center justify-center">
                        <Image src={loading2} alt="loading" width={150} height={150} className='' />
                    </div>}

            </section>
            <div className=" h-screen w-full snap-center lg:flex lg:flex-col xl:flex-col xl:flex lg:w-[23%] xl:w-[23%]">
                <UserListSection
                    userData={friendData} />
            </div>
        </div>

    )
}

export default FriendProfile;