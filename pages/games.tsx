import Header from '../components/header'
import Container from '../components/container'

import GameMenu from '../components/widgets/game-menu'
import GameCard from '../components/widgets/game-card'


type Props = {
  gamesData: []
}

const gameDay = [
  {
    team1: 'Top Akhs',
    record1: '6 - 2',
    score1: 98,
    team2: 'Rockets',
    record2: '8 - 0',
    score2: 102
  },
  {
    team1: 'Islam Dunk',
    record1: '5 - 3',
    score1: 76,
    team2: 'The Akatsuki',
    record2: '3 - 5',
    score2: 88 
  }
]

const Games = ({gamesData}: Props) => {
  return (
      <Container>
        <Header title='Games | Muslim League CT'/> 

        <GameMenu pageLength={4} games={gamesData}/>
        {
          gameDay.map((game,index) => (
            <GameCard key={index} gameScore={game}/>
        ))}

      </Container>
  )
}

export async function getServerSideProps() {

    const dates = [
        {
            weekday: 'MON',
            date: 'NOV 24'
        },
        {
            weekday: 'TUE',
            date: 'NOV 25'
        },
        {
            weekday: 'WED',
            date: 'NOV 26'
        },
        {
            weekday: 'THU',
            date: 'NOV 27'
        },
        {
            weekday: 'FRI',
            date: 'DEC 28'
        },
        {
            weekday: 'SAT',
            date: 'DEC 29'
        },
        {
            weekday: 'TUE',
            date: 'JAN 01'
        },
        {
            weekday: 'TUE',
            date: 'JAN 01'
        },
        {
            weekday: 'TUE',
            date: 'JAN 01'
        },

      ]
 
  let games_data = dates

  try {
    //games_data = await getStandings(3)
  } catch (e) {
    console.error('Unable to get data')
  }
  return { props: {gamesData: games_data}}

}

export default Games 
