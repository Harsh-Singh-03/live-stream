import { StreamPlayerSkeleton } from "@/components/Stream-player"


const loading = () => {
  return (
    <div className="h-full">
        <StreamPlayerSkeleton />
    </div>
  )
}

export default loading