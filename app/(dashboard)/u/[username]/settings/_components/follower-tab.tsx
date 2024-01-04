"use client"

import { UserAvatar } from "@/components/Globals/User-Avatar";
import { metadataProps } from "@/lib/type";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface props {
    Followers: {
        follower: metadataProps
    }[]
}

export const FollowersTab = ({ Followers }: props) => {
    return (
        <ScrollArea className="h-[calc(100vh-350px)] rounded-md bg-muted p-4">
 
            {Followers.length === 0 && (
                <p className="text-center text-sm text-muted-foreground my-6">Looks like no one follows you!</p>
            )}
            <div className="h-full w-full flex flex-col">
                { Followers.length > 0 && Followers.map((data, i) => (
                    <>
                        <div className="flex justify-between items-center w-full" key={data.follower.id}>
                            <div className="flex items-center gap-3">
                                <UserAvatar
                                    username={data.follower.name}
                                    imageUrl={data.follower.image || ''}
                                    size='md'
                                />
                                <div>
                                    <p className="font-medium text-base">{data.follower.name}</p>
                                    <p className="text-xs text-muted-foreground">@{data.follower.username}</p>
                                </div>
                            </div>
                        </div>
                        {i < (Followers.length - 1) && (
                            <Separator className="my-4 bg-white/10" />
                        )}
                    </>
                ))}
            </div>
        </ScrollArea>
    )
}