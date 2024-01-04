import { Skeleton } from "@/components/ui/skeleton"


const loading = () => {
    return (
        <div className="p-4 md:p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 w-full justify-between">
                <Skeleton className="h-7 md:h-10 w-[200px]" />
                <Skeleton className="h-10 w-full md:w-[200px]" />
            </div>
            <div className="space-y-4">
                <Skeleton className="rounded-md h-14 md:h-20 w-full" />
                <Skeleton className="rounded-md h-14 md:h-20 w-full" />
            </div>
        </div>
    )
}

export default loading