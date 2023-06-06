import React from "react"
import Container from "../../components/container"
import DropDown from "../../components/widgets/drop-down"
import StatTable from "../../components/tables/stat-table"

import Header from '../../components/header'
import Panel from '../../components/panel'

import { getStatLeaders } from "../../utils/api/basketball-api"
import { PlayerStat } from "../../utils/bball-models"


type Props = {
  pointsStats:{id: number, name:  string, stat: number}[],
  reboundStats:{id: number, name:  string, stat: number }[]
}


export default function Standings({pointsStats,reboundStats}: Props) {

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
        title="Scoring Leaders"
        players={pointsStats}
        stat="PTS"
        />

      <StatTable 
        title="Rebounding Leaders"
        players={reboundStats}
        stat="REB"
        />
      </div>

    </Panel >
  </Container>
  )
}

export async function getServerSideProps() {

  let pointsLeaders: PlayerStat[] = []
  let reboundLeaders: PlayerStat[] = []
  
  let pointsStats:{id: number, name:  string, stat: string }[] = []
  let reboundStats:{id: number, name:  string, stat: string }[] = []
 
  try {
    reboundLeaders = await getStatLeaders('rebounds') 
    pointsLeaders = await getStatLeaders('points') 
    pointsStats = pointsLeaders.map((leader) => {
      return {
        id: leader.id,
        name: leader.name,
        stat: leader.stat
      }
    })

    reboundStats = reboundLeaders.map((leader) => {
      return {
        id: leader.id,
        name: leader.name,
        stat: leader.stat
      }
    })


  } catch (e) {
    console.error('Unable to get data')
  }
  return { props: {pointsStats, reboundStats}}
}

