import React, { useState } from "react"
import { NextPage } from "next"

import NextLink from 'next/link';

import Panel from '../panel' 

import LeftArrow from '/public/svgs/left.svg'
import RightArrow from '/public/svgs/right.svg'

const GameMenu: NextPage<Props> = ({stat,rank}: Props) => {
    const [currentGame, setGame] = useState<number>(0);
   
    const baseCSS = 'flex flex-col w-20 my-auto text-center cursor-pointer hover:font-bold';

    const selectGame = (gameIndex: number) => {
      setGame(gameIndex)
    }

    const dates = [
        {
            weekday: 'MON',
            date: 'NOV 24'
        },
        {
            weekday: 'TUE',
            date: 'NOV 25'
        },
        {
            weekday: 'WED',
            date: 'NOV 26'
        },
        {
            weekday: 'THU',
            date: 'NOV 27'
        },
    ]
    return (
          <Panel
            title='Muslim League CT Games'
            removeBorder={true}
            >
          <div className='flex justify-between '> 
          <div className='flex items-center h-12 '>
            <LeftArrow className="h-6 cursor-pointer"/>
          </div>
            { dates.map((date,index) => (
              <NextLink href='#' key={index}>
                <div className={ 
                  index===currentGame
                  ? "flex flex-col w-20 my-auto text-center cursor-pointer font-bold text-primary"
                  : baseCSS
                
                } onClick={() => selectGame(index)}>
                    <h3 className='text-sm'>{date.weekday}</h3>
                    <h4 className='text-xs'> {date.date}</h4>
                </div> 

              </NextLink>
            ))} 
          <div className='flex items-center h-12'>

            <RightArrow className="h-6 cursor-pointer"/>
          </div>
          </div>
          </Panel>

    )
}

export default GameMenu 

type Props = {
  stat: string,
  rank: number 
}
