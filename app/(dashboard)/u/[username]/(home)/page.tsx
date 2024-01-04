import ErrorPage from "@/components/Globals/error"
import { StreamPlayer } from "@/components/Stream-player"
import { getUserByUsername } from "@/lib/auth-service"

const page = async ({params}: {params: {username: string}}) => {
  
  const res = await getUserByUsername(params.username)

  if(!res || !res.success || !res.user || !res.user.Stream) {
    return (
      <ErrorPage />
      )
  }
  // Adding stream player passing through response and is following
  return ( 
    <div className="h-full">
      <StreamPlayer response={res.user} isFollowing />
    </div>
  )
}

export default page