import Link from "next/link";
import { UserAvatar, UserAvatarSkeleton } from "./User-Avatar";
import { Skeleton } from "../ui/skeleton";
import { Thumbnail, ThumbnailSkeleton } from "./Thumbnail";

type response = {
    user: {
        id: string;
        name: string;
        username: string;
        image: string | null;
        bio: string | null;
        isEmailVerified: boolean;
    };
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
}
interface props {
    data: response
}

export const ResultCard = ({ data }: props) => {
    return (
        <Link href={`/${data.user.username}`}>
            <div className="h-full w-full space-y-4">
                <Thumbnail
                    src={data.thumbnailUrl}
                    fallback={data.user.image || ""}
                    isLive={data.isLive}
                    username={data.user.username}
                />
                <div className="flex gap-x-3 items-center">
                    <UserAvatar
                        username={data.name}
                        imageUrl={data.user.image || ""}
                        isLive={data.isLive}
                        isBadge={data.isLive}
                        size='md'
                    />
                    <div className="flex flex-col text-sm overflow-hidden">
                        <p className="truncate font-semibold hover:text-blue-500">
                            {data.name}
                        </p>
                        <p className="truncate text-muted-foreground">
                            @{data.user.username}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export const ResultCardSkeleton = () => {
    return (
      <div className="h-full w-full space-y-4">
        <ThumbnailSkeleton />
        <div className="flex gap-x-3">
          <UserAvatarSkeleton />
          <div className="flex flex-col gap-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24"/>
          </div>
        </div>
      </div>
    );
};