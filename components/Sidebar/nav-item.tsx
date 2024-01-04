"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCustom } from "@/context/Customhook";

interface NavItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
    isActive: boolean
};

export const NavItem = ({
    icon: Icon,
    label,
    href,
    isActive
}: NavItemProps) => {

    const { isleftBar }: any = useCustom()

    return (
        <Button
            asChild
            variant="ghost"
            className={cn(
                "w-full",
                isleftBar ? "aspect-square justify-center" : "aspect-square md:aspect-auto justify-center md:justify-start md:h-12",
                isActive && "bg-accent",
            )}
        >
            <Link href={href}>
                <div className="flex items-center gap-x-4">
                    <Icon className={cn(
                        "h-4 w-4",
                    )} />
                    {!isleftBar && (
                        <span className="hidden md:block">
                            {label}
                        </span>
                    )}
                </div>
            </Link>
        </Button>
    );
};
