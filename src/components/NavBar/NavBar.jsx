"use client"
import Image from "next/image";
import profile from "../../../public/uploads/1710582956841.jpg";
import { MdMenu } from "react-icons/md";
import { useState, useEffect } from "react";

import Link from "next/link";


const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const navOpen = isOpen ? "translate-x-0" : "translate-x-[-100%]";

    return (
        <div className="w-full sticky top-0 left-0 z-[200] ">
            <div className='w-full h-[5rem] shadow-lg  flex items-center justify-between lg:hidden xl:hidden px-3 '>
                <div className="w-full flex items-center gap-4 p-1 z-[100]">
                    <div className="w-[4rem] h-[4rem] md:w-20 md:h-20  overflow-hidden relative  rounded-full shadow-lg flex flex-col items-center ">
                        <Image src={profile}
                            alt="profile" className="object-cover"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-2xl  font-semibold">Afzal Javed</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">

                    <span onClick={() => setIsOpen(!isOpen)}>
                        <MdMenu className="inline-block text-3xl font-semibold " />
                    </span>
                </div>
                <div className={`transform transition-all ${navOpen} flex flex-col items-center duration-500 fixed top-0 left-0 z-[100] h-screen right-0 bottom-0 `}>
                    <div className="w-full flex border-b border-black items-center justify-between p-4 relative">
                        <h1 className="text-3xl font-semibold">Afzal Javed</h1>
                        <span onClick={() => setIsOpen(!isOpen)}>
                            <MdMenu className="inline-block text-3xl font-semibold " />
                        </span>
                    </div>
                    <div className="w-full flex items-center my-3">
                        <ul className=" w-full text-3xl flex  flex-col items-start   gap-2">
                            <Link className=" w-full text-xl p-3 border-b border-black cursor-pointer" href={"/profile"}>
                                <li>Profile</li>
                            </Link>
                            <Link className=" w-full text-xl p-3 border-b border-black cursor-pointer" href={"/my-posts"}>
                                <li>My Posts</li>
                            </Link>
                            <Link className=" w-full text-xl p-3 border-b border-black cursor-pointer" href={"/friends"}>
                                <li>Friends</li>
                            </Link>
                            <Link className=" w-full text-xl p-3 border-b border-black cursor-pointer" href={"/users"}>
                                <li>Users</li>
                            </Link>
                            <Link className=" w-full text-xl p-3 border-b border-black cursor-pointer" href={"/logout"}>
                                <li>Logout</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar