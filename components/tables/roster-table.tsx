import React from "react"
import { NextPage } from "next"
import { Player } from "../../utils/league-types"

type Props = {
  title: string,
  players: Player[] 
}


const RosterTable: NextPage<Props> = ({title,players}: Props) => {

    return (
        <div className='max-w-md m-auto pb-3'>
          <h2 className='font-bold text-xl mb-2 mt-7'> {title}</h2>
          <table className="w-full text-left">
            <thead className='text-gray-300 border-gray-100  border-t-2 border-b-2'>
              <tr>
                    <th className='pl-3'>Player</th>
                    <th className='pl-3'> POS </th>
              </tr>
            </thead>
            <tbody>
              { players.map((player,index) => (
                <tr key={index} className={ index%2 ? 'bg-gray border-b border-gray-100': 'bg-white border-gray-100 border-b' } > 
                  <td className='pl-3 py-1'> {player.name} </td>
                  <td className='pl-3 py-1'> {player.pos} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}

export default RosterTable 

