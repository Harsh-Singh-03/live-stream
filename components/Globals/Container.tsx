"use client"

import { useCustom } from "@/context/Customhook"
import { cn } from "@/lib/utils"

const Container = ({children}: {children: React.ReactNode}) => {
    const {isleftBar}: any = useCustom()
  return (
    <section className={cn(
        "flex-1",
        isleftBar ? "ml-[70px]" : "ml-[70px] md:ml-60"
      )}>
        {children}
    </section>
  )
}

export default Container