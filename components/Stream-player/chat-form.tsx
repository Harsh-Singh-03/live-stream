"use client"

import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChatInfo } from "./chat-info";

interface props {
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    isHidden: boolean;
    isFollowersOnly: boolean;
    isFollowing: boolean;
    isDelayed: boolean;
}

export const ChatForm = ({
    onSubmit,
    value,
    onChange,
    isHidden,
    isFollowersOnly,
    isFollowing,
    isDelayed,
}: props) => {

    const [isDelayBlocked, setIsDelayBlocked] = useState(false);

    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
    const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

    if (isHidden) {
        return null;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!value || isDisabled) return;

        if (isDelayed && !isDelayBlocked) {
          setIsDelayBlocked(true);
          setTimeout(() => {
            setIsDelayBlocked(false);
            onSubmit();
          }, 3000);
        } else {
          onSubmit();
        }
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-y-4 p-3"
        >
            <div className="w-full">
                {(isFollowersOnly || isDelayed) && (
                    <ChatInfo
                        isDelayed={isDelayed}
                        isFollowersOnly={isFollowersOnly}
                    />
                )}
                <Input
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    disabled={isDisabled}
                    placeholder="Send a message"
                    className={cn(
                        "border-white/10",
                        (isFollowersOnly || isDelayed) && "rounded-t-none border-t-0"
                    )}
                />
            </div>
            <div className="ml-auto">
                <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isDisabled}
                >
                    Chat
                </Button>
            </div>
        </form>
    )
}

export const ChatFormSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-y-4 p-3">
            <Skeleton className="w-full h-10" />
            <div className="flex items-center gap-x-2 ml-auto">
                <Skeleton className="h-7 w-7" />
                <Skeleton className="h-7 w-12" />
            </div>
        </div>
    );
};