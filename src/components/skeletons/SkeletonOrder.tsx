import { Skeleton } from "./Skeleton";

interface SkeletonOrderProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
}

function SkeletonOrder({ className = '', count = 1 }: SkeletonOrderProps) {
  return (
    Array.from({ length: count }).map((_, index) => (
      <div className={`border border-[#C8C8C8] rounded-lg shadow-sm bg-white p-6 flex flex-col gap-x-6 ${className}`} key={index}>
        <div className="flex justify-between">
          <div className="w-full">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-2 w-6/12 mt-2" />

            <Skeleton className="h-2 w-4/12 mt-6" />
            <Skeleton className="h-2 w-3/12 mt-2" />
            <Skeleton className="h-2 w-8/12 mt-2" />
          </div>
          <Skeleton className="w-20 h-7 self-start flex-none" />
        </div>
        <div className="flex items-center justify-between mt-6">
          <Skeleton className="w-20 h-5" />
          <div className="flex items-center gap-x-2">
            <Skeleton className="w-32 h-7" />
            <Skeleton className="w-32 h-7" />
          </div>
        </div>
      </div>
    ))
  )
}

export { SkeletonOrder }