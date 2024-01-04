"use client"

import { onBlock, onUnblock } from "@/actions/Block"
import { onFollow, onUnfollow } from "@/actions/Follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"
interface props {
    isEmailVerified: boolean,
    isFollowing: boolean,
    userId: string,
    isSelf: boolean
}
const Action = ({ isEmailVerified, isFollowing, userId, isSelf }: props) => {

    const [isPending, startTransition] = useTransition()

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data}`))
                .catch(() => toast.error("Something went wrong"));
        });
    };

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You have unfollowed ${data}`))
                .catch(() => toast.error("Something went wrong"));
        });
    };

    const onClick = () => {
        if (!isEmailVerified) {
            toast.error('Please verify your email first !!')
            return ;
        }
        if (isFollowing) {
            handleUnfollow()
        } else {
            handleFollow()
        }
    }
    const block = () =>{
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`You blocked ${data}`))
                .catch(() => toast.error("Something went wrong"));
        });
    }
    const unblock = () =>{
        startTransition(() => {
            onUnblock(userId)
                .then((data) => toast.success(`You have unblocked ${data?.blocked.username}`))
                .catch(() => toast.error("Something went wrong"));
        });
    }

    return (
        <div className="flex gap-4">
            {!isSelf && (
                <>
                    <Button variant='primary' onClick={onClick} className="w-full" disabled={isPending}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                    <Button variant='primary' onClick={block} className="w-full" disabled={isPending}>
                        Block
                    </Button>
                    <Button variant='primary' onClick={unblock} className="w-full" disabled={isPending}>
                        unBlock
                    </Button>
                </>

            )}
        </div>
    )
}

export default Action