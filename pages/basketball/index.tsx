
import championpic from '/public/champions.jpg' 

import Header from '../../components/header'
import Container from '../../components/container'
import Panel from '../../components/panel'
import ImageCard from '../../components/widgets/image-card'
import FancyButton from '../../components/widgets/fancy-button'
import MiniStandings from '../../components/tables/mini-standings'

import { getStandings } from '../../utils/api/basketball-api'
import { Team } from '../../utils/bball-types'

type Props = {
  standings: Team[]
}

const BasketballHome = ({standings}: Props) => {
  return (
    <>
      <Header title='Basketball | Muslim League CT'/> 
      <Container>

        <Panel title='2022 Season Recap'>
          <div className='flex justify-center'>
            <ImageCard 
              title='Top Akhs win 2022 Championship'
              src={championpic}
              alt='Picture of Championship Team'
              date='August 7th, 2022'>
            <p> 
              Top Akhs defeat The Springfield Rockets in a close battle to 
              defend their title as back to back Muslim League champions.
            </p>
            </ImageCard>
          </div>
          <div className='max-w-5xl m-auto md:grid md:grid-cols-2'> 
            <div className='row-span-2'>
              <MiniStandings
                title='2022 Standings'
                standings={standings}
              />
            </div>
            <FancyButton 
              title='OUR LEAGUE LEADERS'
              button='LEADERS'
              link='/basketball/stats'
              tailWindImage='bg-award_img'
            />
            <FancyButton 
              title='2022 RANKINGS'
              button='STANDINGS'
              link='/basketball/standings'
              tailWindImage='bg-scoring_img'
            />
          </div>

        </Panel>
      </Container>

    </>
  )
}

export async function getServerSideProps() {

  let standings_data: Team[] = []

  try {
    standings_data = await getStandings(3)
  } catch (e) {
    console.error('Unable to get data')
  }
  return { props: {standings: standings_data}}
}


export default BasketballHome 

