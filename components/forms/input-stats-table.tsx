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
        <div className='mb-5 mx-auto '>
            <div className='inline-flex bg-white rounded-md overflow-hidden border border-gray-200'>
            <table className='inline-table'>
                <thead>
                <tr>
                    <td className=' border-b border-gray-200 text-lg font-bold text-white text-center bg-primary ' 
                        colSpan={rowHeaders.length + 2}> 
                            {teamName} 
                    </td>
                </tr>

                <tr className='font-bold bg-gray-100 text-gray-300'> 
                    <th> NAME </th>
                    <th className="border-l border-b border-gray-200"> DNP </th>
                    {rowHeaders.map((header, index) => (
                        <th className="border-l border-gray-200" key={index}>{header}</th>
                    ))}
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
                        {rowHeaders.map((header, propIndex) => (
                            <td className=' border w-[60px] border-gray-200 border-b-0 border-r-0 text-center' key={propIndex}>
                            <input
                                className="w-full disabled:text-gray-200 pl-1"
                                type="number"
                                value={player[header]}
                                disabled={Boolean(player.dnp)}
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

