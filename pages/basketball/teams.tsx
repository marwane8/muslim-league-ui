import React, { useState } from 'react'

import Header from '../../components/header'
import Container from '../../components/container'
import Panel from '../../components/panel'

import DropDown from "../../components/widgets/drop-down"
import Badge from '../../components/widgets/badge'
import RosterTable from '../../components/tables/roster-table'

import { Player, Team, TeamName } from '../../utils/bball-models'
import { getRoster, getTeams, getStandings } from '../../utils/api/basketball-api'

type Props = {
  teams: {key: number, value: string}[],
  standings: Team[]
}
type ranking = {
  ovr: number,
  pts: number,
  reb: number 
}



export default function Teams({teams,standings}: Props) {

  let default_roster: { id: number, name: string, number: string, pos: string }[] = [
  ] 

  let defaultRank = { ovr: 6, pts: 5, reb: 4}

  const [currTeam,setTeam] = useState<number>(1);
  const [rank,setRank] = useState<ranking>(defaultRank);
  const [roster,setRoster] = useState(default_roster);
  
  const handleTeamChange = async (e: any) => {
    setTeam(e.target.value)
    setTeamRankings(e.target.value)
    const new_roster = await updateRoster(e.target.value)
    setRoster(new_roster)
  }  

  const updateRoster = async (team_id: number) => {
    let roster = await getRoster(team_id)
    return roster
  }
  
  const setTeamRankings = (team_id: number) => {
    const overall = getTeamStatRank(team_id);
    const points = getTeamStatRank(team_id,'points');
    const rebounds = getTeamStatRank(team_id,'rebounds');
   
    const teamRank = {  ovr: overall, pts: points, reb: rebounds}
    setRank(teamRank)
  }

  const getTeamStatRank = (team_id: number, stat: string | null=null) => {
    let stands = [...standings]
    switch(stat) {
      case 'points':
        stands.sort((team1,team2) =>  team2.points_for - team1.points_for)
        break;
      case 'rebounds':
        stands.sort((team1,team2) =>  team2.rebounds_total - team1.rebounds_total)
        break;
    }

    for (let i = 0; i<stands.length;i++){
      if (team_id == stands[i].id) {
        return i+1
      }
    }
    return 0;
  }
 return (
  <>
    <Header title='Teams | Muslim League CT'/>
    <Container>
      <Panel title='Teams'>
      <div className='mb-5  max-w-md m-auto'>
        <DropDown 
          title='TEAM'
          options={teams}
          curentOption={currTeam} 
          changeOption={handleTeamChange}
          />
      </div>
      <h1 className='mt-7 text-center text-4xl font-bold'> {teams[currTeam-1].value}</h1>
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




export async function getServerSideProps() {
 
  const makeTeamOptions = (team: TeamName) => {
    let team_option = {
      key: team.id,
      value: team.name 
    }
    return team_option
  }

  

  let teams: TeamName[] = [{id: 1, name: 'Team'}]
  let standings: Team[] = []
  try {
    teams = await getTeams(3)
    standings = await getStandings(3)
  } catch (e) {
    console.error('Unable to get data')
  }

  let team_options = teams.map((team) => makeTeamOptions(team))
  return { props: {teams: team_options, standings: standings}}

}
