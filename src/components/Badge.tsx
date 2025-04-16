interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>{}

function Badge({ className = '', children, onClick }: BadgeProps) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm ${className}`} onClick={onClick}>{children}</span>
  )
}

export { Badge }