interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {};

function Container({ className = '', children }: ContainerProps) {
  return (
    <div className={`grid grid-cols-12 ${className}`}>
      {children}
    </div>
  )
}

export { Container };