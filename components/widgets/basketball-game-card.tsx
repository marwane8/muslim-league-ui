import React, { useEffect, useState } from "react"
import { NextPage } from "next"

import WinArrowRight from '/public/svgs/win-arrow-right.svg'
import WinArrowLeft from '/public/svgs/win-arrow-left.svg'

import { Game, TeamGameStats, TeamStats } from "../../utils/league-types"
import { getTeamGameStats } from "../../utils/api/league-api"


type GameCardProps = {
  standings: TeamStats[],
  gameData: Game,
  handleBoxScoreClick: (g: Game) => void
}

 const GameCard: NextPage<GameCardProps> = ({gameData,standings, handleBoxScoreClick}: GameCardProps) => {

    let isGamePlayed = Boolean(gameData.played);

    const getTeamRecord = (team_id: number) => {
      let teamStanding = standings.find(team => {return team.id === team_id}) 
      let teamRecord = teamStanding?.wins + ' - ' + teamStanding?.losses
      return teamRecord
    }
   
    return (
          <>
          <div className='max-w-lg mx-auto my-5 overflow-hidden bg-white rounded-md'> 
              <div className='flex justify-center h-32'>
                <div className='flex w-32'>
                      <div className='flex flex-col justify-center mx-auto text-center'>
                        <h3 className='font-bold'> {gameData.team1} </h3>
                        <h4 className='text-gray-200'> {getTeamRecord(gameData.team1_id)} </h4>
                      </div>
                </div>

                <div className='flex items-center justify-between my-auto text-center w-42 '>
                    {isGamePlayed ? <GameScore gameID={gameData.game_id} team1ID={gameData.team1_id} team2ID={gameData.team2_id} /> : <GameTime time={gameData.start_time} court={gameData.court}/>}
                </div>

                <div className='flex w-32'>
                      <div className='flex flex-col justify-center mx-auto text-center'>
                        <h3 className='font-bold'> {gameData.team2} </h3>
                        <h4 className='text-gray-200'> {getTeamRecord(gameData.team2_id)} </h4>
                      </div>
                </div>  
              </div>

            <button className='w-full py-1 my-auto font-bold text-center text-white bg-gray-200 border-t disabled:font-normal hover:bg-gray-300 bo disabled:bg-white disabled:border-gray-100 disabled:text-gray-200'
                  disabled={Boolean(!gameData.played)} 
                  onClick={(e) => handleBoxScoreClick(gameData)}
            >
                {Boolean(gameData.played) ? "BOX SCORE": "TBD" } 
            </button>
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
    const [team1Score,setScore1] = useState<number | string>(0)
    const [team2Score,setScore2] = useState<number | string>(0)

    useEffect(() => {
       getTeamGameStats(gameID, true)
        .then((gameStats: TeamGameStats[]) => {
          let team1 = gameStats.find(team => {return team.t_id === team1ID}) 
          let team2 = gameStats.find(team => {return team.t_id === team2ID}) 
          if (team1 && team2) {
            setScore1(team1.stat1_total)
            setScore2(team2.stat1_total)
          }
        })
    })

 return (
    <div className='flex my-auto justify-between items-center w-[160px] text-center '>
        <div className='my-auto mr-1 text-2xl font-extrabold text-center'> {team1Score} </div>
          { (team1Score > team2Score) ? <WinArrowLeft className='h-4'/>  : <WinArrowLeft className='h-4 fill-white'/> } 
            FINAL
          { (team1Score < team2Score) ? <WinArrowRight className='h-4'/>  : <WinArrowRight className='h-4 fill-white'/>  } 
        <div className='my-auto ml-1 text-2xl font-extrabold text-center'> {team2Score} </div>
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
          <div className='text-xl font-extrabold'> {time} </div>
          <div className='text-sm'> COURT {court} </div>
      </div>
    )
}

