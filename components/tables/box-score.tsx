import React, { ReactNode } from "react"
import { NextPage } from "next"
import { useState, useEffect } from "react"

import Modal from "../modal"
import { Game } from "../../utils/league-types"

import { formatDate } from "../../utils/utils"
import BoxScoreTable from "./box-score-table"

import { PlayerGameStats } from "../../utils/league-types"
import { getPlayerGameStats } from "../../utils/api/league-api"

type Props = {
    game: Game,
    showTable: boolean,
    setShowTable: (showTable: boolean) => void,
    children?: ReactNode
}

const BoxScore: NextPage<Props> = ({game, showTable, setShowTable}: Props) => {
  const [gameStats, setGameStats] = useState<PlayerGameStats[]>([]);

  useEffect(() => {

    getPlayerGameStats(game.game_id,true)
        .then((stats: PlayerGameStats[]) => {
            setGameStats(stats);
        })

    },[game]);

    return (
        <Modal isVisible={showTable}
                onClose={() => setShowTable(false)}>
          <div className='container max-w-screen-sm bg-gray-100 rounded-xl'>

                <h1 className='mt-3 text-2xl font-bold text-center text-primary'> {game.team1}  vs {game.team2} </h1>
                <h1 className='text-xl text-center ' >   </h1>
                <h1 className="text-center text-md"> { formatDate(game.date) }  </h1>
                <div className="m-auto flex flex-col border-t-2 border-b-2 border-gray-200 bg-white  pt-5 mt-2 mb-5  w-[600px] max-w-full overflow-y-scroll  max-h-[400px]">
                    <BoxScoreTable
                        team_id={game.team1_id} 
                        team_name={game.team1}
                        game_stats={gameStats}
                    />
                    <BoxScoreTable
                        team_id={game.team2_id} 
                        team_name={game.team2}
                        game_stats={gameStats}
                    />
                </div>
           </div>
        </Modal>
    )
}

export default BoxScore