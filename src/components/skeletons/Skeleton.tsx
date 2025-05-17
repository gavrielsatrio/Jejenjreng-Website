interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`bg-primary-light/20 animate-pulse rounded-full ${className}`} />
  )
}

export { Skeleton }