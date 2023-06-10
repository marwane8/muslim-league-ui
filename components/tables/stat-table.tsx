import React from "react"
import { NextPage } from "next"

import { PlayerStat } from "../../utils/bball-types"

type Props = {
  title: string,
  stat: string,
  players: {id: number, name:  string, stat: number }[]
}

const StatTable: NextPage<Props> = ({title,stat,players}: Props) => {

    return (
      <div className="pb-5">
      <h2 className='font-bold text-lg pb-1 text-gray-200'> {title} </h2>
      <table className="w-full text-left">
        <thead className='text-gray-300 border-gray-100 border-t-2 border-b-2'>
          <tr >
                <th className='pl-3 min-w-[30px]'> Player</th>
                <th className='w-[40px] pr-2'> {stat} </th>
          </tr>
        </thead>
        <tbody>
          { players.map((leader,index) => (
            <tr key={index} className={ index%2 ? "bg-gray border-b border-gray-100":"bg-white border-b border-gray-100" } > 
              <td className='pl-2 py-2'> <span className="font-bold px-1">{index+1}</span> {leader.name} </td>
              <td className='text-center pr-2'> {leader.stat} </td>
            </tr>
         ))}
        </tbody>
      </table>
      </div>
    )
}

export default StatTable 

