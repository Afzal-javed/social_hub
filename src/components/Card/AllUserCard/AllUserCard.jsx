import Image from 'next/image';
import React from 'react'
import { MdPersonAddAlt1 } from "react-icons/md";

export const AllUserCard = ({ searchId, profile, idx, firstName, id, lastName, email, onClick }) => {

    return (
        <div key={idx} className="w-full flex items-center gap-4 p-3 border-b border-slate-300 relative">
            <div className="w-12 h-12 border border-black overflow-hidden relative  rounded-full shadow-lg flex flex-col items-center ">
                <Image src={`${profile}`}
                    alt="profile" className="object-cover"
                    width={100}
                    height={100}
                />
            </div>
            <div className=" flex flex-col items-start ">
                <span className="text-lg font-semibold">{firstName + " " + lastName}</span>
                <span className=" text-xs font-light ">{email}</span>
            </div>
            {searchId === null &&
                <span className="absolute top-4 right-5 text-3xl" onClick={() => onClick(id)}><MdPersonAddAlt1 className="inline-block cursor-pointer" /></span>}
        </div>
    )
}
