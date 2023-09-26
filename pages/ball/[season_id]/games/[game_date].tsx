import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import Header from '../../../../components/header'
import Container from '../../../../components/container'

import GameDatesMenu from '../../../../components/widgets/game-dates-menu'
import GameCard from '../../../../components/widgets/basketball-game-card'

import { formatNowToYYYYMMDD, getNextGameDate } from '../../../../utils/utils'

import { Sport, Season, makeSeasonOptions, Game } from '../../../../utils/league-types'
import { BballTeamData } from '../../../../utils/basketball-types'

import { getSeasons, getGameDates, getGamesForDate,} from '../../../../utils/api/league-api'
import { getStandings } from '../../../../utils/api/basketball-api'


type Props = {
  season_options: {key: number, value: string}[],
  init_season_id: number,
  season_standings: BballTeamData[],
  game_dates: number[],
  init_game_date: number,
  init_game_index: number,
  games: Game[]
}

const Games = ({season_options, init_season_id, season_standings,game_dates,init_game_date, init_game_index, games}: Props) => {
  const router = useRouter()
  const [currGameDay,setGameDay] = useState<number>(init_game_date);

  const handleSeasonChange = async (e: any) => {
    const new_season_id: number = e.target.value;
    const today = formatNowToYYYYMMDD();
    const gamesLink = '/basketball/' + new_season_id + '/games/' + today;
    router.push(gamesLink);
  }

    return (
      <Container>
        <Header title='Games | Muslim League CT'/> 

        <GameDatesMenu 
          pageLength={4} 
          pageLink='/basketball'          
          startIndex={init_game_index}
          seasonsOptions={season_options}
          changeSeason={handleSeasonChange}
          currentSeason={init_season_id}
          currentDate={currGameDay} 
          changeGame={setGameDay} 
          gameDatesArray={game_dates} 
          />

        {
          games.map((game,index) => (
            <GameCard key={index} gameData={game} standings={season_standings}/>
        ))}
      </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { season_id, game_date } = context.query

    let seasons: Season[] = [];
    let init_season_id: number = Number(season_id); 
    let init_game_date: number = Number(game_date);
    let init_game_index: number = 0;

    let season_standings: BballTeamData[] = [];
    let game_dates: number[] = [];
    let games: Game[] = [];

    try {
      seasons = await getSeasons(Sport.BASKETBALL);
      season_standings=  await getStandings(init_season_id);

      game_dates = await getGameDates(Sport.BASKETBALL,init_season_id);
      let nextGameDate = getNextGameDate(init_game_date,game_dates);

      init_game_index = Math.floor(nextGameDate.index/4) * 4 ;

      init_game_date = nextGameDate.date; 

      games = await getGamesForDate(Sport.BASKETBALL,init_game_date);
      
    } catch (e) {
      console.error('Unable to get data: ', e);
    }

    let season_options = seasons.map((season) => makeSeasonOptions(season));
    return { props: {season_options, init_season_id, season_standings, game_dates, init_game_date, init_game_index, games }}

}

export default Games 
