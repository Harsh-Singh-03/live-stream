"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustom } from "@/context/Customhook";
import { UserAvatar } from "@/components/Globals/User-Avatar";
import { LiveBadge } from "@/components/Globals/live-badge";

interface UserItemProps {
  username: string;
  imageUrl?: string;
  isLive?: boolean;
};

export const UserItem = ({
  username,
  imageUrl,
  isLive,
}: UserItemProps) => {

  const pathname = usePathname();

  const { isleftBar }: any = useCustom()

  const href = `/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12 px-2",
        isleftBar ? "justify-center" : "justify-center md:justify-start",
        isActive && "bg-accent",
      )}
    >
      <Link href={href}>
        <div className={cn(
          "flex items-center w-full gap-x-4",
          isleftBar ? "justify-center" : "justify-center md:justify-start",
        )}>
          <UserAvatar
            imageUrl={imageUrl || ''}
            username={username}
            isLive={isLive}
          />
          {!isleftBar && (
            <p className="truncate hidden md:block">
              {username}
            </p>
          )}
          {!isleftBar && isLive && (
            <LiveBadge className="ml-auto hidden md:inline" />
          )}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};