"use client"

import { useViewerToken } from "@/Hooks/use-viewer-token"
import ErrorPage from "../Globals/error"
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "./Video"
import { cn } from "@/lib/utils";
import { ChatComponent, ChatSkeleton } from "./chat-component";
import { useCustom } from "@/context/Customhook";
import { ChatToggle } from "./chatbar-toogle";
import { Header, HeaderSkeleton } from "./Header";
import { AboutCard } from "./about-card";
import { InfoCard } from "./info-card";

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
interface props {
  response: {
    id: string,
    username: string,
    name: string,
    isEmailVerified: boolean,
    image: string | null,
    email: string,
    bio: string | null,
    _count: {followedBy: number},
    Stream: Streamtype | null
  },
  isFollowing: boolean
}
export const StreamPlayer = ({ response, isFollowing }: props) => {
  // creating a user token so that they can watch & chat 
  const { token, name, identity, isLoad } = useViewerToken(response.id)
  const { isRightBar } = useCustom()

  // returing loading skeleton while the token is generating..
  if (isLoad) {
    return (
      <StreamPlayerSkeleton />
    )
  }
  // Return if we got any error while genrating token..
  if (!isLoad && (!token || !name || !identity)) {
    return (
      <ErrorPage />
    )
  }
  
  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      className={cn(
        "flex flex-col lg:flex-row",
      )}
    >
      {isRightBar && (
        <div className="fixed top-[74px] right-4 z-50 hidden lg:block">
          <ChatToggle />
        </div>
      )}

      <div className="space-y-4 w-full lg:w-[calc(100%-200px)] lg:max-h-[calc(100vh-64px)] lg:max-w-7xl mx-auto lg:overflow-y-scroll hidden-scrollbar pb-4 lg:pb-6">
        <Video hostId={response.id} hostName={response.username} />
        <Header
            hostIdentity={response.id}
            hostName={response.username}
            imageUrl={response.image || ''}
            isFollowing={isFollowing}
            name={response.Stream?.name || ''}
            viewerIdentity={identity}
          />
          <InfoCard 
            hostIdentity={response.id}
            viewerIdentity={identity}
            name={response.Stream?.name || ""}
            thumbnailUrl={response.Stream?.thumbnailUrl || ""}
          />
          <AboutCard 
            bio={response.bio || ""}
            followedByCount={response._count.followedBy}
            hostIdentity={response.id}
            hostName={response.name}
            viewerIdentity={identity}
          />
      </div>
      <div className={isRightBar && "lg:hidden"}>
        <ChatComponent 
          hostId={response.id} 
          hostName={response.username}
          viewerName={name}
          isFollowing={isFollowing} 
          isChatEnabled={response.Stream?.isChatEnabled || false} 
          isChatDelayed = {response.Stream?.isChatDelayed || false}
          isChatFollowersOnly = {response.Stream?.isChatFollowersOnly || false}
        />
      </div>
    </LiveKitRoom>
  )

}

export const StreamPlayerSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row">
        <div className="space-y-4 w-full lg:w-[calc(100%-300px)] lg:max-h-[calc(100vh-64px)] lg:max-w-7xl mx-auto lg:overflow-y-scroll hidden-scrollbar pb-10">
          <VideoSkeleton />
          <HeaderSkeleton />
        </div>
        <ChatSkeleton />
      </div>
  )
}