import { getUserByUsername } from "@/lib/auth-service"
import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/Follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/Stream-player";

interface UserPageProps {
  params: {
    username: string;
  };
};
const page = async ({ params }: UserPageProps) => {

  const res = await getUserByUsername(params.username)
  if (!res || !res.success || !res.user || !res.user.Stream) return notFound()

  const isFollowing = await isFollowingUser(res.user.id);
  const isBlocked = await isBlockedByUser(res.user.id)

  if(isBlocked) {
    notFound()
  }

  return (
   <StreamPlayer isFollowing={isFollowing.isFollowing} response={res.user} />
  )
}

export default page