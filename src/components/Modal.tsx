interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {};

function Modal({ children }: ModalProps) {
  return (
    <div className="bg-black/30 fixed z-10 top-0 left-0 size-full backdrop-blur-xs flex items-center justify-center">
      {children}
    </div>
  )
}

export { Modal }