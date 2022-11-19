import React from "react"
import Container from "../components/container"
import DropDown from "../components/drop-down"

import Header from '../components/header'
import Panel from '../components/home/panel'

import { getStandings } from "../utils/api/team-api"
import { TeamData } from "../utils/models"


type Props = {
  standings: TeamData[]
}


export default function Standings({standings}: Props) {

  const borderStyle = 'border-b border-gray-100 '
  const teamColStyle = 'absolute  pl-2 py-1 text-left  border-r-2 min-w-[180px] w-[25vw] max-w-[280px] border-gray-100'
  const grayBG = 'bg-gray '
  const whiteBG = 'bg-white '

  let leaders =  [
    {
      name: "Mohammed",
      stat: 8,
    },
    {
      name: "Bilal",
      stat: 6.6,
    },
    {
      name: "Yahya",
      stat: 5,
    }
  ]

  return(

    <Container>
    <Header title='Stats | Muslim League CT'/> 
    <Panel title="Stat Leaders" >
      <DropDown/>
    </Panel>

    <Panel title="2022 Summer League Leaders" removeBorder={true}>

      <div className="sm:grid mb-3 grid-cols-2 gap-6">
      <div>
      <h2 className='font-bold text-lg pb-1 text-gray-200'> Scoring Leaders </h2>
      <table className="w-full text-left">
        <thead className='text-gray-300 border-gray-100 border-t-2 border-b-2'>
          <tr >
                <th className='pl-3 min-w-[30px]'> Player</th>
                <th className='w-[40px]'> PTS </th>
          </tr>
        </thead>
        <tbody>
          { leaders.map((leader,index) => (
            <tr key={index} className={ index%2 ? borderStyle + grayBG : borderStyle + whiteBG } > 
              <td className='pl-2 py-2'> <span className="font-bold px-1">{index+1}</span> {leader.name} </td>
              <td className=''> {leader.stat} </td>
            </tr>
         ))}
        </tbody>
      </table>
      </div>
        <div>
      <h2 className='font-bold text-lg mt-6 sm:mt-0 pb-2'> Rebound Leaders </h2>
      <table className="w-full text-left">
        <thead className='text-gray-300 border-gray-100 border-t-2 border-b-2'>
          <tr >
                <th className='min-w-[30px]'>Player</th>
                <th className='min-w-[30px]'> PTS </th>
          </tr>
        </thead>
        <tbody>
          { leaders.map((leader,index) => (
            <tr key={index} className={ index%2 ? borderStyle + grayBG : borderStyle + whiteBG } > 
              <td className=''> {leader.name} </td>
              <td className=''> {leader.stat} </td>
            </tr>
         ))}
        </tbody>
      </table>
      </div>

      </div>

    </Panel >
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
