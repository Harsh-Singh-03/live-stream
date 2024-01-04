import { Skeleton } from "@/components/ui/skeleton"
import { ToggleCardSkeleton } from "./_components/toggle-option"

const loading = () => {
  return (
    <div className="p-4 md:p-6 space-y-4">
      <Skeleton className="h-7 md:h-10 w-[200px]" />
      <div className="space-y-4">
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  )
}

export default loading