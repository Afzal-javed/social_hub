import LoginPage from "@/components/Login/LoginPage";
import { Suspense } from "react";

const page = () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
        </Suspense>
    );
};

export default page;