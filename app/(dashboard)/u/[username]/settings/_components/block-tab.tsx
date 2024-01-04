"use client"

import { UserAvatar } from "@/components/Globals/User-Avatar";
import { metadataProps } from "@/lib/type";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ActionUnblock } from "./action-unblock";

interface props {
    Block: {
        blocked: metadataProps
    }[]
}

export const BlockTab = ({ Block }: props) => {
    return (
        <ScrollArea className="h-[calc(100vh-350px)] rounded-md bg-muted p-4">
 
            {Block.length === 0 && (
                <p className="text-center text-sm text-muted-foreground my-6">You did not block anyone!</p>
            )}
            <div className="h-full w-full flex flex-col">
                { Block.length > 0 && Block.map((data, i) => (
                    <>
                        <div className="flex justify-between items-center w-full" key={data.blocked.id}>
                            <div className="flex items-center gap-3">
                                <UserAvatar
                                    username={data.blocked.name}
                                    imageUrl={data.blocked.image || ''}
                                    size='md'
                                />
                                <div>
                                    <p className="font-medium text-base">{data.blocked.name}</p>
                                    <p className="text-xs text-muted-foreground">@{data.blocked.username}</p>
                                </div>
                            </div>
                            <ActionUnblock id={data.blocked.id} username={data.blocked.username} />
                        </div>
                        {i < (Block.length - 1) && (
                            <Separator className="my-4 bg-white/10" />
                        )}
                    </>
                ))}
            </div>
        </ScrollArea>
    )
}