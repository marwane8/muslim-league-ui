import React from "react"
import { NextPage } from "next"
import Image from 'next/image'

const ImageCard: NextPage<Props> = ({title,date,src,alt,children}: Props) => {
  return (            
  
        <div className='text-center bg-gradient-to-r mb-5 from-primary-400 to-secondary-300 rounded-xl overflow-hidden mx-5 shadow-md max-w-[650px] '>
            <Image
                src={src}
                alt={alt}
            />
            <h1 className='px-5 pt-1 text-lg font-bold text-left bg-white '> {title} </h1>
            <div className='px-5 text-left bg-white text-md'> 
                {children}
            </div>
            <p className='px-5 pb-1 text-sm text-left text-gray-200 bg-white'> {date} </p>
        </div>
  )
}

export default ImageCard

type Props = {
  title?: string,
  date?: string,
  src?: any, 
  alt?: string,
  children?: React.ReactNode
}
