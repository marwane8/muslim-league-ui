import React from "react"
import { NextPage } from "next"

const Panel: NextPage<Props> = ({title,removeBorder=false,children}: Props) => {
  let border = 'border-b border-gray-100'  
  if (removeBorder) {
    border = ''
  }
    return (
      
      <div className='px-5 pb-2 my-5 bg-white rounded-xl'>
      <h2 className={`${border} py-1 mb-3 text-2xl font-bold text-left  md:text-3xl`}> {title} </h2>
        {children}
      </div>
  )
}

export default Panel

type Props = {
  title?: string,
  removeBorder?: boolean,
  children?: React.ReactNode
}
