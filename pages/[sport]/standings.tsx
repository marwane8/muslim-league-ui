import React from "react"
import { GetServerSideProps } from "next"

import Container from "../../components/container"
import DropDown from "../../components/widgets/drop-down"
import Header from '../../components/header'
import Panel from '../../components/panel'


import { Season, TeamStats, makeSeasonOptions } from "../../utils/league-types"

import { getSeasons, getStandings } from "../../utils/api/league-api"

import { useState } from "react"

type Props = {
  init_sport: string,
  season_options: {key: number, value: string}[],
  init_season: number,
  init_standings: TeamStats[]
}

export default function Standings({init_sport, season_options, init_season, init_standings}: Props) {

  const borderStyle = 'border-b border-gray-100 '
  const teamColStyle = 'absolute  pl-2 py-1 text-left  border-r-2 min-w-[180px] w-[25vw] max-w-[280px] border-gray-100'
  const grayBG = 'bg-gray '
  const whiteBG = 'bg-white '

  const [currSeason,setSeason] = useState<number>(init_season);
  const [currStandings,setStandings] = useState<any[]>(init_standings);

  const handleSeasonChange = async (e: any) => {
      setSeason(e.target.value);
      const new_standings = await getStandings(init_sport,e.target.value,true);
      setStandings(new_standings);
  }

  function calculateWinPercentage(wins: number, losses: number): string {

      let winPct = (wins/(wins+losses));
      let num = winPct.toString();
      if (num == '1'){
        return '1.00'
      } else if (num == '0') {
        return '0.00'
      } 

      let placeholder = 5 - num.length 
      return num.substring(1) + '0'.repeat(placeholder)
  }

  return(

    <Container>
    <Header title='Standings | Muslim League CT'/> 
    <Panel title="Standings" >
      <DropDown 
        title="SEASON"
        options={season_options}
        currentOption={currSeason}
        changeOption={handleSeasonChange}
        />
    </Panel>

    <Panel title="Rankings" removeBorder={true}>
      <div className="w-full mb-3 overflow-y-auto">
      <table className="w-full text-right">
        <thead className='text-gray-300 border-gray-100 border-t-2 border-b-2'>
          <tr >
                <td className='absolute  pl-2 border-r-2 min-w-[180px] w-[25vw] max-w-[280px] bg-white text-gray-300 font-bold text-center  border-gray-100'> Teams </td>
                <th className= 'px-3 w-1/4 min-w-[175px]'>   </th>
                <th className='pl-6 min-w-[30px]'>W</th>
                <th className='min-w-[30px]'> L</th>
                <th className='min-w-[50px]'> % </th>
                <th className='min-w-[50px]'>PF</th>
                <th className='min-w-[50px]'>PA</th>
                <th className='min-w-[50px] pr-2'>+/-</th>
          </tr>
        </thead>
        <tbody>
          { currStandings.map((teams,index) => (
            <tr key={index} className={ index%2 ? borderStyle + grayBG : borderStyle + whiteBG } > 
              <td className={ index%2 ? grayBG + teamColStyle : whiteBG + teamColStyle }> <span className="font-bold px-1">{index+1}</span> {teams.name} </td>
              <th className= 'px-3 w-1/4 min-w-[175px]'>   </th>
              <td className='py-1'> {teams.wins} </td>
              <td className=''> {teams.losses} </td>
              <td className=''> {calculateWinPercentage(teams.wins,teams.losses)} </td>
              <td className=''> {teams.points_for} </td>
              <td className=''> {teams.points_against} </td>
              <td className={(teams.points_for - teams.points_against) <0 ? 'pr-2 text-red-300' : 'pr-2 text-primary'}> {(teams.points_for - teams.points_against)} </td>
            </tr>
         ))}
        </tbody>
      </table>
    </div>
    </Panel >
  </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { sport } = context.query

  let init_sport: string = String(sport)
  let seasons: Season[]=[];
  let init_season: number = 0;
  let init_standings: TeamStats[]=[];
  try {
    seasons = await getSeasons(String(sport));
    init_season = seasons.slice(-1)[0].id;
    init_standings = await getStandings(init_sport,init_season)
  } catch (e) {
    console.error('Unable to get data')
  }

  let season_options = seasons.map((season) => makeSeasonOptions(season))
  return { props: {init_sport, season_options, init_season, init_standings}}

}
