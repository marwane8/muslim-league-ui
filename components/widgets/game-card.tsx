import React from "react"
import { NextPage } from "next"

import WinArrowRight from '/public/svgs/win-arrow-right.svg'
import WinArrowLeft from '/public/svgs/win-arrow-left.svg'

type Props = {
  gameScore: any
}


const GameCard: NextPage<Props> = ({gameScore}: Props) => {

    let game;
    game = false;
    return (
          <>
          <div className='bg-white max-w-lg my-5 rounded-md mx-auto overflow-hidden'> 
              <div className='flex justify-center h-32'>
                
                <div className='flex w-32'>
                      <div className='flex mx-auto flex-col justify-center text-center'>
                        <h3 className='font-bold'> Top Akhs </h3>
                        <h4 className='text-gray-200'> 6 - 2 </h4>
                      </div>
                </div>

                <div className='flex my-auto justify-between items-center w-42 text-center '>
                    {game? <GameScore/> : <GameTime/>}
                </div>

                <div className='flex w-32'>
                      <div className='flex mx-auto flex-col justify-center text-center'>
                        <h3 className='font-bold'> Springfield Rockets</h3>
                        <h4 className='text-gray-200'> 8 - 0 </h4>
                      </div>
                </div>  
              </div>

            <div className='border-t py-1 text-center border-gray-100 my-auto text-gray-200'> BOX SCORE </div>
          </div>
        </>
    )
}

function GameScore() {
 return (
    <div className='flex my-auto justify-between items-center w-[160px] text-center '>
        <div className='text-center my-auto mr-1 text-2xl font-extrabold'> 98  </div>
        <WinArrowLeft className='h-4'/> 
        FINAL
        <WinArrowRight className=' h-4'/> 
        <div className='text-center my-auto ml-1 text-2xl font-extrabold'> 122  </div>
    </div>

 )
}

function GameTime() {
    return (
                <div className='my-auto w-[160px] text-center '>
                   <div className='font-extrabold text-xl'> 7:30 PM </div>
                   <div className='text-sm'> COURT 1 </div>
                </div>

    )
}
export default GameCard 