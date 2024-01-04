"use client"

import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { ElementRef, FormEvent, useRef, useState, useTransition } from "react"
import { updateStream } from "@/actions/Stream"
import { toast } from "sonner"
import { Input } from "../ui/input"
import { Hint } from "../Globals/Hint"
import { Trash } from "lucide-react"
import Image from "next/image"
import { UploadDropzone } from "@/lib/uploadthing"

interface props {
    initialName: string,
    initialThumbnailUrl: string
}
export const InfoModal = ({ initialName, initialThumbnailUrl }: props) => {
    const [isPending, startTransition] = useTransition();
    const closeRef = useRef<ElementRef<"button">>(null);
    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

    const onRemove = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
                .then(() => {
                    toast.success("Thumbnail removed");
                    setThumbnailUrl("");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
        });
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        if(!name || name === initialName) {
            closeRef?.current?.click();
            return
        }
        startTransition(() => {
            updateStream({ name: name })
                .then(() => {
                    toast.success("Stream updated");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }

    const onUpdate = (url: string) => {
        if (!url) {
            toast.error('Something went wrong!')
            return;
        }
        startTransition(() => {
            updateStream({ thumbnailUrl: url })
                .then(() => {
                    toast.success("Thumbnail updated!");
                    setThumbnailUrl(url);
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto ">Edit</Button>
            </DialogTrigger>
            <DialogContent className="rounded-md">
                <DialogHeader>
                    <DialogTitle>
                        Edit Stream Info
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Name</p>
                        <Input
                            placeholder="User bio"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            disabled={isPending}
                            required
                            className="resize-none rounded-md border-white/10"
                        />

                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium">
                            Thumbnail
                        </p>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint label="Remove thumbnail" asChild side="left">
                                        <Button
                                            type="button"
                                            disabled={isPending}
                                            onClick={onRemove}
                                            className="h-auto w-auto p-1.5"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image
                                    alt="Thumbnail"
                                    src={thumbnailUrl}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone
                                    endpoint="imageUploader"
                                    appearance={{
                                        label: {
                                            color: "#FFFFFF"
                                        },
                                        allowedContent: {
                                            color: "#FFFFFF"
                                        }
                                    }}
                                    onClientUploadComplete={(res) => {
                                        onUpdate(res?.[0]?.url);
                                    }}

                                />
                            </div>
                        )}
                    </div>
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