import React, { useState } from 'react'

import Header from '../../components/header'
import Container from '../../components/container'
import Panel from '../../components/panel'

import DropDown from "../../components/widgets/drop-down"
import Badge from '../../components/widgets/badge'
import RosterTable from '../../components/tables/roster-table'

import { Player, Team} from '../../utils/soccer-models'
import { getRoster, getStandings } from '../../utils/api/soccer-api'

type Props = {
  team_options: {key: number, value: string}[],
  teams: Team[],
  default_roster: { id: number, name: string, number: string, pos: string }[]
  default_rank: { ovr: 0 },
}

type ranking = {
  ovr: number,
}

export default function Teams({team_options,teams,default_roster,default_rank}: Props) {

 
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

  const [currTeam,setTeam] = useState<number>(1);
  const [rank,setRank] = useState<ranking>(default_rank);
  const [roster,setRoster] = useState(default_roster);

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

export async function getServerSideProps() {
 
  let teams: Team[] = []
  let default_players: Player[] = []
  let default_rank = { ovr: 0 }; 

  
  const makeTeamOptions = (team: Team) => {
    let team_option = {
      key: team.team_id,
      value: team.team_name
    }
    return team_option
  }
  const makeRoster = (player: Player) => {
    let roster = { 
      id: player.player_id, 
      name: player.player_name, 
      number: player.player_number, 
      pos: player.player_pos 
    }
    return roster
  }



  try {
    teams = await getStandings(1)
    default_players = await getRoster(1);
    
    for (let i = 0; i<teams.length;i++){
      if ( teams[i].team_id == 1) {
        const rank = i+1
        default_rank = {ovr: rank } 
      }
    }
 
  } catch (e) {
    console.error('Unable to get data')
  }

  let team_options: { key: number, value: string }[] = teams.map((team) => makeTeamOptions(team))
  let default_roster: { id: number, name: string, number: string, pos: string }[] = default_players.map((player) => makeRoster(player))

  return { props: {team_options, teams, default_rank, default_roster}}

}
