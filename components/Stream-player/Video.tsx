"use client"

import { ConnectionState, Track } from "livekit-client"
import { useConnectionState, useTracks, useRemoteParticipant } from "@livekit/components-react"
import { OfflineVideo } from "./offline-video"
import { LoadingVideo } from "./loading-video"
import { Skeleton } from "../ui/skeleton"
import { LiveVideo } from "./live-video"

interface props {
  hostName: string,
  hostId: string
}

export const Video = ({ hostName, hostId }: props) => {

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostId);

  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostId);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />
  } else {
    content = <LiveVideo participant={participant} />
  };
  return (
    <div className="aspect-video border-b group relative">
      {content}
    </div>
  )
}

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};