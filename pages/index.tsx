import championpic from '/public/champions.jpg' 

import Header from '../components/header'
import Container from '../components/container'
import Panel from '../components/panel'
import ImageCard from '../components/widgets/image-card'
import FancyButton from '../components/widgets/fancy-button'
import MiniStandings from '../components/tables/mini-standings'

import { TeamData } from '../utils/league-types'
import { getStandings } from '../utils/api/league-api'

type Props = {
  standings: TeamData[]
} 

const Home = ({standings}: Props) => {
  return (
    <> 
      <Header /> 
      <div className='flex items-end bg-right bg-no-repeat lg:bg-right py-7 bg-[length:700px] sm:bg-cover bg-prayer_img h-[300px] sm:h-[600px]'>
        <Container>
         <h1 className='my-1 ml-2 text-4xl font-extrabold text-white md:text-7xl'>The Muslim League</h1>
          <p className='mt-1 ml-2 font-bold text-white text-l md:text-xl'>Uniting muslim athletes across CT.</p>
        </Container> 
      </div>

      <Container>

        <Panel title='2023 Soccer Season Live!'>
          <p className='text-l'> 
            Visit the soccer page for live updates on the Muslim League Soccer League 
          </p>
        </Panel> 


        <Panel title='2023 Basketball Season Coming Soon'>
          <p className='text-l'> 
            Details for the 2023  Season will roll out next month Inshallah.
            <span className='hidden pl-1 sm:inline'>
              Come back for updates and visit our social media for the latest content.
            </span>
          </p>
        </Panel> 

      </Container>
   </>
  )
}

export async function getServerSideProps() {

  let standings_data: TeamData[] = []

  try {
    //standings_data = await getStandings("basketball",))
  } catch (e) {
    console.error('Unable to get data')
  }
  return { props: {standings: standings_data}}
}

export default Home