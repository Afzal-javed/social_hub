"use client"
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { MdAddCall } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaEdit } from "react-icons/fa"
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logoutUser } from "@/redux/Slice/userSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProfileSection = ({ userData, post }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [mount, setMount] = useState(false);
    const { theme, setTheme } = useTheme('light');
    const style = " cursor-pointer transition-all hover:translate-y-100 hover:scale-150 duration-500"
    useEffect(() => setMount(true), [])
    const totalPost = post.postList.filter((item) => userData.id === item.userId)
    const handleCall = () => {
        const phoneNumber = userData.phoneNumber;
        const telUrl = `tel:${phoneNumber}`;
        window.open(telUrl, '_blank');
    };
    const handleWhatsappClick = () => {
        const whatsappNumber = userData.wtpNumber;
        const whatsappUrl = `https://wa.me/${whatsappNumber}`;
        window.open(whatsappUrl, '_blank');
    };

    const userLogout = async () => {
        try {
            const res = await axios.post(`/api/logout/${userData.id}`)
            if (res?.status === 200) {
                toast(`${userData.firstName} Logout successfully`)
                localStorage.clear()
                dispatch(logoutUser());
                router.push("/login");
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
    const deleteAccount = async () => {
        const cnf = confirm("Are you suru want to Delete your account ?")
        if (cnf) {
            try {
                const res = await axios.delete(`/api/delete/${userData.id}`)
                if (res?.status === 200) {
                    toast(res?.data?.msg)
                    localStorage.clear()
                    dispatch(logoutUser());
                    router.push("/login");
                }
            } catch (error) {
                if (error?.response?.status === 404) {
                    toast(error?.response?.data?.msg)
                }
                if (error?.response?.status === 500) {
                    toast(error?.response?.data?.msg)
                }
            }
        } else {
            return
        }
    }
    return (

        <div className="w-full shadow-lg px-1">
            <div className="w-full flex items-center gap-4 p-1 cursor-default border-b-2 border-black">
                <div className="w-20 h-20 border border-black overflow-hidden relative  rounded-full shadow-lg flex flex-col items-center ">
                    <Image src={`${userData.profile}`}
                        alt="profile" className="object-cover"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="flex items-center gap-6">
                    <span className="text-2xl  font-semibold">{userData.firstName + " " + userData.lastName}</span>
                    <span className=" text-2xl cursor-pointer">
                        <Link href={"/edit-profile"}>
                            <FaEdit />
                        </Link>
                    </span>
                </div>
            </div>
            <div className="w-full flex flex-col items-start p-2">

                {userData.bio && <p className="text-sm px-3 mt-2 mb-7  text-justify font-light">{userData.bio}</p>}

                <h1 className="w-full text-start text-lg p-2 font-semibold border-b border-slate-500">Contact</h1>
                {userData.phoneNumber && <p className="text-sm p-1 cursor-pointer" onClick={handleWhatsappClick}><IoLogoWhatsapp className="text-2xl inline-block ml-2 mr-3 my-1" />{userData.phoneNumber}</p>}
                {userData.email && <p className="text-sm p-1 cursor-pointer" onClick={() => window.open(`mailto:${userData.email}`)}><MdEmail className="text-2xl inline-block ml-2 mr-3 my-0.5" />{userData.email}</p>}
                {userData.wtpNumber && <p className="text-sm p-1 cursor-pointer" onClick={handleCall}><MdAddCall className="text-2xl inline-block ml-2 mr-3 my-0.5" /> {userData.wtpNumber}</p>}
                {userData.location && <p className="text-sm p-1"><FaLocationDot className="text-2xl inline-block ml-2 mr-3 my-0.5" /> {userData.location}</p>}
                {userData.occupation && <p className="text-sm p-1"><BsPersonWorkspace className="text-2xl inline-block ml-2 mr-3 my-1" />{userData.occupation}</p>}
            </div>
            <div className="w-full p-2 flex flex-col items-center justify-between">
                <h1 className="w-full text-start text-lg p-2 font-semibold border-b border-slate-500">Settings</h1>
                <div className="w-full flex items-center p-2 justify-between">

                    <span className="flex items-cente text-lgr">Friends : {userData.friendList.length} <FaUserFriends className="text-2xl inline-block " /></span>
                    <span onClick={() => router.push(`/friendProfile?query=${userData.id}`)} className="cursor-pointer">Posts : {totalPost.length}</span>
                    {
                        theme === 'dark' ? <MdLightMode className="cursor-pointer transition-all hover:translate-y-100 hover:scale-150 duration-500 text-3xl inline-block ml-2 mr-3 my-0.5" onClick={() => setTheme('light')} />
                            : <MdDarkMode className="cursor-pointer transition-all hover:translate-y-100 hover:scale-150 duration-500 text-3xl inline-block ml-2 mr-3 my-0.5" onClick={() => setTheme('dark')} />
                    }
                </div>
            </div>
            <div className="w-full flex flex-col items-start py-2 ">
                <h1 className="w-full text-start text-lg p-2 font-semibold border-b border-slate-500">Social Links</h1>
                <div className="w-full flex items-center p-3">
                    {userData.githubLinks && <span className={`${style}`} onClick={() => window.open(`${userData.githubLinks}`, "_blank")}><FaGithub className="text-4xl inline-block ml-2 mr-3 my-0.5" /></span>}
                    {userData.twitterLinks && <span className={`${style}`} onClick={() => window.open(`${userData.twitterLinks}`, "_blank")}><FaTwitter className="text-4xl inline-block ml-2 mr-3 my-0.5" /></span>}
                    {userData.instaLinks && <span className={`${style}`} onClick={() => window.open(`${userData.instaLinks}`, "_blank")}><RiInstagramFill className="text-4xl inline-block ml-2 mr-3 my-0.5" /></span>}
                    {userData.faceBookLinks && <span className={`${style}`} onClick={() => window.open(`${userData.faceBookLinks}`, "_blank")}><FaFacebook className="text-4xl inline-block ml-2 mr-3 my-1" /></span>}
                    {userData.linkedinLinks && <span className={`${style}`} onClick={() => window.open(`${userData.linkedinLinks}`, "_blank")}><FaLinkedin className="text-4xl inline-block ml-2 mr-3 my-1" /> </span>}
                    {userData.portfolioLinks && <span className={`${style}`} onClick={() => window.open(`${userData.portfolioLinks}`, "_blank")}><FaCircleUser className="text-4xl inline-block ml-2 mr-3 my-1" /> </span>}
                </div>
            </div>
            <div className="w-full flex flex-col items-start py-2 ">
                <h1 className="w-full text-start text-lg p-2 font-semibold border-b border-slate-500">Accounts</h1>
                <div className="w-full flex items-start justify-between p-3 ">
                    <span className=" cursor-pointer text-xl" onClick={deleteAccount}>Delete <MdDelete className="text-4xl inline-block ml-2 mr-3 my-0.5 transition-all hover:translate-y-100 hover:scale-150 duration-500" /></span>
                    <span className=" cursor-pointer text-xl" onClick={userLogout}>Logout <RiLogoutCircleLine className="text-4xl inline-block ml-2 mr-3 my-0.5 transition-all hover:translate-y-100 hover:scale-150 duration-500" /></span>
                </div>
            </div>
        </div>

    )
}

export default ProfileSection