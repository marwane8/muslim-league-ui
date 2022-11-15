import React from "react"
import { NextPage } from "next"
import NextLink from 'next/link'

const FancyButton: NextPage<Props> = ({title,button,link='',tailWindImage}: Props) => {
  return (
          <div className={`flex flex-col justify-center py-5 min-h-[160px] items-center m-3 rounded-xl bg-cover bg-no-repeat ${tailWindImage}`}> 
            <h1 className='w-3/5 my-3 text-xl font-bold text-center text-white'> {title} </h1>
             <NextLink href={link}>
                <button className="w-1/3 px-2 py-1 font-bold text-center text-white rounded-md hover:bg-gradient-to-r from-primary to-secondary bg-primary-500">
                  <a className="font-bold text-white"> {button} </a>
                </button>
             </NextLink>
          </div>
  )
}

export default FancyButton 

type Props = {
  title?: string,
  button?: string,
  link?: string,
  tailWindImage?: string
}
