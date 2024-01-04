import { Results } from "@/components/Globals/results"
import { getSearchStream } from "@/lib/search-service";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
};

const page = async ({searchParams}: SearchPageProps) => {

  if(!searchParams || !searchParams.q) redirect('/')

  const response = await getSearchStream(searchParams.q)
  
  return (
    <div className="h-full p-4 md:p-6 lg:p-8 max-w-screen-2xl mx-auto">
      <Results response={response} search={searchParams.q} />
    </div>
  )
}

export default page