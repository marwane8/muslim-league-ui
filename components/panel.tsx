import React from "react"
import { NextPage } from "next"

type Props = {
  title?: string,
  titleSize?: string,
  removeBorder?: boolean,
  children?: React.ReactNode
}

const Panel: NextPage<Props> = ({title,titleSize='',removeBorder=false,children}: Props) => {
  let border = 'border-b border-gray-100'  
  let titleHeadingSize = 'text-2xl md:text-3xl'
  if (removeBorder) {
    border = ''
  }

  switch(titleSize) {
      case 'small':
        titleHeadingSize = 'text-lg';
        break;
      case 'medium':
        titleHeadingSize = 'text-lg md:text-xl';
        break;
      case 'large':
        titleHeadingSize = 'text-2xl';
        break;
  }

  return (
      
      <div className='px-5 pb-2 my-5 bg-white rounded-xl'>
      <h2 className={`${border} ${titleHeadingSize} py-1 mb-3 font-bold text-left`}> {title} </h2>
        {children}
      </div>
  )
}

export default Panel

