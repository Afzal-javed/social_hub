"use client"
import React from 'react'
import profile from "../../../../public/logo.png";
import { AllUserCard } from '@/components/Card/AllUserCard/AllUserCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/Slice/userSlice';
import { useSearchParams } from 'next/navigation';


const AllUserList = ({ allUsers, userId }) => {
    const dispatch = useDispatch();
    const search = useSearchParams();
    const searchId = search.get("query") || null;
    const addFriends = async (id) => {

        try {
            const res = await axios.patch(`/api/addfriends`, { id, userId })
            if (res?.status === 200) {
                toast("Friend Added");
                dispatch(loginUser(res?.data?.user))
            }
        } catch (error) {
            if (error?.response?.status === 400) {
                return toast(error?.response?.data?.msg)
            }
            if (error?.response?.status === 500) {
                return toast(error?.response?.data?.msg)
            }
        }
    }

    return (
        <div className="w-full h-[50%] flex flex-col shadow-lg items-center overflow-y-scroll scroll-smooth">
            <h1 className=" w-full text-xl font-semibold border-b border-slate-500 p-3">All User List</h1>
            {
                allUsers.map((user, index) => (
                    <AllUserCard
                        profile={user.profile}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        email={user.email}
                        id={user._id}
                        idx={index}
                        onClick={addFriends}
                        searchId={searchId}
                    />

                ))
            }
        </div>
    )
}

export default AllUserList