import React from "react"
import { NextPage } from "next"

type Props = {
    isVisible: boolean,
    onClose: any
    children?: React.ReactNode
}

const Modal: NextPage<Props> = ({isVisible, onClose, children}: Props) => {
  if (!isVisible) { return null}

  const handleClose = (e:  any) => {
    if(e.target.id === 'wrapper') onClose();
  }

  return (
      <div className='fixed flex z-20 inset-0 items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm'
           id="wrapper" onClick={handleClose}>
            {children}
      </div>
  )
}

export default Modal

