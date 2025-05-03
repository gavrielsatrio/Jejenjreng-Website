import React from "react";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClickOutside: () => void
};

function Modal({ children, onClickOutside }: ModalProps) {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if(e.target !== e.currentTarget) {
      return;
    }
    
    onClickOutside();
  }

  return (
    <div className="bg-black/30 fixed z-10 top-0 left-0 size-full backdrop-blur-xs flex items-center justify-center" onClick={handleBackgroundClick}>
      {children}
    </div>
  )
}

export { Modal }