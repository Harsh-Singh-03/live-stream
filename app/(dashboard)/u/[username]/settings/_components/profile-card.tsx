"use client"

import { UserAvatar } from "@/components/Globals/User-Avatar"
import { UserModal } from "./user-modal"
import { AlertBox } from "./alert"
import { props } from "@/lib/type"
import { Skeleton } from "@/components/ui/skeleton"

export const ProfileCard = ({ user, following, followers, blocking }: props) => {
    return (
        <div className="flex-1 rounded-md p-4 md:p-6 bg-background">
            {!user.isEmailVerified && (
                <AlertBox email={user.email} />
            )}
            <div className='flex items-center md:items-start gap-x-3'>
                <UserAvatar
                    username={user.name}
                    isLive={false}
                    size='lg'
                    imageUrl={user.image || ""}
                />
                <div>
                    <h2 className="text-base lg:text-lg font-semibold capitalize">
                        {user.name}
                    </h2>
                    <p className="text-muted-foreground text-xs lg:text-sm">
                        @{user.username}
                    </p>
                </div>
                <UserModal user={user} following={following} followers={followers} blocking={blocking} />
            </div>
            {user.Stream && user.Stream.streamKey && (
                <div className="my-4 md:m-4">
                    <span className="text-base text-muted-foreground">Stream : {"  "}</span>
                    <span className="text-sm">{user.Stream.name}</span>
                </div>
            )}
            <div className="flex flex-col md:flex-row gap-x-4 gap-y-2 my-4 md:mx-4 text-sm lg:text-base">
                <div className="flex items-center gap-x-4">
                    <span className="text-muted-foreground text-sm"><span className="text-white text-base">{user._count.following}</span> Following</span>
                    <span className="text-muted-foreground text-sm"><span className="text-white text-base">{user._count.followedBy}</span> Followers</span>
                </div>
            </div>
            {user.bio && (
                <div className="md:px-4 text-sm lg:text-base">
                    <p className="text-base mb-2">Bio : </p>
                    <p className="text-sm text-muted-foreground">{user.bio || ""}</p>
                </div>
            )}
        </div>
    )
}

export const ProfileCardSkeleton = () => {
    return (
        <div className="flex-1 rounded-md p-4 md:p-6 bg-background">
            <div className="flex items-center md:items-start gap-x-3">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div>
                     <Skeleton className="h-4 w-[100px] rounded-sm mb-2" />
                     <Skeleton className="h-4 w-[100px] rounded-sm" />
                </div>
                 <Skeleton className="h-6 w-[60px] rounded-sm ml-auto" />
            </div>
            <div className="flex flex-col gap-4 my-4 md:mx-4">
                <Skeleton className="h-6 w-[200px] rounded-sm" />
                <Skeleton className="h-6 w-[200px] rounded-sm" />
                <Skeleton className="h-6 w-[200px] rounded-sm" />
                 <Skeleton className="h-6 w-[200px] rounded-sm" />
            </div>
        </div>
    )
}