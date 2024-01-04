
import { getRecommomendedUser } from "@/lib/get-recommended"
import { Toggle, ToggleSkeleton } from "./Toggle"
import { Recommended, RecommendedSkeleton } from "./Recommended"
import { Separator } from "@/components/ui/separator"
import { getFollowedUser } from "@/lib/Follow-service"
import { Following, FollowingSkeleton } from "./Following"
import Wrapper from "../Globals/Wrapper"
import { Navigation } from "./Navigation"
// Sidebar for home page
export const LeftSideBar = async () => {
    const data = await getRecommomendedUser()
    const followings = await getFollowedUser()

    return (
        <Wrapper>
            <Toggle />
            <div className="">
                <Separator className='w-full mt-3 hidden md:block' />
                <Following data={followings} />
                {followings.length > 0 && (
                    <Separator className='w-full mt-3' />
                )}
                <Recommended data={data.data || []} />
                {data.data && data.data.length > 0 && (
                    <Separator className='w-full mt-3' />
                )}
            </div>
        </Wrapper>
    )
}

interface props {
    username: string
}
// Sidebar for creater dashboard
export const DashboardSideBar = ({ username }: props) => {

    return (
        <Wrapper>
            <Toggle isDashBoard={true} />
            <Separator className="w-full mt-3 hidden md:block" />
            <Navigation username={username} />
            <Separator className="w-full mt-4" />
        </Wrapper>
    )
}
// Home sidebar skeleton loader
export const SidebarSkeleton = async () => {
    return (
        <Wrapper>
            <ToggleSkeleton />
            <FollowingSkeleton />
            <RecommendedSkeleton />
        </Wrapper>
    )
}
