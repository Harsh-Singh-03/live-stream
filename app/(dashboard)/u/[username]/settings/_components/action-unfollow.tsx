"use client"

import { onUnfollow } from "@/actions/Follow"
import { Hint } from "@/components/Globals/Hint"
import { Button } from "@/components/ui/button"
import { MinusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

export const ActionUnfollow = ({ id, username }: { id: string, username: string }) => {

    const [isPending, startTransition] = useTransition()

    const router = useRouter()
    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(id)
                .then((data) => {
                    toast.success(`You have unfollowed ${username}`);
                    router.refresh()
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    return (
        <Hint label="Unfollow">
            <Button variant="ghost" className="hover:bg-background text-muted-foreground" size='sm' disabled={isPending} onClick={handleUnfollow}>
                <MinusCircle className="w-4 h-4" />
            </Button>
        </Hint>
    )
}