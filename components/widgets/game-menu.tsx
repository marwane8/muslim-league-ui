import React, { useState } from "react"

import { NextPage } from "next"

import NextLink from 'next/link';

import Panel from '../panel' 

import LeftArrow from '/public/svgs/left.svg'
import RightArrow from '/public/svgs/right.svg'


const GameMenu: NextPage<Props> = ({pageLength,games,currentGame,changeGame}: Props) => {
    const [pageStart, setStart] = useState<number>(0);
    const [pageEnd, setEnd] = useState<number>(pageLength);

    let isFirstPage = pageStart <= 0;
    let isLastPage = pageEnd >= games.length

    const baseCSS = 'flex flex-col w-20 my-auto text-center cursor-pointer hover:font-bold';

    const pageBack = () => {
      if (!isFirstPage) {
        let nextPageStart = pageStart-pageLength;
        let nextPageEnd = pageEnd - pageLength;
        setStart(nextPageStart);
        setEnd(nextPageEnd);
        changeGame(null);
      }
    }

    const pageFront = () => {
      if (!isLastPage) {
        let nextPageStart = pageStart+pageLength;
        let nextPageEnd = nextPageStart + pageLength;
        setStart(nextPageStart)
        setEnd(nextPageEnd)
        changeGame(null);
      }
    }

    return (
          <Panel
            title='Muslim League CT Games'
            removeBorder={true}
           >
          <div className='flex justify-between '> 
          <div className='flex items-center h-12 '>
            <button onClick={pageBack}>
              <LeftArrow className={isFirstPage ? "h-6 text-gray-100" : "h-6 cursor-pointer hover:text-blue"}/>
            </button>
          </div>
            { games.slice(pageStart,pageEnd).map((date,index) => (
              <NextLink href={'/games/' + date } key={index}>

                <div className={ 
                  index===currentGame
                  ? "flex flex-col w-20 my-auto text-center cursor-pointer font-bold text-primary"
                  : baseCSS
                
                } onClick={() => changeGame(index)}>
                    <h3 className='text-sm'>{date}</h3>
                    <h4 className='text-xs'> {date}</h4>
                </div> 

              </NextLink>
            ))} 
          <div className='flex items-center h-12'>
            <button onClick={pageFront}>
              <RightArrow className={isLastPage ? "h-6 text-gray-100" : "h-6 cursor-pointer hover:text-blue"}/>
            </button>

          </div>
          </div>
          </Panel>

    )
}

export default GameMenu 

type Props = {
  pageLength: number,
  currentGame: number,
  changeGame?: any,
  games: number[] 
}
