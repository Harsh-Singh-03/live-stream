"use client"

import { onUnblock } from "@/actions/Block"
import { Hint } from "@/components/Globals/Hint"
import { Button } from "@/components/ui/button"
import { MinusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

export const ActionUnblock = ({ id, username }: { id: string, username: string }) => {

    const [isPending, startTransition] = useTransition()

    const router = useRouter()
    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(id)
                .then((data) => {
                    toast.success(`You unblocked ${username}!`);
                    router.refresh()
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    return (
        <Hint label="Unblock">
            <Button variant="ghost" className="hover:bg-background text-muted-foreground" size='sm' disabled={isPending} onClick={handleUnblock}>
                <MinusCircle className="w-4 h-4" />
            </Button>
        </Hint>
    )
}