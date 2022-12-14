import React, { useState } from "react"
import { NextPage } from "next"
import NextLink from 'next/link';

import Panel from '../panel' 

import LeftArrow from '/public/svgs/left.svg'
import RightArrow from '/public/svgs/right.svg'
import DropDown from "./drop-down";

type Props = {
  pageLength: number,
  currentGame: number,
  changeGame?: any,
  gameDatesArray: number[] 
}

const GameDatesMenu: NextPage<Props> = ({pageLength,gameDatesArray,currentGame,changeGame}: Props) => {
    const [pageStart, setStart] = useState<number>(0);
    const [pageEnd, setEnd] = useState<number>(pageLength);

    let isFirstPage = (pageStart <= 0);
    let isLastPage = (pageEnd >= gameDatesArray.length);

    const pageFront = () => {
      if (!isLastPage) {
        let nextPageStart = pageStart + pageLength;
        let nextPageEnd = nextPageStart + pageLength;
        setStart(nextPageStart);
        setEnd(nextPageEnd);
        changeGame(null);
      }
    }

    const pageBack = () => {
      if (!isFirstPage) {
        let nextPageStart = pageStart - pageLength;
        let nextPageEnd = pageEnd - pageLength;
        setStart(nextPageStart);
        setEnd(nextPageEnd);
        changeGame(null);
      }
    }

    function formatWeekday(date: number): string {
      const weekdays: string[] = ["MON","TUE","WED","THU","FRI","SAT","SUN"]
      const weekdayIndex = convertDate(date).getDay();
      const weekday = weekdays[weekdayIndex]
      return weekday
    }

    function formatMonthDay(date: number): string {
      const months: string[] = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
      const monthIndex = convertDate(date).getMonth();
      const day = convertDate(date).getDate().toString();
      const monthDay = months[monthIndex]  + ' ' + day ;
      return monthDay ;
    }

    function convertDate(date: number): Date {
      const dateString = date.toString();
      const formatedDate = dateString.slice(0,4) + '-' + dateString.slice(4,6)  + '-' + dateString.slice(6,8);
      return new Date(formatedDate);
    }

    return (
          <Panel removeBorder={true} >
            <div className="sm:flex justify-between">
              <h1 className="text-2xl font-bold mb-2"> Muslim League CT Games </h1>
              <DropDown
                options={[{key: 1, value: 'SUMMER 2022'}]}
                curentOption={1}
                dropDownSize='medium'
              />
            </div>

            <div className='flex justify-between '> 
              <div className='flex items-center h-12 '>
                <button onClick={pageBack}>
                  <LeftArrow className={isFirstPage ? "h-6 text-gray-100" : "h-6 cursor-pointer"}/>
                </button>
              </div>
                { gameDatesArray.slice(pageStart,pageEnd).map((date,index) => (
                  <NextLink href={'/games/' + date } key={index}>

                    <div className={ 
                      index===currentGame
                      ? "flex flex-col w-20 my-auto text-center cursor-pointer font-bold text-primary"
                      : "flex flex-col w-20 my-auto text-center cursor-pointer hover:font-bold"
                    } onClick={() => changeGame(index)}>
                        <h3 className='text-sm'> {formatWeekday(date)} </h3>
                        <h4 className='text-xs'> {formatMonthDay(date)}</h4>
                    </div> 

                  </NextLink>
                ))} 
              <div className='flex items-center h-12'>
                <button onClick={pageFront}>
                  <RightArrow className={isLastPage ? "h-6 text-gray-100" : "h-6 cursor-pointer"}/>
                </button>

              </div>
            </div>
          </Panel>

    )
}

export default GameDatesMenu 

