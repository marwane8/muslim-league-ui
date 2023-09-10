import React, { useState } from 'react'
import { GetServerSideProps } from 'next'

import Header from '../../../components/header'
import Container from '../../../components/container'
import Panel from '../../../components/panel'

import DropDown from "../../../components/widgets/drop-down"
import Badge from '../../../components/widgets/badge'
import RosterTable from '../../../components/tables/roster-table'

import { Sport, Season, makeSeasonOptions, TeamName, makeTeamOptions, Player } from '../../../utils/league-types'
import { SoccerStat, SoccerTeamData } from '../../../utils/soccer-types'
import { getSeasons, getTeamNames, getRoster } from '../../../utils/api/league-api'
import { getStandings } from '../../../utils/api/soccer-api'

import { UI_URL } from '../../../utils/api/api-utils'

type Props = { 
  season_options: {key: number, value: string}[],
  season_standings: SoccerTeamData[],
  teams: TeamName[],
  team_options: {key: number, value: string}[],
  init_season_id: number,
  init_team_id: number;
  init_roster: Player[],
  init_rank: Ranking
}


export default function Teams( {season_options, season_standings, teams, team_options, init_season_id, init_team_id, init_roster, init_rank}: Props) {
  
  const [currTeam,setTeam] = useState<number>(init_team_id);
  const [rank,setRank] = useState(init_rank);
  const [roster,setRoster] = useState(init_roster);

  // Handler functions
  const handleSeasonChange = async (e: any) => {
    const new_season_id = e.target.value;
    const teamsLink = '/soccer/' + new_season_id + '/teams';
    const newUrl = UI_URL + teamsLink
    window.location.assign(newUrl);
  }  

  const handleTeamChange = async (e: any) => {
    const team_id = e.target.value;
    setTeam(team_id);
    setTeamRankings(team_id);
    const new_roster = await getRoster(Sport.SOCCER, team_id);
    setRoster(new_roster);
  }  

  
  const setTeamRankings = (team_id: number) => {
    let standings: SoccerTeamData[] = [...season_standings]
    const overall = getTeamStatRank(standings,team_id);
    const goals = getTeamStatRank(standings,team_id,SoccerStat.GOALS);
    const teamRank: Ranking = {  ovr: overall, goals: goals };
    setRank(teamRank);
  }


  const displayTeamName = (currTeam: number) => {
    for (let i = 0; i< team_options.length;i++){
      if (currTeam == team_options[i].key) {
        return team_options[i].value
      }
    }
  }

  //Components
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

      <Panel title='Rosters'>
      <div className='mb-5 max-w-md m-auto'>
        <DropDown 
          title='TEAM'
          options={team_options}
          currentOption={currTeam} 
          changeOption={handleTeamChange}
          />
      </div>
      <h1 className='mt-7 text-center text-4xl font-bold'> {displayTeamName(currTeam)}</h1>
      <div className='flex max-w-md my-5 mx-auto justify-around'>
        <Badge 
          stat="OVR" 
          rank={rank.ovr}
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

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { season_id } = context.query;
  let seasons: Season[]=[];
  let init_season_id = Number(season_id);
  let season_standings: SoccerTeamData[] = [];
  let teams: TeamName[] = [];
  let init_team_id = 0;
  let init_roster: Player[] = []
  let init_rank: Ranking = { ovr: 0, goals: 0}; 

  try {

    seasons = await getSeasons(Sport.SOCCER);
    season_standings = await getStandings(init_season_id);
    teams = await getTeamNames(Sport.SOCCER, init_season_id);
    init_team_id = teams[0].team_id;
    init_roster =  await getRoster(Sport.SOCCER, init_team_id);

  } catch (e) {
    console.error('fetch error: ', e);
  }

  let init_standings = [...season_standings];
  init_rank.ovr = getTeamStatRank(init_standings, init_team_id);
  init_rank.goals = getTeamStatRank(init_standings, init_team_id, SoccerStat.GOALS);

  let season_options = seasons.map((season) => makeSeasonOptions(season));
  let team_options = teams.map((team) => makeTeamOptions(team));

  return { props: {season_options, season_standings, teams, team_options, init_season_id, init_team_id, init_roster, init_rank}}

}
export type Ranking = {
  ovr: number,
  goals: number
}

const getTeamStatRank = (standings: SoccerTeamData[], team_id: number, stat: SoccerStat | null=null) => {
  switch(stat) {
    case SoccerStat.GOALS:
      standings.sort((team1,team2) =>  team2.goals_for - team1.goals_for)
      break;
 }

  for (let i = 0; i<standings.length;i++){
    if (team_id == standings[i].team_id) {
      return i+1
    }
  }
  return 0;
}

