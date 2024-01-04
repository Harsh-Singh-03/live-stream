"use client"

import { Input } from "@/components/ui/input"
import { CopyButton } from "./copy-button"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { EyeIcon, EyeOff } from "lucide-react"

interface props {
    value: string | null
}

export const KeyCard = ({ value }: props) => {
    const [show, setShow] = useState(false);

    const Icon = show ? EyeIcon : EyeOff
    return (
        <div className="rounded-md bg-muted p-4 md:p-6">
            <div className="flex md:items-center flex-col md:flex-row gap-4 md:gap-6">
                <p className="font-semibold shrink-0">
                    Server Key :
                </p>
                <div className="space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-2">
                        <Input
                            type={show ? "text" : "password"}
                            value={value || ""}
                            disabled
                            placeholder="Server URL"
                        />
                        <Button
                            onClick={() => setShow(!show)}
                            size="sm"
                            disabled={value ? false : true}
                            variant="ghost"
                            className="absolute z-20 right-[72px] md:right-24"
                        >
                            <Icon className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <CopyButton
                            value={value || ""}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}