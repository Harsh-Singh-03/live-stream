import { Loader2 } from "lucide-react"
import { ProfileCardSkeleton } from "./_components/profile-card"

const loading = () => {
  return (
    <div className="w-full p-4 md:p-6">
      <ProfileCardSkeleton/>
    </div>
  )
}

export default loading