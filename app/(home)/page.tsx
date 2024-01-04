import { Results } from "@/components/Globals/results"
import { getStream } from "@/lib/feed-service"


const page = async () => {
  const response = await getStream()
  return (
    <div className="h-full p-4 md:p-6 lg:p-8 max-w-screen-2xl mx-auto">
      <Results response={response} />
    </div>
  )
}

export default page