import { Skeleton } from "../ui/skeleton";
import { ResultCard, ResultCardSkeleton } from "./result-card";

type response = {
    user: {
        id: string;
        name: string;
        username: string;
        image: string | null;
        bio: string | null;
        isEmailVerified: boolean;
    };
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
} 

interface props {
    response: response[]
    search? : string | null | undefined
}

export const Results = ({ response, search }: props) => {
    const label = search ? `Search ${response.length > 1 ? 'results' : 'result'} for -: ${search}` : "Streams we think you'll like :--"
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4 md:mb-6">
                {label}
            </h2>
            {response.length === 0 && (
                <div className="text-muted-foreground text-sm">
                    No streams found.
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
                {response.map((result) => (
                    <ResultCard
                        key={result.id}
                        data={result}
                    />
                ))}
            </div>
        </div>
    )
}

export const ResultsSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-8 w-[290px] mb-4 md:mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                    <ResultCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
};