import UserItemSkeleton from './UserItemSkeleton'
import { Skeleton } from '../ui/skeleton'

const Sidebarskeletontest = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-6" />
            </div>
            <ul className="px-2 pt-2 lg:pt-0">
                {[...Array(3)].map((_, i) => (
                    <UserItemSkeleton key={i} />
                ))}
            </ul>
            <ul className="px-2">
                {[...Array(3)].map((_, i) => (
                    <UserItemSkeleton key={i} />
                ))}
            </ul>
        </aside>
    )
}

export default Sidebarskeletontest