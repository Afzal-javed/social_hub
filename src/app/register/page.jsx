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

const page = () => {
    const formRef = useRef();
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(null);
    // const [base64String, setBase64String] = useState('');
    const [getOTP, setGetOTP] = useState(false);
    const [verifyOTP, setVerifyOTP] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpId, setOtpId] = useState("");
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        occupation: "",
        password: "",
        cnfPassword: "",
    })
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        } else {
            setSelectedImage(logo);
        }
        // if (file && file instanceof Blob) {
        //     setSelectedImage(file);
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //         setBase64String(reader.result.split(',')[1]);
        //     };
        //     reader.readAsDataURL(file);
        // }
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
    const userRegister = async (e) => {
        e.preventDefault();
        try {
            if (otpVerified) {
                if (user.password !== user.cnfPassword) {
                    return toast("Password is not matching");
                } else {
                    const formData = new FormData();
                    formData.append("firstName", user.firstName)
                    formData.append("lastName", user.lastName)
                    formData.append("email", user.email)
                    formData.append("location", user.location)
                    formData.append("occupation", user.occupation)
                    formData.append("password", user.password)
                    formData.append("profile", selectedImage)
                    const res = await axios.post("/api/register", formData
                        // {
                        //     firstName: user.firstName,
                        //     lastName: user.lastName,
                        //     email: user.email,
                        //     location: user.location,
                        //     occupation: user.occupation,
                        //     password: user.password,
                        //     profile: base64String
                        // }
                    )
                    if (res?.status === 200) {
                        toast(res?.data?.msg)
                        router.push(`/login?query=${user.email}`)
                    }
                }
            } else {
                return toast("Please verify your email first");
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
    const sendOTP = async () => {
        try {
            if (user.email) {
                const res = await axios.post(`/api/generate-otp`, { email: user.email })
                if (res?.status === 200) {
                    toast("OTP sent successfully")
                    setOtpId(res?.data?.data)
                    setGetOTP(true);
                }
            } else {
                return toast("Please enter email first")
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
    const verifictaionOTP = async () => {
        try {
            if (verifyOTP) {
                const res = await axios.post("/api/otp-verification", { userOtp: verifyOTP, id: otpId })
                if (res?.status === 200) {
                    toast(res?.data?.msg)
                    setOtpVerified(true)
                    setGetOTP(false)
                }
            } else {
                return toast("Please Enter the OTP")
            }

        } catch (error) {
            if (error?.response?.status === 400) {
                toast(error?.response?.data?.msg)
            }
            if (error?.response?.status === 401) {
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
                <Heading name={"Welcome to Social Hub"} />
                <div className="w-20 h-20 border border-black overflow-hidden relative  rounded-full shadow-lg flex flex-col items-center ">
                    {
                        selectedImage ? <Image src={URL.createObjectURL(selectedImage)}
                            alt="profile" className="object-cover"
                            width={150}
                            height={100}
                        />
                            :
                            <>
                                <Image src={logo} alt="profile" className="w-full h-full object-fit" />
                                <label htmlFor="profile">
                                    <p className="absolute bottom-0 left-0.5 text-lg text-center bg-slate-700 text-white w-full">Upload</p>
                                    <input type="file" id="profile" className="hidden" onChange={handleImageChange} />
                                </label>
                            </>
                    }
                </div>
                <form ref={formRef} className="w-full flex flex-col items-center" onSubmit={userRegister}>
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
                    <div className="w-full relative">
                        <Input
                            type={"email"}
                            placeholder={"Enter Your Email..."}
                            name={"email"}
                            value={user.email}
                            onChange={userInputData}
                            label={"Email"}
                            htmlFor={"email"}
                        />{
                            !otpVerified &&
                            <Button btnName={`${getOTP ? 'Resend OTP' : 'Send OTP'}`} onClick={sendOTP} btnStyle={"w-[7rem] p-1 absolute top-12 right-4"} />
                        }
                    </div>
                    {
                        getOTP && <div className="w-full relative">
                            <Input
                                type={"number"}
                                placeholder={"Enter OTP..."}
                                value={verifyOTP}
                                onChange={(e) => setVerifyOTP(e.target.value)}
                                label={"OTP"}
                                htmlFor={"verifyOTP"}
                            />
                            <Button btnName={"Verify OTP"} onClick={verifictaionOTP} btnStyle={"w-[7rem] p-1 absolute top-12 right-4"} />
                        </div>
                    }
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
                        type={"password"}
                        placeholder={"Enter Password..."}
                        name={"password"}
                        value={user.password}
                        onChange={userInputData}
                        label={"Password"}
                        htmlFor={"password"}
                    />
                    <Input
                        type={"password"}
                        placeholder={"Enter Confirm Password..."}
                        name={"cnfPassword"}
                        value={user.cnfPassword}
                        onChange={userInputData}
                        label={"Confirm Password"}
                        htmlFor={"cnfPassword"}
                    />
                    <Button type={"submit"} btnName={"Register"} btnStyle={"w-[10rem] text-lg p-2 my-2"} />
                </form>
                <p className="w-full text-center text-slate-500 text-lg my-2">Already have an accout ? <Link className="cursor-pointer text-black" href={"/login"}>Login</Link></p>
            </div>
        </section>
    )
}

export default page