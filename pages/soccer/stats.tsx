import React from "react"
import Container from "../../components/container"
import DropDown from "../../components/widgets/drop-down"
import StatTable from "../../components/tables/stat-table"

import Header from '../../components/header'
import Panel from '../../components/panel'

import { getStatLeaders } from "../../utils/api/soccer-api"
import { PlayerTotals } from "../../utils/soccer-models"
import { PlayerStat } from "../../utils/bball-models"


type Props = {
  goalStats:{id: number, name:  string, stat: number }[]
  assistsStats:{id: number, name:  string, stat: number }[]
}


export default function Standings({goalStats,assistsStats}: Props) {

  return(
    <Container>
    <Header title='Stats | Muslim League CT'/> 

    <Panel title="Stat Leaders" >
      <DropDown 
        title="SEASON"
        options={[{key: 1, value: 'SUMMER 2022'}]}
        curentOption={1}
      />
    </Panel>

    <Panel title="2022 Summer League Leaders" removeBorder={true}>

      <div className="sm:grid mb-3 grid-cols-2 gap-6">
        <StatTable 
        title="Goal Leaders"
        players={goalStats}
        stat="PTS"
        />

      <StatTable 
        title="Assit Leaders"
        players={assistsStats}
        stat="REB"
        />
      </div>

    </Panel >
  </Container>
  )
}

export async function getServerSideProps() {

  let goalLeaders: PlayerTotals[] = []
  let assistsLeaders: PlayerTotals[] = []

  let goalStats:{id: number, name:  string, stat: number }[] = []
  let assistsStats:{id: number, name:  string, stat: number }[] = []
  
  try {
    goalLeaders = await getStatLeaders('goals') 
    assistsLeaders = await getStatLeaders('assists') 
    goalStats = goalLeaders.map((leader) => {
      return {
        id: leader.player_id,
        name: leader.player_name,
        stat: leader.goals
      }
    })
    assistsStats = assistsLeaders.map((leader) => {
      return {
        id: leader.player_id,
        name: leader.player_name,
        stat: leader.assists
      }
    })

  } catch (e) {
    console.error('Unable to get data')
  }
  return { props: {goalStats, assistsStats}}
}
