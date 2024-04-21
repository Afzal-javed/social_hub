"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdPersonRemoveAlt1 } from "react-icons/md";

const UserListCard = ({ searchId, firstName, lastName, onClick, id, idx, email, profile }) => {
    const router = useRouter();
    return (
        <div key={idx} className="w-full flex items-center gap-4 p-3 border-b border-slate-300">
            <div onClick={() => router.push(`/friendProfile?query=${id}`)} className="w-12 h-12 border border-black overflow-hidden relative  rounded-full shadow-lg flex flex-col items-center ">
                <Image src={`/uploads/${profile}`}
                    alt="profile" className="object-cover cursor-pointer"
                    width={100}
                    height={100}
                />
            </div>
            <div onClick={() => router.push(`/friendProfile?query=${id}`)} className=" flex flex-col items-start ">
                <span className="text-lg  font-semibold cursor-pointer">{firstName + " " + lastName}</span>
                <span className=" text-xs font-light cursor-pointer">{email}</span>
            </div>
            {
                searchId === null &&
                <span className='text-3xl ml-auto mr-4' onClick={() => onClick(id)}><MdPersonRemoveAlt1 className='inline-block cursor-pointer' /></span>}
        </div>
    )
}

export default UserListCard