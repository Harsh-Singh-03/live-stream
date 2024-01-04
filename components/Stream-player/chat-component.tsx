"use client"

import { ChatHeader, ChatHeaderSkeleton } from "./chat-header"
import { ChatVariantType, useCustom } from "@/context/Customhook"
import { ConnectionState } from 'livekit-client'
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react"
import { useMemo, useState } from "react"
import { ChatForm, ChatFormSkeleton } from "./chat-form"
import { ChatList, ChatListSkeleton } from "./chat-list"
import { ChatCommunity } from "./chat-community"

interface props {
    hostId: string,
    hostName: string,
    viewerName: string,
    isChatDelayed: boolean,
    isFollowing: boolean,
    isChatFollowersOnly: boolean,
    isChatEnabled: boolean
}

export const ChatComponent = ({ hostId, isChatEnabled, hostName, viewerName, isChatDelayed, isFollowing, isChatFollowersOnly }: props) => {

    const { chatVariant } = useCustom()
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostId)
    // isOnline for checking is host is live & isHidden will check also chat is enable or  not
    const isOnline = connectionState === ConnectionState.Connected && participant
    const isHidden = !isChatEnabled || !isOnline;
    // Message input value
    const [value, setValue] = useState("")
    // Getting message from useChat component of live kit and send fucntion also
    const { chatMessages: messages, send } = useChat()
    // onChange for msg input value
    const onChange = (value: string) => {
        setValue(value)
    }
    // for ui part reversing msg
    const reversedMessages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp);
    }, [messages]);
    // Message send fucntion
    const onSubmit = () => {
        if (!send) return;

        send(value);
        setValue("");
    };

    return (
        <div className="w-full lg:w-80 flex flex-col bg-background min-h-[calc(100vh-64px)] border-l border-b border-2">
            <ChatHeader />
            {chatVariant === ChatVariantType.CHAT && (
                <>
                    <ChatList isHidden={isHidden} messages={reversedMessages} />
                    <ChatForm
                        onSubmit={onSubmit}
                        value={value}
                        onChange={onChange}
                        isHidden={isHidden}
                        isFollowersOnly={isChatFollowersOnly}
                        isDelayed={isChatDelayed}
                        isFollowing={isFollowing}
                    />
                </>
            )}
            {chatVariant === ChatVariantType.COMMUNITY && (
                <ChatCommunity hostName={hostName} isHidden={isHidden} viewerName={viewerName} />
            )}
        </div>
    )
}

export const ChatSkeleton = () => {
    return (
        <div className="w-full lg:w-80 flex flex-col bg-background min-h-[calc(100vh-64px)] border-l border-b border-2">
            <ChatHeaderSkeleton />
            <ChatListSkeleton/>
            <ChatFormSkeleton />
        </div>
    )
}