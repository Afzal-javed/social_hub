
import FriendProfile from '@/components/FriendProfile/FriendProfile'
import { Suspense } from 'react'


const page = () => {

    return (
        <Suspense fallback={<div>Loading friend data...</div>}>
            <FriendProfile />
        </Suspense>
    )
}

export default page