type Streamtype = {
    name: string;
    id: string;
    serverUrl: string | null;
    thumbnailUrl: string | null;
    streamKey: string | null;
    isLive: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}
type countProps = {
    following: number,
    followedBy: number,
    blocking: number
}
export type metadataProps = {
    id: string,
    name: string,
    username: string,
    image: string | null,
}
export type userProps = {
    id: string,
    username: string,
    name: string,
    isEmailVerified: boolean,
    image: string | null,
    email: string,
    bio: string | null,
    _count: countProps
    Stream: Streamtype | null
}
export type props = {
    user: userProps,
    following: {
        following: metadataProps
    }[],
    followers: {
        follower: metadataProps
    }[],
    blocking: {
        blocked: metadataProps
    }[]
}
