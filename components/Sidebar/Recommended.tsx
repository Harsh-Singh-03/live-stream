"use client"

import UserItemSkeleton from '@/components/Skeletons/UserItemSkeleton'
import { useCustom } from '@/context/Customhook'
import { UserItem } from './user-item'

interface UserProps {
    id: string,
    name: string,
    username: string,
    image: string | null,
    isEmailVerified: boolean,
    Stream: {
        isLive: boolean
    } | null
}
interface props {
    data: UserProps[]
}
export const Recommended = ({ data }: props) => {

    const { isleftBar }: any = useCustom()
    const showLabel = data.length > 0;

    return (
        <div>
            {showLabel && (
                <div className="ml-2 my-3 md:block">
                    <p className="truncate text-sm text-muted-foreground">
                        Recommended
                    </p>
                </div>
            )}
            <ul className="space-y-2">
                {data.map((user) => (
                    <UserItem
                        key={user.id}
                        username={user.username}
                        imageUrl={user.image || undefined}
                        isLive={user.Stream?.isLive || false}
                    />
                ))}
            </ul>
        </div>
    )

}
export const RecommendedSkeleton = () => {
    return (
        <ul className="">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}

