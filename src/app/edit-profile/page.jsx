'use client'
import Image from "next/image"
import logo from "../../../public/profile.gif";
import { useRef, useState } from "react";
import Input from "@/components/UsableComponents/Input/Input";
import Button from "@/components/UsableComponents/Button/Button";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Heading from "@/components/UsableComponents/Heading/Heading";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useSelector } from "react-redux";
import cloudinary from 'cloudinary-core';


const page = () => {
    const formRef = useRef();
    const router = useRouter();
    const userData = useSelector((state) => state.user)
    const [selectedImage, setSelectedImage] = useState(null);
    const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState('');

    const [user, setUser] = useState({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        location: userData.location || "",
        occupation: userData.occupation || "",
        bio: userData.bio || "",
        phoneNumber: userData.phoneNumber || "",
        wtpNumber: userData.wtpNumber || "",
        githubLinks: userData.githubLinks || "",
        linkedinLinks: userData.linkedinLinks || "",
        instaLinks: userData.instaLinks || "",
        faceBookLinks: userData.faceBookLinks || "",
        portfolioLinks: userData.portfolioLinks || "",
        twitterLinks: userData.twitterLinks || ""
    })
    const cl = new cloudinary.Cloudinary({
        cloud_name: `${process.env.NEXT_PUBLIC_CLOUD_NAME}`,
        api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
        api_secret: `${process.env.NEXT_PUBLIC_API_SECRET}`

    })
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);
                const response = await axios.post(`https://api.cloudinary.com/v1_1/${cl.config().cloud_name}/image/upload`, formData);
                setCloudinaryImageUrl(response.data.secure_url);
                setSelectedImage(file);
            } catch (error) {
                console.error("Error uploading image to Cloudinary:", error);
            }
            setSelectedImage(file);
        } else {
            setSelectedImage(logo);
        }
    }
    const userInputData = (e) => {
        const { name, value } = e.target;
        setUser((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const userUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("firstName", user.firstName)
            formData.append("lastName", user.lastName)
            formData.append("bio", user.bio)
            formData.append("location", user.location)
            formData.append("occupation", user.occupation)
            formData.append("phoneNumber", user.phoneNumber)
            formData.append("wtpNumber", user.wtpNumber)
            formData.append("githubLinks", user.githubLinks)
            formData.append("linkedinLinks", user.linkedinLinks)
            formData.append("twitterLinks", user.twitterLinks)
            formData.append("faceBookLinks", user.faceBookLinks)
            formData.append("instaLinks", user.instaLinks)
            formData.append("portfolioLinks", user.portfolioLinks)
            formData.append("profile", cloudinaryImageUrl)
            const res = await axios.patch(`/api/register/${userData.id}`, formData)
            // const res = await axios.patch(`/api/register/${id}`, formData)
            if (res?.status === 200) {
                toast("Profile updated successfully")
                router.push(`/`)
            }
        } catch (error) {
            if (error?.response?.status === 400) {
                toast(error?.response?.data?.msg)
            }
            if (error?.response?.status === 500) {
                toast(error?.response?.data?.msg)
            }

        }
    }


    return (
        <section className="w-full">
            <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] m-auto my-5 p-5 flex flex-col items-center justify-center shadow-lg">
                <Heading name={"Update Your Porfile"} />
                <div className="w-20 h-20 border border-black overflow-hidden relative  rounded-full shadow-lg flex flex-col items-center ">
                    {
                        selectedImage ? <Image src={URL.createObjectURL(selectedImage)}
                            alt="profile" className="object-cover"
                            width={150}
                            height={100}
                        />
                            :
                            <>
                                <Image src={`${userData.profile}`} width={150} height={150} alt="profile" className="object-fit" />
                                <label htmlFor="profile">
                                    <p className="absolute bottom-0 left-0.5 text-lg text-center bg-slate-700 text-white w-full">Upload</p>
                                    <input type="file" id="profile" className="hidden" onInput={handleImageChange} />
                                </label>
                            </>
                    }
                </div>
                {/* <div className="w-full flex flex-col items-center"> */}
                <form ref={formRef} className="w-full flex flex-col items-center">
                    <Input
                        type={"text"}
                        placeholder={"Enter First Name..."}
                        name={"firstName"}
                        value={user.firstName}
                        onChange={userInputData}
                        label={"First Name"}
                        htmlFor={"firstName"}
                    />
                    <Input
                        type={"text"}
                        placeholder={"Enter Last Name..."}
                        name={"lastName"}
                        value={user.lastName}
                        onChange={userInputData}
                        label={"Last Name"}
                        htmlFor={"lastName"}
                    />
                    <div className="w-full flex flex-col items-center gap-2 p-3 relative">
                        <label htmlFor="bio" className="w-full text-start text-lg">Add Bio</label>
                        <textarea className="w-full outline-none text-lg border-b border-black border-r" id="bio" name="bio" rows={4} value={user.bio} onChange={userInputData} placeholder="About Yourself..." />
                    </div>
                    <Input
                        type={"text"}
                        placeholder={"Enter Your Location..."}
                        name={"location"}
                        value={user.location}
                        onChange={userInputData}
                        label={"Location"}
                        htmlFor={"location"}
                    />
                    <Input
                        type={"text"}
                        placeholder={"Enter Occupation..."}
                        name={"occupation"}
                        value={user.occupation}
                        onChange={userInputData}
                        label={"Occupation"}
                        htmlFor={"occupation"}
                    />
                    <Input
                        type={"number"}
                        placeholder={"Add your phone number..."}
                        name={"phoneNumber"}
                        value={user.phoneNumber}
                        onChange={userInputData}
                        label={"Phone Number"}
                        htmlFor={"phoneNumber"}
                    />
                    <Input
                        type={"number"}
                        placeholder={"Add Your Whatsapp..."}
                        name={"wtpNumber"}
                        value={user.wtpNumber}
                        onChange={userInputData}
                        label={"WhatsApp Number"}
                        htmlFor={"wtpNumber"}
                    />
                    <Heading name={"Add Your Social Links"} />
                    <div className="w-full md:w-[80%] lg:w-[70%] xl:w-[70%] flex items-center">
                        <span className="text-5xl"><FaGithub className="inline-block" /></span>
                        <Input
                            type={"text"}
                            placeholder={"Add Github Links..."}
                            name={"githubLinks"}
                            value={user.githubLinks}
                            onChange={userInputData}
                        />
                    </div>
                    <div className="w-full md:w-[80%] lg:w-[70%] xl:w-[70%] flex items-center">
                        <span className="text-5xl"><FaTwitter className="inline-block" /></span>
                        <Input
                            type={"text"}
                            placeholder={"Add Twitter Links..."}
                            name={"twitterLinks"}
                            value={user.twitterLinks}
                            onChange={userInputData}
                        />
                    </div>
                    <div className="w-full md:w-[80%] lg:w-[70%] xl:w-[70%] flex items-center">
                        <span className="text-5xl"><FaLinkedin className="inline-block" /></span>
                        <Input
                            type={"text"}
                            placeholder={"Add LinkedIn Profile..."}
                            name={"linkedinLinks"}
                            value={user.linkedinLinks}
                            onChange={userInputData}
                        />
                    </div>
                    <div className="w-full md:w-[80%] lg:w-[70%] xl:w-[70%] flex items-center">
                        <span className="text-5xl"><FaFacebook className="inline-block" /></span>
                        <Input
                            type={"text"}
                            placeholder={"Add Facebook Profile..."}
                            name={"faceBookLinks"}
                            value={user.faceBookLinks}
                            onChange={userInputData}
                        />
                    </div>
                    <div className="w-full md:w-[80%] lg:w-[70%] xl:w-[70%] flex items-center">
                        <span className="text-5xl"><RiInstagramFill className="inline-block" /></span>
                        <Input
                            type={"text"}
                            placeholder={"Add Instagram Profile..."}
                            name={"instaLinks"}
                            value={user.instaLinks}
                            onChange={userInputData}
                        />
                    </div>
                    <div className="w-full md:w-[80%] lg:w-[70%] xl:w-[70%] flex items-center">
                        <span className="text-5xl"><FaCircleUser className="inline-block" /></span>
                        <Input
                            type={"text"}
                            placeholder={"Add PortFolio..."}
                            name={"portfolioLinks"}
                            value={user.portfolioLinks}
                            onChange={userInputData}
                        />
                    </div>
                    <Button type={"button"} onClick={userUpdateProfile} btnName={"Update"} btnStyle={"w-[10rem] text-lg p-2 my-2"} />
                </form>
            </div>
        </section>
    )
}

export default page