"use client"

import { ReceivedChatMessage } from "@livekit/components-react"
import { ChatMessage } from "./chat-message"
import { Skeleton } from "../ui/skeleton"

interface props {
    isHidden: boolean,
    messages: ReceivedChatMessage[]
}
export const ChatList = ({ isHidden, messages }: props) => {

    if (isHidden || !messages || messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    {isHidden ? "Chat is disabled" : "Welcome to the chat!"}
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col-reverse flex-1 overflow-y-auto p-3 h-full">
            {messages.map(msg => {
                return (
                    <ChatMessage
                        key={msg.timestamp}
                        data={msg}
                    />
                )
            })}

        </div>
    )
}

export const ChatListSkeleton = () => {
    return (
      <div className="flex flex-1 h-full items-center justify-center">
        <Skeleton className="w-1/2 h-6" />
      </div>
    );
  };