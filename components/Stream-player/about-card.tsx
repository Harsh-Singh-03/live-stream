"use client"

import { BioModal } from "./bio-modal";

interface props {
    hostName: string,
    hostIdentity: string,
    viewerIdentity: string,
    bio: string,
    followedByCount: number
}
export const AboutCard = ({ hostName, bio, followedByCount, hostIdentity, viewerIdentity }: props) => {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;
    const followedByLabel = followedByCount === 1 ? "follower" : "followers";

    return (
        <div className="px-4 ">
            <div className="group rounded-md bg-background p-4 lg:p-6 flex flex-col gap-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
                        About: {hostName}
                    </h2>
                    {isHost && (
                        <BioModal initialValue={bio} />
                    )}
                </div>
                <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">
                        {followedByCount}
                    </span> {followedByLabel}
                </div>
                <p className="text-sm">
                    {bio || "This user prefers to keep an air of mystery about them."}
                </p>
            </div>
        </div>
    )
}