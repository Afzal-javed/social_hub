import ProfileSection from "@/components/Section/ProfileSection/ProfileSection";
import { useSelector } from "react-redux";
const page = () => {
    const isMobile = true;
    const userData = useSelector((state) => state.user);
    const post = useSelector((state) => state.posts);
    return (
        <div className="w-full h-full">
            <ProfileSection isMobile={isMobile} userData={userData} post={post} />
        </div>
    )
}

export default page