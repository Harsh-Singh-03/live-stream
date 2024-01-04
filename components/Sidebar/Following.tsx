"use client"

import UserItemSkeleton from '@/components/Skeletons/UserItemSkeleton'
import { UserItem } from './user-item'

interface followingProps {
    id: string;
    following: {
        Stream: {
            isLive: boolean;
        } | null;
        id: string;
        username: string;
        name: string;
        image: string | null;
        isEmailVerified: boolean;
    }
}
interface props {
    data: followingProps[];
}
export const Following = ({ data }: props) => {
    const showLabel = data.length > 0;

    return (
        <div>
            {showLabel && (
                <div className="ml-2 my-3 md:block">
                    <p className="truncate text-sm text-muted-foreground">
                        Followings
                    </p>
                </div>
            )}
            <ul className="space-y-2">
                {data.map((follow) => (
                    <UserItem
                        key={follow.following.id}
                        username={follow.following.username}
                        imageUrl={follow.following.image || undefined}
                        isLive={follow.following.Stream?.isLive}
                    />
                ))}
            </ul>
        </div>
    )

}
export const FollowingSkeleton = () => {
    return (
        <ul className="">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}

