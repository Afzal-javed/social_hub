"use client"
import Button from "@/components/UsableComponents/Button/Button";
import Input from "@/components/UsableComponents/Input/Input"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const page = () => {
    const router = useRouter();
    const userData = useSelector((state) => state.user)
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    }
    const cancelInput = () => {
        setSelectedImage(null)
        setDescription('')
    }

    const postUpload = async () => {
        try {
            if (selectedImage) {
                const formData = new FormData();
                formData.append("firstName", userData.firstName);
                formData.append("lastName", userData.lastName);
                formData.append("profile", userData.profile);
                formData.append("userId", userData.id);
                formData.append("description", description);
                formData.append("post", selectedImage)
                const res = await axios.post("/api/posts", formData);
                if (res.status === 200) {
                    toast(res?.data?.msg)
                    router.push("/");
                }
            } else {
                return toast("Please choose the image")
            }
        } catch (error) {
            if (error?.response?.status === 500) {
                toast(error?.response?.data?.msg)
            }
        }
    }
    return (
        <div className="w-full">
            <div className="w-[80%] lg:w-[65%] xl:w-[60%] m-auto flex flex-col items-center gap-3 shadow-lg p-4 mt-6">
                <Input type={"text"} placeholder={"Post Description"} label={"Desription"} htmlFor={"description"} name={"description"} value={description} onChange={(e) => setDescription(e.target.value)} />
                <div className="w-full h-[10rem] border-dashed border-2 border-slate-500  flex flex-col items-center justify-center px-3 ">
                    {
                        selectedImage ? <p className="w-full text-center text-lg">{selectedImage.name}</p>
                            :
                            <label htmlFor="post">
                                <p className=" text-lg text-center w-full">Image</p>
                                <input type="file" id="post" className="hidden" onChange={handleImageChange} />
                            </label>
                    }
                </div>
                <div className="w-full flex items-center justify-between ">
                    <Button btnName={"Cancel"} onClick={cancelInput} btnStyle={"w-[8rem] p-2"} type={"button"} />
                    <Button btnName={"Post"} onClick={postUpload} btnStyle={"w-[8rem] p-2"} type={"button"} />
                </div>
            </div>
        </div>
    )
}

export default page