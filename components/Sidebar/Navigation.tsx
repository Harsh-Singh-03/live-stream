"use client";

import { usePathname } from "next/navigation";
import {
    Fullscreen,
    KeyRound,
    MessageSquare,
    Settings2,
} from "lucide-react";

import { NavItem } from "./nav-item";

interface props{
    username: string
}

export const Navigation = ({username}: props) => {
    
    const pathname = usePathname();

    const routes = [
        {
            label: "Stream",
            href: `/u/${username}`,
            icon: Fullscreen,
        },
        {
            label: "Keys",
            href: `/u/${username}/keys`,
            icon: KeyRound,
        },
        {
            label: "Chat",
            href: `/u/${username}/chat`,
            icon: MessageSquare,
        },
        {
            label: "Settings",
            href: `/u/${username}/settings`,
            icon: Settings2,
        },
    ];

    return (
        <ul className="space-y-4 px-2 mt-3 md:mt-4">
            {routes.map((route) => (
                <NavItem
                    key={route.href}
                    label={route.label}
                    icon={route.icon}
                    href={route.href}
                    isActive={pathname === route.href}
                />
            ))}
        </ul>
    );
};