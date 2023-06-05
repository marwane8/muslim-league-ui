import React, { useEffect, useState } from "react"
import { NextPage } from "next"

import WinArrowRight from '/public/svgs/win-arrow-right.svg'
import WinArrowLeft from '/public/svgs/win-arrow-left.svg'
import { Game, GameStat, Team } from "../../utils/bball-models"
import { getGameStats } from "../../utils/api/basketball-api"


type GameCardProps = {
  standings: Team[],
  gameData: Game 
}

 const GameCard: NextPage<GameCardProps> = ({gameData,standings}: GameCardProps) => {

    let isGamePlayed;
    isGamePlayed = true;

    const getTeamRecord = (team_id: number) => {
      let teamStanding = standings.find(team => {return team.id === team_id}) 
      let teamRecord = teamStanding?.wins + ' - ' + teamStanding?.loss
      return teamRecord
    }
   
    return (
          <>
          <div className='bg-white max-w-lg my-5 rounded-md mx-auto overflow-hidden'> 
              <div className='flex justify-center h-32'>
                <div className='flex w-32'>
                      <div className='flex mx-auto flex-col justify-center text-center'>
                        <h3 className='font-bold'> {gameData.team1} </h3>
                        <h4 className='text-gray-200'> {getTeamRecord(gameData.team1_id)} </h4>
                      </div>
                </div>

                <div className='flex my-auto justify-between items-center w-42 text-center '>
                    {isGamePlayed ? <GameScore gameID={gameData.game_id} team1ID={gameData.team1_id} team2ID={gameData.team2_id} /> : <GameTime time={gameData.start_time} court={gameData.court}/>}
                </div>

                <div className='flex w-32'>
                      <div className='flex mx-auto flex-col justify-center text-center'>
                        <h3 className='font-bold'> {gameData.team2} </h3>
                        <h4 className='text-gray-200'> {getTeamRecord(gameData.team2_id)} </h4>
                      </div>
                </div>  
              </div>

            <div className='border-t py-1 text-center border-gray-100 my-auto text-gray-200'> BOX SCORE </div>
          </div>
        </>
    )
}
export default GameCard 


type GameScoreProps = {
  gameID: number,
  team1ID: number,
  team2ID: number
}

function GameScore({gameID,team1ID,team2ID}: GameScoreProps) {
    const [team1Score,setScore1] = useState<number>(0)
    const [team2Score,setScore2] = useState<number>(0)

    useEffect(() => {
      getGameStats(gameID)
        .then((gameStats: GameStat[]) => {
          let team1 = gameStats.find(team => {return team.team_id === team1ID}) 
          let team2 = gameStats.find(team => {return team.team_id === team2ID}) 
          if (team1 && team2) {
            setScore1(team1.points)
            setScore2(team2.points)
          }
        })
    })

 return (
    <div className='flex my-auto justify-between items-center w-[160px] text-center '>
        <div className='text-center my-auto mr-1 text-2xl font-extrabold'> {team1Score} </div>
          { (team1Score > team2Score) ? <WinArrowLeft className='h-4'/>  :  <div className="text-white"> -- </div> } 
            FINAL
          { (team1Score < team2Score) ? <WinArrowRight className='h-4'/>  :  <div className="text-white"> -- </div> } 
        <div className='text-center my-auto ml-1 text-2xl font-extrabold'> {team2Score} </div>
    </div>
 )
}


type GameTimeProps = {
  time: string,
  court: number
}

function GameTime({time,court}: GameTimeProps) {
    return (
                <div className='my-auto w-[160px] text-center '>
                   <div className='font-extrabold text-xl'> {time} </div>
                   <div className='text-sm'> COURT {court} </div>
                </div>
    )
}

