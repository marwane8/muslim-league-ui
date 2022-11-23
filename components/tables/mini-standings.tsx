import React from "react"
import { NextPage } from "next"

import { TeamData } from "../../utils/models"

type Props = {
  title: string,
  standings: TeamData[] 
}


const MiniStandings: NextPage<Props> = ({title,standings}: Props) => {

    function calculateWinPercentage(wins: number, losses: number): string {
        let winPct = (wins/(wins+losses));
        let num = winPct.toString();
        if (num == '1'){
            return '1.00';
        } else if (num == '0') {
            return '0.00';
        } 

        let placeholder = 5 - num.length;
        return num.substring(1) + '0'.repeat(placeholder);
    }

    return (
        <div className='m-3 overflow-hidden border-2 border-gray-200 rounded-xl'>
        <div className='py-2 text-lg font-bold text-center text-white border-b border-gray-200 bg-primary'> {title} </div>
            <div className='px-3'>
            <table className="w-full text-center text-gray-300 table-fixed">
                <thead className=''>
                <tr>
                    <th className= 'w-2/3 px-1 py-2 text-left '>Team</th>
                    <th className='px-1 py-2 '>W</th>
                    <th className='px-1 py-2 '>L</th>
                    <th className='px-1 py-2'>%</th>
                </tr>
                </thead>
                <tbody>
                { standings.map((teams,index) => (
                    <tr key={index} className="border-t border-gray-200" > 
                    <td className='px-1 py-2 text-left'><span className='font-bold'>{index+1}</span> {teams.name} </td>
                    <td className='px-1 py-2'> {teams.wins}  </td>
                    <td className='px-1 py-2'> {teams.loss} </td>
                    <td className='px-1 py-2 text-sm'> {calculateWinPercentage(teams.wins,teams.loss)} </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default MiniStandings 

