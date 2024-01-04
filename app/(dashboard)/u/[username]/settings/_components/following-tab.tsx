"use client"

import { UserAvatar } from "@/components/Globals/User-Avatar";
import { metadataProps } from "@/lib/type";
import { ActionUnfollow } from "./action-unfollow";
import { useEffect, useState, useTransition } from "react";
import { getUserFollowingById } from "@/actions/User";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface props {
    Followings: {
        following: metadataProps
    }[]
}

export const FollowingTab = ({ Followings }: props) => {
    // const [Followings, setFollowings] = useState<{ following: metadataProps }[]>([])
    // const [isPending, startTransition] = useTransition()

    // const getData = () => {
    //     startTransition(() => {
    //         getUserFollowingById(id)
    //             .then((data) => {
    //                 setFollowings(data || [])
    //             })
    //             .catch(() => toast.error("Something went wrong!"))
    //     })
    // }

    // useEffect(() => {
    //     return () => {
    //         console.log("inside effect")
    //         getData()
    //     }
    // }, [])

    // TODO -- Skeletons

    return (
        <ScrollArea className="h-[calc(100vh-350px)] rounded-md bg-muted p-4">
 
            {Followings.length === 0 && (
                <p className="text-center text-sm text-muted-foreground my-6">You are not following anyone currently!</p>
            )}
            <div className="h-full w-full flex flex-col">
                { Followings.length > 0 && Followings.map((data, i) => (
                    <>
                        <div className="flex justify-between items-center w-full" key={data.following.id}>
                            <div className="flex items-center gap-3">
                                <UserAvatar
                                    username={data.following.name}
                                    imageUrl={data.following.image || ''}
                                    size='md'
                                />
                                <div>
                                    <p className="font-medium text-base">{data.following.name}</p>
                                    <p className="text-xs text-muted-foreground">@{data.following.username}</p>
                                </div>
                            </div>
                            <ActionUnfollow id={data.following.id} username={data.following.username} />
                        </div>
                        {i < (Followings.length - 1) && (
                            <Separator className="my-4 bg-white/10" />
                        )}
                    </>
                ))}
            </div>
        </ScrollArea>
    )
}