import { Skeleton } from "./Skeleton";

interface SkeletonEventProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
}

function SkeletonEvent({ className = '', count = 1 }: SkeletonEventProps) {
  return (
    Array.from({ length: count }).map((_, index) => (
      <div className={`rounded-lg shadow-sm bg-secondary-lighter p-6 flex items-center gap-x-6 animate-pulse ${className}`} key={index}>
        <Skeleton className="size-14 p-4 box-border flex-none" />
        <div className="grow self-start">
          <div className="flex justify-between">
            <div className="w-full">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="w-4/12 h-2 mt-4" />
              <Skeleton className="w-6/12 h-2 mt-2" />
            </div>
            <Skeleton className="w-20 h-7 self-start flex-none" />
          </div>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-20 h-5" />
          </div>
        </div>
      </div>
    ))
  )
}

export { SkeletonEvent }