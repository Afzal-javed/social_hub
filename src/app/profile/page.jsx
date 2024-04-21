import ProfileSection from "@/components/Section/ProfileSection/ProfileSection";
import { useParams } from "next/navigation"

const page = () => {
    const isMobile = true;
    return (
        <div className="w-full h-full">
            <ProfileSection isMobile={isMobile} />
        </div>
    )
}

export default page