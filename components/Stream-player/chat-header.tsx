"use client"

import { Skeleton } from "../ui/skeleton"
import { ChatModeToggle } from "./chat-mode-toggle"
import { ChatToggle } from "./chatbar-toogle"

export const ChatHeader = () => {
    return (
        <div className="flex justify-center items-center p-3 border-b relative">
            <div className="absolute left-2 hidden lg:block">
                <ChatToggle />
            </div>
            <p className="font-medium text-base">Live chat</p>
            <div className="absolute right-2">
                <ChatModeToggle />
            </div>
        </div>
    )
}

export const ChatHeaderSkeleton = () => {
    return (
        <div className="p-3 justify-between flex items-center border-b">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="w-20 h-5 rounded" />
            <Skeleton className="w-5 h-5 rounded" />
        </div>  
    )
}