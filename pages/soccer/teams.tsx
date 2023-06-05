import React, { useState } from 'react'

import Header from '../../components/header'
import Container from '../../components/container'
import Panel from '../../components/panel'

import DropDown from "../../components/widgets/drop-down"
import Badge from '../../components/widgets/badge'
import RosterTable from '../../components/tables/roster-table'

import { Player, Team} from '../../utils/soccer-models'
import { getRoster, getTeams, getStandings } from '../../utils/api/soccer-api'

type Props = {

  team_options: {key: number, value: string}[],
  teams: Team[]
}

type ranking = {
  ovr: number,
  pts: number,
  reb: number 
}

export default function Teams({team_options,teams}: Props) {

  let default_roster: { id: number, name: string, number: string, pos: string }[] = [];

  let defaultRank = { ovr: 0, pts: 0, reb: 0}

  const [currTeam,setTeam] = useState<number>(1);
  const [rank,setRank] = useState<ranking>(defaultRank);
  const [roster,setRoster] = useState(default_roster);
  
  const handleTeamChange = async (e: any) => {
    setTeam(e.target.value)
    setTeamRankings(e.target.value)
    const new_roster = await updateRoster(e.target.value)
    setRoster(new_roster)
  }  

  const makeRoster = (player: Player) => {
    let player_info = {
        id: player.player_id,
        name: player.player_name, 
        number: player.player_number,
        pos: player.player_pos 
    }
    return player_info
  }


  const updateRoster = async (team_id: number) => {
    let players = await getRoster(team_id)
    let roster: { id: number, name: string, number: string, pos: string }[] = players.map((player) => makeRoster(player))
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
    let stands = [...teams]
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
          options={team_options}
          curentOption={currTeam} 
          changeOption={handleTeamChange}
          />
      </div>
      <h1 className='mt-7 text-center text-4xl font-bold'> {team_options[currTeam-1].value}</h1>
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
 
  const makeTeamOptions = (team: Team) => {
    let team_option = {
      key: team.team_id,
      value: team.team_name
    }
    return team_option
  }



  

  let teams: Team[] = []
  try {
    teams = await getTeams(1)
  } catch (e) {
    console.error('Unable to get data')
  }

  let team_options: { key: number, value: string }[] = teams.map((team) => makeTeamOptions(team))
  return { props: {team_options, teams}}

}
