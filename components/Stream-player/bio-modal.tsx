"use client"

import { updateUserField } from "@/actions/User"
import { FormEvent, useRef, useState, useTransition } from "react"
import { toast } from "sonner"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

interface props {
    initialValue: string
}
export const BioModal = ({ initialValue }: props) => {

    const closeRef = useRef<HTMLButtonElement>(null)
    const [value, setValue] = useState(initialValue || "")
    const [isPending, startTransition] = useTransition()

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()

        if(value === initialValue){
            closeRef.current?.click();
            return;
        }

        startTransition(() => {
            updateUserField({ bio: value })
                .then(() => {
                    toast.success("User bio updated");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-md">
                <DialogHeader>
                    <DialogTitle>Bio</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea
                        placeholder="User bio"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        disabled={isPending}
                        required
                        className="resize-none rounded-md border-white/10"
                    />
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            type="submit"
                            variant="primary"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}