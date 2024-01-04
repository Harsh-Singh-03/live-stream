"use client"

import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { UserAvatar, UserAvatarSkeleton } from "../Globals/User-Avatar";
import { UserIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Actions, ActionsSkeleton } from "./actions";

interface props {
    imageUrl: string;
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    isFollowing: boolean;
    name: string;
}
export const Header = ({ imageUrl, hostIdentity, isFollowing, hostName, name, viewerIdentity }: props) => {
    const participants = useParticipants()
    const participant = useRemoteParticipant(hostIdentity)
    const isLive = !!participant
    const participantCount = participants.length - 1

    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    return (
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-3">
                <UserAvatar
                    imageUrl={imageUrl}
                    username={name}
                    size="lg"
                    isLive={isLive}
                    isBadge={isLive}
                />
                <div>
                    <h4 className="text-lg font-semibold">{name}</h4>
                    <p className="text-sm font-medium text-muted-foreground mb-1">@{hostName}</p>
                    {isLive ? (
                        <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                            <UserIcon className="h-4 w-4" />
                            <p>
                                {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
                            </p>
                        </div>
                    ) : (
                        <p className="font-semibold text-xs text-muted-foreground">
                            Offline
                        </p>
                    )}
                </div>
            </div>
            <Actions hostIdentity={hostIdentity} isFollowing={isFollowing} isHost={isHost} />
        </div>
    )
}

export const HeaderSkeleton = () => {
    return (
      <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
        <div className="flex items-center gap-x-2">
          <UserAvatarSkeleton size="lg" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <ActionsSkeleton />
      </div>
    );
  };