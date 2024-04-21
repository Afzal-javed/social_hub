"use client"
import FriendList from '../../List/FriendList/FriendList'
import AllUserList from '../../List/AllUserList/AllUserList'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import loading from "../../../../public/loading.gif";
import Image from "next/image";

const UserListSection = ({ userData }) => {
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        async function getAllUsers() {
            try {
                const res = await axios.get("/api/getallusers")
                setAllUsers(res.data.allUsers);
            } catch (error) {
                if (error?.response?.status === 500) {
                    return toast(error?.response?.data?.msg)
                }
            }
        }
        getAllUsers();
    }, [])
    const totalUsers = allUsers.filter((user) => user._id !== userData.id && !userData.friendList.some(friend => friend.id === user._id))

    return (
        <div className='w-full h-screen gap-3 overflow-y-scroll'>
            {
                userData.email !== "" ?
                    <>
                        <FriendList friendList={userData.friendList} />
                        <AllUserList allUsers={totalUsers} userId={userData.id} />
                    </>
                    :
                    <div className="w-full h-full flex items-center justify-center">
                        <Image src={loading} alt="" width={150} height={150} />
                    </div>
            }
        </div>
    )
}

export default UserListSection