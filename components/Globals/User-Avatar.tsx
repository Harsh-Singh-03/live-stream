"use client"
import { cva, type VariantProps } from "class-variance-authority";

import { cn, stringToColor } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { LiveBadge } from "./live-badge";
import { useCustom } from "@/context/Customhook";


const avatarSizes = cva(
  "",
  {
    variants: {
      size: {
        default: "h-8 w-8",
        md: 'h-10 w-10',
        lg: "h-14 w-14",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface UserAvatarProps
  extends VariantProps<typeof avatarSizes> {
  username: string;
  imageUrl?: string;
  isLive?: boolean;
  isBadge? : boolean
};

export const UserAvatar = ({
  username,
  imageUrl,
  isLive,
  size,
  isBadge
}: UserAvatarProps) => {
  const {isleftBar} = useCustom()
  const color = stringToColor(username)

  const isBadgeHidden = !isBadge && !isleftBar

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl || ""} className="object-cover" />
        <AvatarFallback className={cn(
          "uppercase font-semibold",
          size === 'lg' && 'text-xl'
        )}
        style={{background: color}}>
          {username[0]}
        </AvatarFallback>
      </Avatar>
      {(isLive || isBadge) && (
        <div className={cn(
          "absolute -bottom-3 left-1/2 transform -translate-x-1/2",
          isBadgeHidden && "md:hidden"
        )}>
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

interface UserAvatarSkeletonProps 
  extends VariantProps<typeof avatarSizes> {};

export const UserAvatarSkeleton = ({
  size,
}: UserAvatarSkeletonProps) => {
  return (
    <Skeleton className={cn(
      "rounded-full",
      avatarSizes({ size }),
    )} />
  );
};