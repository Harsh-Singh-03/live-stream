import React from 'react'
import { Skeleton } from '../ui/skeleton'

const UsermenuSkeleton = () => {
  return (
    <div className='flex items-center gap-x-2 md:gap-x-4'>
        <Skeleton className='hidden md:block w-24 h-8 rounded-md' />
        <Skeleton className='w-10 h-10 rounded-full' />
    </div>
  )
}

export default UsermenuSkeleton