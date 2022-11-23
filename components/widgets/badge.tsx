import React from "react"
import { NextPage } from "next"

const Badge: NextPage<Props> = ({stat,rank}: Props) => {

    const formatRank = (rank: number) => {
     switch(rank) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
    }

    return rank + 'th'
    }

    return (
      <div className='w-20'>
        <div className=' flex justify-center items-center bg-primary h-20  text-center m-auto rounded-3xl'>  
          <div className='text-white text-3xl font-bold'>  {formatRank(rank)} </div>
        </div>
        <h1 className='pt-1 font-bold text-center'> {stat}</h1>
      </div>
    )
}

export default Badge 

type Props = {
  stat: string,
  rank: number 
}
