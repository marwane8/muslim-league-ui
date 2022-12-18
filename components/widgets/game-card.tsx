import React, { useEffect, useState } from "react"
import { NextPage } from "next"

import WinArrowRight from '/public/svgs/win-arrow-right.svg'
import WinArrowLeft from '/public/svgs/win-arrow-left.svg'
import { Game, GameStats, TeamData } from "../../utils/models"
import { getGameStats } from "../../utils/api/team-api"

type GameScoreProps = {
  game_id: number,
  team1_id: number,
  team2_id: number
}

function GameScore({game_id,team1_id,team2_id}: GameScoreProps) {
    const [team1_score,setScore1] = useState<number>(0)
    const [team2_score,setScore2] = useState<number>(0)
    useEffect(() => {
      const game_stats = getGameStats(game_id)
        .then((game_data: GameStats[]) => {
          let team1 = game_data.find(team => {return team.team_id === team1_id}) 
          let team2 = game_data.find(team => {return team.team_id === team2_id}) 
          setScore1(team1.points)
          setScore2(team2.points)
        })
    })
 return (
    <div className='flex my-auto justify-between items-center w-[160px] text-center '>
        <div className='text-center my-auto mr-1 text-2xl font-extrabold'> {team1_score} </div>
        { (team1_score > team2_score) ? <WinArrowLeft className='h-4'/>  :  <div className="text-white"> -- </div> } 
        FINAL
        { (team1_score < team2_score) ? <WinArrowRight className='h-4'/>  :  <div className="text-white"> -- </div> } 
        
        <div className='text-center my-auto ml-1 text-2xl font-extrabold'> {team2_score} </div>
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



type GameCardProps = {
  gameID: number,
  standings: TeamData[],
  gameData: Game 
}

const GameCard: NextPage<GameCardProps> = ({gameID,gameData,standings}: GameCardProps) => {
    const[game_stats,setStats] = useState<GameStats | null>(null)

    const[score1,setScore1] = useState<number | null>(null)
    const[score2,setScore2] = useState<number | null>(null)

    let game;
    game = true;

    const getTeamStanding = (team_id: number) => {
      let team_standing = standings.find(team => {return team.id === team_id}) 
      let team_record = team_standing?.wins + ' - ' + team_standing?.loss
      return team_record
    }
   
    return (
          <>
          <div className='bg-white max-w-lg my-5 rounded-md mx-auto overflow-hidden'> 
              <div className='flex justify-center h-32'>
                <div className='flex w-32'>
                      <div className='flex mx-auto flex-col justify-center text-center'>
                        <h3 className='font-bold'> {gameData.team1} </h3>
                        <h4 className='text-gray-200'> {getTeamStanding(gameData.team1_id)} </h4>
                      </div>
                </div>

                <div className='flex my-auto justify-between items-center w-42 text-center '>
                    {game? <GameScore game_id={gameData.game_id} team1_id={gameData.team1_id} team2_id={gameData.team2_id} /> : <GameTime time={gameData.start_time} court={gameData.court}/>}
                </div>

                <div className='flex w-32'>
                      <div className='flex mx-auto flex-col justify-center text-center'>
                        <h3 className='font-bold'> {gameData.team2} </h3>
                        <h4 className='text-gray-200'> {getTeamStanding(gameData.team2_id)} </h4>
                      </div>
                </div>  
              </div>

            <div className='border-t py-1 text-center border-gray-100 my-auto text-gray-200'> BOX SCORE </div>
          </div>
        </>
    )
}

export default GameCard 