import React from "react"
import Container from "../../components/container"
import DropDown from "../../components/widgets/drop-down"

import Header from '../../components/header'
import Panel from '../../components/panel'

import { getStandings } from "../../utils/api/soccer-api"
import { Team } from "../../utils/soccer-models"


type Props = {
  standings: Team[]
}

export default function Standings({standings}: Props) {

  const borderStyle = 'border-b border-gray-100 '
  const teamColStyle = 'absolute  pl-2 py-1 text-left  border-r-2 min-w-[180px] w-[25vw] max-w-[280px] border-gray-100'
  const grayBG = 'bg-gray '
  const whiteBG = 'bg-white '

  return(

    <Container>
    <Header title='Standings | Muslim League CT'/> 
    <Panel title="Standings" >
      <DropDown 
        title="SEASON"
        options={[{key: 1, value: 'SUMMER 2022'}]}
        curentOption={1}
        />

    </Panel>
    <Panel title="Rankings" removeBorder={true}>
      <div className="w-full mb-3 overflow-y-auto">
      <table className="w-full text-right">
        <thead className='text-gray-300 text-center border-gray-100 border-t-2 border-b-2'>
          <tr >
                <td className='absolute  pl-2 border-r-2 min-w-[180px] w-[25vw] max-w-[280px] bg-white text-gray-300 font-bold text-center  border-gray-100'> Teams </td>
                <th className= 'px-3 w-1/4 min-w-[175px]'>   </th>
                <th className='pl-6 min-w-[30px]'>W</th>
                <th className='min-w-[30px]'> L </th>
                <th className='min-w-[30px]'> D </th>
                <th className='min-w-[30px] px-3'> GF </th>
                <th className='min-w-[30px] px-2'> GA </th>
                <th className='min-w-[30px] px-2'> GD </th>
                <th className='min-w-[30px] px-2'> Pts </th>
          </tr>
        </thead>
        <tbody className="text-center">
          { standings.map((teams,index) => (
            
            <tr key={index} className={ index%2 ? borderStyle + grayBG : borderStyle + whiteBG } > 
              <td className={ index%2 ? grayBG + teamColStyle : whiteBG + teamColStyle }> <span className="font-bold px-1">{index+1}</span> {teams.team_name} </td>
              <th className= 'px-3 w-1/4 min-w-[175px]'>   </th>
              <td className='py-1 pl-6'> {teams.wins} </td>
              <td className=''> {teams.losses} </td>
              <td className=''> {teams.draws} </td>
              <td className='text-center'> {teams.goals_for} </td>
              <td className='text-center'> {teams.goals_against} </td>
              <td className={ (teams.goals_for-teams.goals_against) <0 ? 'pr-2 text-center text-red-300' : 'pr-2 text-center text-primary'}> {(teams.goals_for-teams.goals_against)} </td>
              <td className='text-center'> {teams.points} </td>
            </tr>
         ))}
        </tbody>
      </table>
    </div>
    </Panel >
  </Container>
  )
}

export async function getServerSideProps() {

  let standings: Team[]=[]

  try {
    standings = await getStandings(1)
  } catch (e) {
    console.error('Unable to get data')
  }
  return { props: {standings}}

}
