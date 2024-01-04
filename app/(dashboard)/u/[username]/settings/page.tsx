import { getUserByUsername } from "@/lib/auth-service"
import { ProfileCard } from "./_components/profile-card"
import { getUserBlockingById, getUserFollowersById, getUserFollowingById } from "@/actions/User"

const page = async ({params}: {params: {username: string}}) => {

  const response = await getUserByUsername(params.username, true)

  if(!response || !response.user || !response.success){
    throw new Error('Unauthorized!')
  }
  const followingsData = await getUserFollowingById(response.user.id)
  const followersData = await getUserFollowersById(response.user.id)
  const blockingData = await getUserBlockingById(response.user.id)
  if(!followersData || !followingsData || !blockingData){
    throw new Error('Something went wrong!')
  }

  return (
    <div className="w-full p-4 md:p-6 max-w-screen-xl mx-auto">
      <div className="w-full flex gap-4 md:gap-6 flex-col lg:flex-row">
        <ProfileCard 
          user={response.user}
          following={followingsData || []}
          followers={followersData || []}
          blocking={blockingData || []}
        />
      </div>
    </div>
  )
}

export default page