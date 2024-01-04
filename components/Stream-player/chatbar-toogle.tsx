"use client"

import { useCustom } from "@/context/Customhook"
import { Hint } from "../Globals/Hint"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"
import { Button } from "../ui/button"

export const ChatToggle = () => {
    const {isRightBar, setIsRightBar}: any = useCustom()
    return (
        <Hint label={isRightBar ? 'Expand' : 'Collapse'} side="left" asChild>
            <Button
                onClick={() => (setIsRightBar(!isRightBar))}
                variant="ghost"
                className="h-auto p-2 hidden md:block">
                {isRightBar === true ? (
                    <ArrowLeftFromLine className="h-4 w-4" />
                ) : (
                    <ArrowRightFromLine className="h-4 w-4" />
                )}
            </Button>
        </Hint>
    )
}