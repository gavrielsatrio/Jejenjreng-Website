interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`bg-black/15 animate-pulse rounded-full ${className}`} />
  )
}

export { Skeleton }