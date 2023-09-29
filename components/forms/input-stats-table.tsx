import React from "react"
import { NextPage } from "next"
import { PlayerGameStats } from "../../utils/league-types"
import { getSportSchema } from "../../utils/utils"

type Props = {
  sport: string
  teamName: string
  gameStats: PlayerGameStats[],
  handleValueChange: (playerIndex: number, header: string, value: number) => void
}
const InputStatsTable: NextPage<Props> = ({sport, teamName, gameStats, handleValueChange}: Props) => {
    const sportSchema = getSportSchema(sport);
    return (
        <div className='mb-5 mx-auto '>
            <div className='inline-flex bg-white rounded-md overflow-hidden border border-gray-200'>
            <table className='inline-table'>
                <thead>
                <tr>
                    <td className=' border-b border-gray-200 text-lg font-bold text-white text-center bg-primary ' 
                        colSpan={5}> 
                            {teamName} 
                    </td>
                </tr>

                <tr className='font-bold bg-gray-100 text-gray-300'> 
                    <th> NAME </th>
                    <th className="border-l border-b border-gray-200"> DNP </th>
                    <th className="border-l border-gray-200">{sportSchema.type1}</th>
                    <th className="border-l border-gray-200">{sportSchema.type2}</th>
                    <th className="border-l border-gray-200">{sportSchema.type3}</th>
                </tr>
                </thead>
                <tbody>
                    {gameStats.map((player, playerIndex) => (
                        <tr key={playerIndex}>
                        <td className="w-[120px] pl-2 border-t  bg-gray-100 border-gray-200">{player.player_name}</td>

                        <td className="text-center w-[30px] border-t border-l border-gray-200">
                            <input 
                                type="checkbox" 
                                checked={Boolean(player.dnp)}
                                onChange={(e) => handleValueChange(playerIndex,"dnp", Number(e.target.checked))}
                            />
                        </td>
                        <td className=' border w-[60px] border-gray-200 border-b-0 border-r-0 text-center'>
                            <input
                                className="w-full disabled:text-gray-200 pl-1"
                                type="number"
                                value={player.stat1}
                                disabled={Boolean(player.dnp)}
                                onChange={(e) => handleValueChange(playerIndex, "stat1", parseInt(e.target.value))}
                            />
                        </td>
                        <td className=' border w-[60px] border-gray-200 border-b-0 border-r-0 text-center'>
                            <input
                                className="w-full disabled:text-gray-200 pl-1"
                                type="number"
                                value={player.stat2}
                                disabled={Boolean(player.dnp)}
                                onChange={(e) => handleValueChange(playerIndex, "stat2", parseInt(e.target.value))}
                            />
                        </td>
                        <td className=' border w-[60px] border-gray-200 border-b-0 border-r-0 text-center'>
                            <input
                                className="w-full disabled:text-gray-200 pl-1"
                                type="number"
                                value={player.stat3}
                                disabled={Boolean(player.dnp)}
                                onChange={(e) => handleValueChange(playerIndex, "stat3", parseInt(e.target.value))}
                            />
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
  )
}

export default InputStatsTable 

