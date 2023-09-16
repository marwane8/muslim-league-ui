import React, { useState } from 'react'
import { GetServerSideProps } from 'next'

import Header from '../../../components/header'
import Container from '../../../components/container'
import Panel from '../../../components/panel'

import DropDown from "../../../components/widgets/drop-down"
import Badge from '../../../components/widgets/badge'
import RosterTable from '../../../components/tables/roster-table'

import { UI_URL } from '../../../utils/api/api-utils'

import { Sport, Season, makeSeasonOptions, TeamName, makeTeamOptions, Player } from '../../../utils/league-types'
import { BBallStat, BballTeamData } from '../../../utils/basketball-types'
import { getSeasons, getTeamNames, getRoster } from '../../../utils/api/league-api'
import { getStandings } from '../../../utils/api/basketball-api'

type Props = {
  season_options: {key: number, value: string}[],
  season_standings: BballTeamData[],
  teams: TeamName[];
  team_options: {key: number, value: string}[],
  init_season_id: number,
  init_team_id: number,
  init_roster: Player[],
  init_rank: Ranking
}

export default function Teams( {season_options, season_standings, teams, team_options, init_season_id, init_team_id, init_roster, init_rank}: Props) {


  const [currTeam,setTeam] = useState<number>(init_team_id);
  const [rank,setRank] = useState<Ranking>(init_rank);
  const [roster,setRoster] = useState<Player[]>(init_roster);
  
  const handleSeasonChange = async (e: any) => {
    const new_season_id = e.target.value;

    const teamsLink = '/basketball/' + new_season_id + '/teams';
    const newUrl = UI_URL + teamsLink
    window.location.assign(newUrl);
  }  

  const handleTeamChange = async (e: any) => {
    const team_id = e.target.value;
    setTeam(team_id);
    setTeamRankings(team_id);
    const new_roster = await getRoster(Sport.BASKETBALL, team_id, true);
    console.log(new_roster);
    setRoster(new_roster)
  }  
 
  const setTeamRankings = (team_id: number) => {

    // create a shallow copy inorder to sort 
    let standings: BballTeamData[]  = [...season_standings];
    const overall = getTeamStatRank(standings, team_id);
    const points = getTeamStatRank(standings, team_id, BBallStat.POINTS);
    const rebounds = getTeamStatRank(standings, team_id, BBallStat.REBOUNDS);
   
    const teamRank = {  ovr: overall, pts: points, reb: rebounds}
    setRank(teamRank)
  }

  return (
  <>
    <Header title='Teams | Muslim League CT'/>
    <Container>
      <Panel title="Teams" >
        <DropDown 
          title="SEASON"
          options={season_options}
          currentOption={init_season_id}
          changeOption={handleSeasonChange}
          />

      </Panel>


      <Panel title='Teams'>
      <div className='mb-5  max-w-md m-auto'>
        <DropDown 
          title='TEAM'
          options={team_options}
          currentOption={currTeam} 
          changeOption={handleTeamChange}
          />
      </div>
      <h1 className='mt-7 text-center text-4xl font-bold'> { roster[0].team_name }</h1>
      <div className='flex justify-between max-w-md my-5 mx-auto'>
        <Badge 
          stat="OVR" 
          rank={rank.ovr}
        />
        <Badge 
          stat="PPG" 
          rank={rank.pts}
        />
        <Badge 
          stat="RPG" 
          rank={rank.reb}
        />
      </div>
      <RosterTable
          title='Player Stats' 
          players={roster}
      />

      </Panel>
    </Container>
  </>

 )
}


export const getServerSideProps: GetServerSideProps = async(context) => {
 
  // season_id is parsed from the URL
  const { season_id } = context.query;
  let init_season_id = 0;

  if (typeof season_id === 'string') {
    init_season_id = parseInt(season_id);
  } else {
    console.error('Unable to parse season_id: ', typeof season_id);
  }
 
  let seasons: Season[] = [];
  let season_standings: BballTeamData[] = []; 
  let teams: TeamName[] = [];
  let init_team_id = 1;
  let init_roster: Player[] = []
  let init_rank = { ovr: 0, pts: 0, reb: 0 }; 


  try {

    seasons = await getSeasons(Sport.BASKETBALL);
    season_standings = await getStandings(init_season_id);
    teams = await getTeamNames(Sport.BASKETBALL, init_season_id);
    init_team_id = teams[0].team_id;
    init_roster = await getRoster(Sport.BASKETBALL, init_team_id);

  } catch (e) {
    console.error('Unable to get data', e);
  }

  let init_standings = [...season_standings]
  init_rank.ovr = getTeamStatRank(init_standings, init_team_id);
  init_rank.pts = getTeamStatRank(init_standings, init_team_id, BBallStat.POINTS);
  init_rank.reb = getTeamStatRank(init_standings, init_team_id, BBallStat.REBOUNDS);

  let season_options = seasons.map((season) => makeSeasonOptions(season));
  let team_options = teams.map((team) => makeTeamOptions(team));
  return { props: {season_options, season_standings, teams, team_options, init_season_id, init_team_id, init_roster, init_rank}}

}

export type Ranking = {
  ovr: number,
  pts: number,
  reb: number 
}


const getTeamStatRank = (standings: BballTeamData[], team_id: number, stat: BBallStat | null=null) => {
  switch(stat) {
    case BBallStat.POINTS:
      standings.sort((team1,team2) =>  team2.points_for - team1.points_for)
      break;
    case BBallStat.REBOUNDS:
      standings.sort((team1,team2) =>  team2.rebounds_total - team1.rebounds_total)
      break;
  }

  for (let i = 0; i<standings.length;i++){
    if (team_id == standings[i].team_id) {
      return i+1
    }
  }
  return 0;
}

