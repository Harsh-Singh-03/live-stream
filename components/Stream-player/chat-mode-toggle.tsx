"use client"

import { ChatVariantType, useCustom } from "@/context/Customhook"
import { MessagesSquare, Users } from "lucide-react"
import { Hint } from "../Globals/Hint"
import { Button } from "../ui/button"

export const ChatModeToggle = () => {
    
    const { chatVariant, setChatVariant } = useCustom()
    const isChat = chatVariant === ChatVariantType.CHAT
    const Icon = isChat ? Users : MessagesSquare
    const label = isChat ? 'Community' : 'Chats'

    const onToggle = () => {
        const newVariant = isChat ? ChatVariantType.COMMUNITY : ChatVariantType.CHAT;
        setChatVariant(newVariant);
    };

    return (
        <Hint label={label} side="left" asChild>
            <Button
                onClick={onToggle}
                variant="ghost"
                className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
            >
                <Icon className="h-4 w-4" />
            </Button>
        </Hint>
    )
}