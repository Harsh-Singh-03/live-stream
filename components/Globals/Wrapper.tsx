"use client"

import { useCustom } from "@/context/Customhook"
import { cn } from "@/lib/utils"

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const { isleftBar }: any = useCustom()
    return (
        <aside className={cn(
            "fixed left-0 flex flex-col w-[70px] md:w-60 p-2 h-full bg-background border-r border-[#2D2E35] z-50 transition",
            isleftBar === true && "w-[70px] md:w-[70px]")}>
            {children}
        </aside>
    )
}

export default Wrapper
