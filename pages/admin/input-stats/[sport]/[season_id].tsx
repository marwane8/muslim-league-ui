import { useState } from 'react';
import { GetServerSideProps } from 'next'

import Header from '../../../../components/header'
import Container from '../../../../components/container'
import Panel from '../../../../components/panel'
import { Game, Sport, stringToEnum } from '../../../../utils/league-types'
import { formatDate } from '../../../../utils/utils';
import InputStatsForm from '../../../../components/forms/input-stats-form';
import { getGamesForSeason } from '../../../../utils/api/league-api';

type Props = {
  sport: Sport,
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

                    <tr key={index} className={ 'cursor-pointer border-b border-gray-100 hover:bg-gray-300 hover:text-white ' + (index%2 ?  'bg-gray' : 'bg-white') } 
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
        showTable={showGameTable}
        setShowTable={setShowGameTable} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { sport,season_id } = context.query

  let e_sport: Sport = stringToEnum(String(sport));
  let seasonID = Number(season_id);
  let games: Game[]= [];

  try {
      games = await getGamesForSeason(e_sport, seasonID);
  } catch (e) {
    console.error('Unable to fetch season games', e)
  }


  return { props: { sport: e_sport, games }}

}

export default InputStats