import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { UI_URL } from '../../../../utils/api/api-utils'
import Header from '../../../../components/header'
import Container from '../../../../components/container'

import GameDatesMenu from '../../../../components/widgets/game-dates-menu'
import GameCard from '../../../../components/widgets/basketball-game-card'

import { formatNowToYYYYMMDD, getNextGameDate } from '../../../../utils/utils'

import { Season, makeSeasonOptions, Game, TeamStats } from '../../../../utils/league-types'

import { getSeasons, getGameDates, getGamesForDate, getStandings } from '../../../../utils/api/league-api'


type Props = {
  init_season_id: number,
  season_options: {key: number, value: string}[],
  standings: TeamStats[],
  game_dates: number[],
  init_game_date: number,
  init_game_index: number,
  games: Game[]
}

const Games = ({season_options, init_season_id, standings,game_dates,init_game_date, init_game_index, games}: Props) => {
  const [currGameDay,setGameDay] = useState<number>(init_game_date);

  const handleSeasonChange = async (e: any) => {
    const new_season_id: number = e.target.value;
    const today = formatNowToYYYYMMDD();
    const gamesLink = '/basketball/' + new_season_id + '/games/' + today;

    const newUrl = UI_URL + gamesLink;
    window.location.assign(newUrl);
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
            <GameCard key={index} gameData={game} standings={standings}/>
        ))}
      </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { sport, season_id, game_date } = context.query

    const init_sport = String(sport);
    let seasons: Season[] = [];
    let init_season_id: number = Number(season_id); 
    let init_game_date: number = Number(game_date);
    let init_game_index: number = 0;

    let standings: TeamStats[] = [];
    let game_dates: number[] = [];
    let games: Game[] = [];

    try {
      seasons = await getSeasons(init_sport);
      standings=  await getStandings(init_sport, init_season_id);

      game_dates = await getGameDates(init_season_id);
      let nextGameDate = getNextGameDate(init_game_date,game_dates);

      init_game_index = Math.floor(nextGameDate.index/4) * 4 ;

      init_game_date = nextGameDate.date; 

      games = await getGamesForDate(init_game_date);
      
    } catch (e) {
      console.error('Unable to get data: ', e);
    }

    let season_options = seasons.map((season) => makeSeasonOptions(season));
    return { props: { init_sport, season_options, init_season_id, standings, game_dates, init_game_date, init_game_index, games }}

}

export default Games 
