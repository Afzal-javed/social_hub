"use client"
import Button from "@/components/UsableComponents/Button/Button"
import Heading from "@/components/UsableComponents/Heading/Heading"
import Input from "@/components/UsableComponents/Input/Input"
import axios from "axios"
import { useRouter } from "next/navigation"

import { useRef, useState } from "react"
import { toast } from "react-toastify"

const page = () => {
    const router = useRouter();
    const ref = useRef();
    const [getOTP, setGetOTP] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [verifyOTP, setVerifyOTP] = useState("");
    const [otpId, setOtpId] = useState("");


    const userInputData = (e) => {
        const { name, value } = e.target;
        setUser((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const sendOTP = async () => {
        try {
            if (user.email) {
                const res = await axios.post(`/api/generate-otp`, { email: user.email, resetPassword: true })
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
            if (error?.response?.status === 404) {
                toast(error?.response?.data?.msg)
            }
            if (error?.response?.status === 500) {
                toast(error?.response?.data?.msg)
            }
        }
    }
    const verifictaionOTP = async () => {
        // console.log(verifyOTP)
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

    const resetNewPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put("/api/login", user);
            if (res?.status === 200) {
                toast(res?.data?.msg)
                router.push(`/login?query=${user.email}`)
            }
        } catch (error) {
            if (error?.response?.status === 500) {
                toast(error?.response?.data?.msg)
            }
        }
    }
    return (
        <section className="w-full">
            <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] m-auto my-5 p-5 flex flex-col items-center justify-center shadow-lg">
                <Heading name={"Reset Password"} />
                <form className="w-full flex flex-col items-center" ref={ref} onSubmit={resetNewPassword} >
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
                            <Button type={"button"} btnName={`${getOTP ? 'Resend OTP' : 'Send OTP'}`} onClick={sendOTP} btnStyle={"w-[7rem] p-1 absolute top-12 right-4"} />
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
                            <Button type={"button"} btnName={"Verify OTP"} onClick={verifictaionOTP} btnStyle={"w-[7rem] p-1 absolute top-12 right-4"} />
                        </div>
                    }
                    {
                        otpVerified &&
                        <div className="w-full flex flex-col items-center">
                            <Input
                                type={"password"}
                                placeholder={"Enter Password..."}
                                name={"password"}
                                value={user.password}
                                onChange={userInputData}
                                label={"Password"}
                                htmlFor={"password"}
                            />
                            <Button type={"submit"} btnStyle={'w-[10rem] p-2'} btnName={"Reset Password"} />
                        </div>
                    }
                </form>
            </div>
        </section>
    )
}

export default page