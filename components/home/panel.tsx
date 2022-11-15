import React from "react"
import { NextPage } from "next"

const Panel: NextPage<Props> = ({title,children}: Props) => {
  return (
        <div className='px-5 pb-2 my-5 bg-white rounded-xl'>
        <h2 className='py-1 mb-3 text-2xl font-bold text-left border-b border-gray-100 md:text-3xl'> {title} </h2>
          {children}
       </div>
  )
}

export default Panel

type Props = {
  title?: string,
  children?: React.ReactNode
}
