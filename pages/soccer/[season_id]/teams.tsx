import React, { useState } from 'react'
import { GetServerSideProps } from 'next'

import Header from '../../../components/header'
import Container from '../../../components/container'
import Panel from '../../../components/panel'

import DropDown from "../../../components/widgets/drop-down"
import Badge from '../../../components/widgets/badge'
import RosterTable from '../../../components/tables/roster-table'

import { Season, Player, Team, makeSeasonOptions, makeTeamOptions, makeRoster,} from '../../../utils/soccer-types'
import { getRoster, getSeasons, getStandings } from '../../../utils/api/soccer-api'
import { useRouter } from 'next/router'




type Props = {
  season_options: {key: number, value: string}[],
  team_options: {key: number, value: string}[],
  season: number,
  teams: Team[],
  default_rank: { ovr: number },
  default_roster: { id: number, name: string, number: string, pos: string }[]
}


export default function Teams( {season_options,  team_options, season, teams, default_rank, default_roster}: Props) {
  
  const router = useRouter();
  const [currTeam,setTeam] = useState<number>(1);
  const [rank,setRank] = useState(default_rank);
  const [roster,setRoster] = useState(default_roster);

  // Handler functions
  const handleTeamChange = async (e: any) => {
    setTeam(e.target.value)
    setTeamRankings(e.target.value)
    const new_roster = await updateRoster(e.target.value)
    setRoster(new_roster)
  }  

  const handleSeasonChange = async (e: any) => {
    const new_season_id = e.target.value;
    const teamsLink = '/soccer/' + new_season_id + '/teams';
    router.push(teamsLink);
  }  

const updateRoster = async (team_id: number) => {
    let players = await getRoster(team_id)
    let roster: { id: number, name: string, number: string, pos: string }[] = players.map((player) => makeRoster(player))
    return roster
  }
  
  const setTeamRankings = (team_id: number) => {
    const overall = getTeamStatRank(team_id);
    const teamRank = {  ovr: overall }
    setRank(teamRank)
  }

  const getTeamStatRank = (team_id: number) => {
    let stands = [...teams]

    for (let i = 0; i<stands.length;i++){
      if (team_id == stands[i].team_id) {
        return i+1
      }
    }
    return 0;
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
          currentOption={season}
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
      <div className='flex justify-center max-w-md my-5 mx-auto'>
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
  let seasons: Season[]=[]
  let teams: Team[] = []
  let players: Player[] = []
  let default_rank = { ovr: 0 }; 


  let season: number = 0;
  if (typeof season_id === 'string') {
    season = parseInt(season_id);
  } else {
    console.log('Unable to parse season id');
  }
  
  try {
    seasons = await getSeasons();

    teams = await getStandings(season)
    players = await getRoster(1);
    
    for (let i = 0; i<teams.length;i++){
      if ( teams[i].team_id == 1) {
        const rank_value = i+1
        default_rank = {ovr: rank_value } 
      }
    }
 
  } catch (e) {
    console.error('Unable to get data');
  }

  let season_options = seasons.map((season) => makeSeasonOptions(season));
  let team_options: { key: number, value: string }[] = teams.map((team) => makeTeamOptions(team));
  let default_roster: { id: number, name: string, number: string, pos: string }[] = players.map((player) => makeRoster(player));

  return { props: {season_options,  team_options, season, teams, default_rank, default_roster}}

}

