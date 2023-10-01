import React from "react"
import { NextPage } from "next"
import { PlayerGameStats } from "../../utils/league-types"

type Props = {
    team_id: number,
    team_name: string,
    game_stats: PlayerGameStats[]
}

const BoxScoreTable: NextPage<Props> = ({team_id, team_name, game_stats}: Props) => {
    const filteredStats = game_stats.filter((playerStat) => playerStat.team_id === team_id);
    const teamStats = filteredStats.sort((a, b) => { return a.dnp - b.dnp; });

    const borderStyle = 'border-b border-gray-100 '
    const grayBG = 'bg-gray '
    const whiteBG = 'bg-white '

    return (
        <div className="w-full mb-5">
        <table className="w-full text-center">
            <thead className='text-gray-300 border-t-2 border-b-2 border-gray-100'>
            <tr>
                <td className="font-bold border-b-2 border-gray-100 bg-gray"
                    colSpan={4} >
                        {team_name}
                </td>
            </tr>
            <tr >
                <th className='min-w-[50px] border-r-2 border-gray-100'> Player  </th>
                <th className='min-w-[30px]'> PTS </th>
                <th className='min-w-[30px]'> REB </th>
                <th className='min-w-[30px]'> FLS </th>
            </tr>
            </thead>
            <tbody>
                { teamStats.map((player,index) => (
                <tr key={index} className={ index%2 ? borderStyle + grayBG : borderStyle + whiteBG } > 
                    <td className='border-r-2 border-gray-100'> {player.player_name} </td>
                    <td className=''>   { (player.dnp) ? '-' : player.stat1 } </td>
                    <td className=''>   { (player.dnp) ? '-' : player.stat2 } </td>
                    <td className=''>   { (player.dnp) ? '-' : player.stat3 } </td>
                </tr>
                ))}
                <tr className="bg-gray-100 " > 
                    <td className='font-bold text-gray-300 border-r-2 border-gray-100'> TOTAL </td>
                    <td className=''>   {teamStats.reduce((total, playerGameStat) => total + playerGameStat.stat1, 0)} </td>
                    <td className=''>   {teamStats.reduce((total, playerGameStat) => total + playerGameStat.stat2, 0)} </td>
                    <td className=''>   {teamStats.reduce((total, playerGameStat) => total + playerGameStat.stat3, 0)} </td>
                </tr>

            </tbody>
        </table>
        </div>

    )
}

export default BoxScoreTable 

