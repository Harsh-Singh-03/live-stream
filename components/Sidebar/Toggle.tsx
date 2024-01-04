"use client"
import { Hint } from "@/components/Globals/Hint"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useCustom } from "@/context/Customhook"
import { cn } from "@/lib/utils"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"

interface props{
    isDashBoard?: boolean
}
export const Toggle = ({isDashBoard}: props) => {

    const { isleftBar, setIsLeftBar }: any = useCustom()

    return (

        <div id="toggle" className={cn(
            "flex w-full items-center",
            isleftBar ? 'justify-end' : "justify-between"
        )}>

            {!isleftBar && (
                <p className="font-semibold text-primary hidden md:block ml-2">
                    {isDashBoard === true ? 'Dashboard' : 'For You'}
                </p>
            )}

            <Hint label={isleftBar ? 'Expand' : 'Collapse'} side="right" asChild>
                <Button
                    onClick={() => (setIsLeftBar(!isleftBar))}
                    variant="ghost"
                    className="h-auto p-2 hidden md:block">
                    {isleftBar === true ? (
                        <ArrowRightFromLine className="h-4 w-4" />
                    ) : (
                        <ArrowLeftFromLine className="h-4 w-4" />
                    )}
                </Button>
            </Hint>
        </div>

    )
}

export const ToggleSkeleton = () => {
    return (
        <div className="p-3 mb-2 hidden lg:flex items-center justify-between w-full">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-6" />
        </div>
    )
}
