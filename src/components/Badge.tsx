import { Loader } from "@/icons";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  loading?: boolean;
}

function Badge({ className = '', children, loading: isLoading = false, onClick }: BadgeProps) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm ${className}`} onClick={onClick}>
      {isLoading ? (
        <Loader className="size-5 fill-inherit animate-spin duration-1000" />
      ) : (
        children
      )}
    </span>
  )
}

export { Badge }