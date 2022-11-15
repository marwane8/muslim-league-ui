import React from "react"
import Container from "../components/container"

import Header from '../components/header'

import { getStandings } from "../utils/api/team-api"
import { TeamData } from "../utils/models"


type Props = {
  standings: TeamData[]
}


export default function Standings({standings}: Props) {

  return(

    <Container>
    <Header title='Standings | Muslim League CT'/> 
    <h2 className='m-4 text-2xl font-bold text-center text-primary md:text-4xl'> Standings </h2>
    <div className='m-auto max-w-[600px] mb-5 border-2 overflow-hidden rounded-xl'>
      <table className="w-full text-left table-fixed">
        <thead className='text-white border-b-2 border-black  bg-primary'>
          <tr >
            <th className="w-[30px]" />
            <th className= 'px-6 py-3 w-1/2'>Team</th>
            <th className='px-3 py-3'>W</th>
            <th className='px-3 py-3'>L</th>
            <th className='px-2 py-3'>+/-</th>
          </tr>
        </thead>
        <tbody>
          { standings.map((teams,index) => (
            <tr key={index} className={index%2 ? "bg-white hover:bg-primary-50 hover:font-bold " : "bg-gray hover:bg-primary-50 hover:font-bold "} > 
              <td className='font-bold text-center'>  {index+1}  </td>
              <td className='px-3 py-4'>{teams.name} </td>
              <td className='px-3 py-4'> {teams.wins}  </td>
              <td className='px-3 py-4'> {teams.loss} </td>
              <td className='px-2 py-4'> {teams.diff} </td>
            </tr>
         ))}
        </tbody>
      </table>
    </div>
  </Container>
  )
}

export async function getServerSideProps() {

  let standings_data =  [
    {
      id: 1,
      name: "Team 1",
      wins: 8,
      loss: 0
    },
    {
      id: 2,
      name: "Team 2",
      wins: 7,
      loss: 1
    }
  ]

  try {
    standings_data = await getStandings(3)
  } catch (e) {
    console.error('Unable to get data')
  }
  return { props: {standings: standings_data}}

}
