import { useState } from 'react';
import { GetServerSideProps } from 'next'

import Header from '../../../../components/header'
import Container from '../../../../components/container'
import Panel from '../../../../components/panel'
import { Game } from '../../../../utils/league-types'
import { formatDate } from '../../../../utils/utils';
import InputStatsForm from '../../../../components/forms/input-stats-form';
import { getGamesForSeason } from '../../../../utils/api/apis';

type Props = {
  sport: string,
  games: Game[]
}

const InputStats = ({sport, games}: Props) => {

  const handleGameClick = async (game: Game) =>  {
    setCurrGame(game);
    setShowGameTable(true);
  }
 
  const [currGame,setCurrGame] = useState<Game>(games[0]);
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
                        <th className='min-w-[100px]'> Home </th>
                        <th className='min-w-[80px]'> Away </th>
                        <th className='min-w-[120px]'> Date </th>
                        <th className='min-w-[80px]'> Time </th>
                        <th className=''> Court </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  { games.map((game,index) => (

                    <tr key={index} className={ 'cursor-pointer border-b border-gray-100 hover:bg-gray-100 hover:font-bold ' + (index%2 ?  'bg-gray' : 'bg-white') } 
                                      onClick={() => handleGameClick(game)}> 
                      <td className='flex justify-center py-2'> <span className='my-auto w-6 ml-1 font-bold'> {index+1} </span> <div className='w-full'> {game.team1} </div> </td>
                      <td className=''> {game.team2} </td>
                      <td className=''>  {formatDate(game.date)} </td>
                      <td className=''> {game.start_time} </td>
                      <td className=''> {game.court} </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </Panel>
      </Container>

      <InputStatsForm
        sport={sport}
        game={currGame}
        stats={['goals','assists']}
        showTable={showGameTable}
        setShowTable={setShowGameTable} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { sport,season_id } = context.query


  console.log("CONTEXT: ", sport,season_id )
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
    }
  ]

  const sportID: string = sport as string;
  const seasonIDValue: string = season_id as string;
  const seasonID = parseInt(seasonIDValue);

  try {
      games = await getGamesForSeason(sportID, seasonID);
  } catch (e) {
    console.error('Unable to fetch season games')
  }


  return { props: { sport: sportID, games }}

}

export default InputStats