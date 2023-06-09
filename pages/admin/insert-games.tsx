

import Header from '../../components/header'
import Container from '../../components/container'
import Panel from '../../components/panel'
import { Game } from '../../utils/types'
import { useState } from 'react';
import { formatDate } from '../../utils/utils';
import StatsForm from '../../components/forms/stats-form';


type Props = {
  games: Game[],
}

const SelectGames = ({games}: Props) => {


  let initialGame = {
      "season_id": 2,
      "game_id": 5,
      "team1_id": 5,
      "team1": "Pirates",
      "team2_id": 6,
      "team2": "Rangers",
      "date": 20240710,
      "start_time": "7:00 PM",
      "court": 1,
      "playoff": 0
    }



  const handleGameClick = async (game: Game) =>  {
    setCurrGame(game);
    setShowGameTable(true);
  }

 
  const [currGame,setCurrGame] = useState<Game>(initialGame);
  const [showGameTable,setShowGameTable] = useState<boolean>(false);

  return (
    <>
      <Container>
        <Header title='Input Game Stat - Admin | Muslim League CT'/> 
          <Panel title='Select Game'  removeBorder={true} >
            <div className=" w-full mb-3 overflow-y-auto">
              <table className="min-w-[400px] w-full text-right">
                <thead className='text-gray-300 text-center border-gray-100 border-t-2 border-b-2'>
                  <tr >
                        <th className=''> Game </th>
                        <th className=''> Home </th>
                        <th className=''> Away </th>
                        <th className=''> Time </th>
                        <th className=''> Court </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  { games.map((game,index) => (

                    <tr key={index} className={ 'cursor-pointer border-b border-gray-100 hover:bg-gray-100 hover:font-bold ' + (index%2 ?  'bg-gray' : 'bg-white') } 
                                      onClick={() => handleGameClick(game)}> 
                      <td className='flex justify-center py-2'> <span className='w-4 ml-1 font-bold'> {index+1} </span> <div className='w-full'> {formatDate(game.date)} </div> </td>
                      <td className=''> {game.team1} </td>
                      <td className=''>  {game.team2} </td>
                      <td className=''> {game.start_time} </td>
                      <td className=''> {game.court} </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </Panel>
      </Container>

      <StatsForm
        game={currGame}
        stats={['goals','assists']}
        showTable={showGameTable}
        setShowTable={setShowGameTable} />
    </>
  )
}


export default SelectGames 

export async function getServerSideProps() {

  let games: Game[]= [
    {
      "season_id": 2,
      "game_id": 5,
      "team1_id": 5,
      "team1": "Pirates",
      "team2_id": 6,
      "team2": "Rangers",
      "date": 20240710,
      "start_time": "7:00 PM",
      "court": 1,
      "playoff": 0
    },
    {
      "season_id": 2,
      "game_id": 6,
      "team1_id": 7,
      "team1": "Bucks",
      "team2_id": 8,
      "team2": "Heat",
      "date": 20240710,
      "start_time": "9:00 PM",
      "court": 2,
      "playoff": 0
    },
    {
      "season_id": 2,
      "game_id": 7,
      "team1_id": 6,
      "team1": "Rangers",
      "team2_id": 7,
      "team2": "Bucks",
      "date": 20240821,
      "start_time": "11:30 AM",
      "court": 1,
      "playoff": 0
    }
  ]

  return { props: { games }}

}
