import React from "react"
import { NextPage } from "next"
import { PlayerGameStats } from "../../utils/league-types"

type Props = {
  teamName: string
  gameStats: PlayerGameStats[],
  rowHeaders: string[],
  handleValueChange: (playerIndex: number, header: string, value: number) => void
}
const InputStatsTable: NextPage<Props> = ({teamName, gameStats,rowHeaders,handleValueChange}: Props) => {

    return (
        <div className='m-5'>
            <div className='m-auto bg-white rounded-md max-w-[500px] overflow-hidden border border-gray-200'>
            <table className='w-full'>
                <thead>
                <tr>
                    <td className=' border-b border-gray-200 text-lg font-bold text-white text-center bg-primary ' 
                        colSpan={rowHeaders.length + 2}> 
                            {teamName} 
                    </td>
                </tr>

                <tr className='font-bold bg-gray-100 text-gray-300'> 
                    <th> name </th>
                    <th> DNP </th>
                    {rowHeaders.map((header, index) => (
                        <th className="border-l border-gray-200" key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {gameStats.map((player, playerIndex) => (
                        <tr key={playerIndex}>
                        <td className="w-[120px] pl-2 border-t  bg-gray-100 border-gray-200">{player.player_name}</td>

                        <td className="">{player.dnp}</td>
                        {rowHeaders.map((header, propIndex) => (
                            <td className=' border border-gray-200 border-b-0 border-r-0 text-center' key={propIndex}>
                            <input
                                className="w-full pl-1"
                                type="number"
                                value={player[header]}
                                onChange={(e) => handleValueChange(playerIndex, header, parseInt(e.target.value))}
                            />
                            </td>
                        ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
  )
}

export default InputStatsTable 

