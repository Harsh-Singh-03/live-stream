"use client"

import { useTracks } from "@livekit/components-react"
import { Participant, Track } from "livekit-client"
import { useEffect, useRef, useState } from "react"
import { FullScrren } from "./full-screen"
import {useEventListener} from 'usehooks-ts'
import { VolumeControl } from "./volume-control"

interface props {
  participant: Participant
}

export const LiveVideo = ({ participant }: props) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [volume, setVolume] = useState(0)

  const onVolumeChange = (vol: number) => {
    setVolume(+vol)
    if(videoRef.current){
      videoRef.current.muted = vol === 0;
      videoRef.current.volume = +vol * 0.01;
    }
  }

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0)
  }, [])
  
  const toggleFullScreen = () => {
    if(isFullScreen){
      document.exitFullscreen()
    }else{
      wrapperRef.current?.requestFullscreen()
    }
  }

  const handleFullscreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null
    setIsFullScreen(isCurrentlyFullScreen)
  }

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  useTracks([Track.Source.Microphone, Track.Source.Camera])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current)
      }
  })

  return (
    <div ref={wrapperRef} className="relative h-full flex z-50">
      <video ref={videoRef} width='100%' />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-neutral-900/60 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <FullScrren
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  )
}