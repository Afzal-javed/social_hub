"use client"
import React from 'react'
import UserListCard from '@/components/Card/UserListCard/UserListCard';
import { toast } from 'react-toastify'
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from '@/redux/Slice/userSlice';
import { useSearchParams } from 'next/navigation';

const FriendList = ({ friendList }) => {
    const dispatch = useDispatch();
    const search = useSearchParams();
    const searchId = search.get("query") || null;
    let currUserId = null;
    if (typeof window !== 'undefined') {
        currUserId = localStorage.getItem("id");
    }
    const removeFriend = async (id) => {
        try {
            const res = await axios.patch("/api/removefriend", { id, currUserId })
            if (res?.status === 200) {
                toast("Friend Removed")
                dispatch(loginUser(res?.data?.user));
            }
        } catch (error) {
            if (error?.response?.status === 500) {
                return toast(error?.response?.data?.msg)
            }
            if (error?.response?.status === 400) {
                return toast(error?.response?.data?.msg)
            }
        }
    }
    return (
        <div className="w-full h-[50%] flex flex-col shadow-lg items-center overflow-y-scroll scroll-smooth">
            <h1 className=" w-full text-xl font-semibold border-b border-slate-500 p-3">Friend List</h1>
            {
                friendList.map((friend, index) => (
                    <UserListCard
                        profile={friend.profile}
                        firstName={friend.firstName}
                        email={friend.email}
                        lastName={friend.lastName}
                        id={friend.id}
                        idx={index}
                        onClick={removeFriend}
                        searchId={searchId}
                    />
                ))
            }
        </div>
    )
}

export default FriendList