"use client"

import { onFollow, onUnfollow } from "@/actions/Follow";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface props {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean;
}
export const Actions = ({ hostIdentity, isFollowing, isHost }: props) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`You are now following ${data}`))
                .catch(() => toast.error("Something went wrong"))
        });
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) => toast.success(`You have unfollowed ${data}`))
                .catch(() => toast.error("Something went wrong"))
        });
    }

    const toggleFollow = () => {
        if (isHost) return;

        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    }

    return (
        <Button
            disabled={isPending || isHost}
            onClick={toggleFollow}
            variant="primary"
            size="sm"
            className="w-full lg:w-auto"
        >
            <Heart className={cn(
                "h-4 w-4 mr-2",
                isFollowing
                    ? "fill-white"
                    : "fill-none"
            )} />
            {isFollowing
                ? "Unfollow"
                : "Follow"
            }
        </Button>
    )
}
export const ActionsSkeleton = () => {
    return (
      <Skeleton className="h-10 w-full lg:w-24" />
    );
};