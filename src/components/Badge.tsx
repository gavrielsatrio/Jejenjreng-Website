interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>{}

function Badge({ className = '', children }: BadgeProps) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm ${className}`}>{children}</span>
  )
}

export { Badge }