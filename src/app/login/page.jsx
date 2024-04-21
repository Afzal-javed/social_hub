'use client'
import { useState } from "react";
import Input from "@/components/UsableComponents/Input/Input";
import Button from "@/components/UsableComponents/Button/Button";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Heading from "@/components/UsableComponents/Heading/Heading";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { loginUser } from "@/redux/Slice/userSlice";
// import Cookies from "js-cookie";



const page = () => {
    const router = useRouter();
    // const dispatch = useDispatch();
    const search = useSearchParams();
    const userEmail = search.get('query');
    const [user, setUser] = useState({
        email: userEmail || "",
        password: "",
    })
    const userInputData = (e) => {
        const { name, value } = e.target;
        setUser((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const userLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/login", user)
            if (res?.status === 200) {
                toast(`${res?.data?.user?.firstName} Login successfully`)
                localStorage.setItem("id", res?.data?.user?._id)
                // dispatch(loginUser(res?.data?.user));
                // cookies.set("token", res?.data?.token, { expires: 1 });
                router.push("/");
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

    return (
        <section className="w-full">
            <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] m-auto my-5 p-5 flex flex-col items-center justify-center shadow-lg">
                <Heading name={"Welcome to Login"} />
                <form className="w-full flex flex-col items-center" onSubmit={userLogin}>
                    <Input
                        type={"email"}
                        placeholder={"Enter Your Email..."}
                        name={"email"}
                        value={user.email}
                        onChange={userInputData}
                        label={"Email"}
                        htmlFor={"email"}
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
                    <Button type={"submit"} btnStyle={'w-[10rem] p-1.5'} btnName={"Login"} />
                </form>
                <p className="w-full text-center text-slate-500 text-lg my-2"><Link className="cursor-pointer text-black" href={"/resetPassword"}>Forget Password</Link></p>
                <p className="w-full text-center text-slate-500 text-lg my-2">Don't have an accout ? <Link className="cursor-pointer text-black" href={"/register"}>Register</Link></p>
            </div>
        </section>
    )
}

export default page