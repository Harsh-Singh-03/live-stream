import { ResultsSkeleton } from "@/components/Globals/results"


const loading = () => {
  return (
    <div className="h-full p-4 md:p-6 lg:p-8 max-w-screen-2xl mx-auto">
        <ResultsSkeleton />
    </div>
  )
}

export default loading