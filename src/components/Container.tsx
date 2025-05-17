interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {};

function Container({ className = '', children }: ContainerProps) {
  return (
    <div className={className}>
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </div>
  )
}

export { Container };