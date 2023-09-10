import { useRouter } from 'next/router';
import { useState } from 'react';

import Container from '../../components/container';
import Header from '../../components/header';
import Panel from '../../components/panel';
import Modal from '../../components/modal';

import { Season, Sport } from '../../utils/league-types';
import { getSeasons } from '../../utils/api/league-api';

import { capitalizeFirstLetter } from '../../utils/utils';
type Props = {
  soccerSeasons: Season[],
  defaultSeason: Season
  defaultSport: string
}

export default function Admin({soccerSeasons, defaultSeason, defaultSport}: Props) {

    const router = useRouter();
    const [showSeasons,setShowSeasons] = useState<boolean>(false);
    const [season,setSeason] = useState<Season>(defaultSeason);
    const [sport,setSport] = useState<string>(defaultSport);
 

    const handleInsertGamesClick = async () => {
        const sportId: string = sport;
        const seasonId: number = season.season_id;
        const link = '/admin/input-stats/'+ sportId +'/' + seasonId;
        router.push(link);
    }

    const handleSeasonClick = async () => {
        setShowSeasons(true);
    }
    const handleSelectSeason = (season: Season, sport: string) => {
        setSport(sport);
        setSeason(season);
        setShowSeasons(false);
    }



    return (
      <>
        <Header title='Admin | Muslim League CT'/>
        <Container>

            <h1 className='mt-5 py-5 text-4xl font-bold text-center grow  text-primary'>  League Admin </h1>
            <Panel 
                title={ capitalizeFirstLetter(sport) + " - " + season.season_name + " " + season.year}
                titleSize='medium'>

            <div className='m-auto grid grid-cols-2 max-w-3xl  gap-4 my-7'>
                <div className='h-24'> 
                    <button className='font-bold text-xl rounded-xl text-gray-200 w-full h-full bg-gray-100 cursor-default' >
                        Edit {season.season_name} {season.year} Rosters
                    </button>
                </div>
                <div className='h-24'> 
                    <button className='font-bold  text-xl  rounded-xl text-gray-200 w-full h-full bg-gray-100 cursor-default' >
                        Edit {season.season_name} {season.year} Schedule 
                    </button>
                </div>

                <div className='h-24 col-span-2'>
                    <button className={`font-bold text-3xl rounded-xl  text-white w-full h-full bg-primary hover:bg-primary-100`}
                                onClick={handleInsertGamesClick}>
                       Input Stats
                       <h2> {capitalizeFirstLetter(sport) + " - "  + season.season_name + " " + season.year + " "} </h2>
                    </button>
                </div>
            </div> 
            </Panel>
            <Panel 
                title='Season Management'
                titleSize='medium'>

            <div className='m-auto grid grid-rows-2 max-w-3xl  gap-4 my-7'>
                <div className='h-24'>
                    <button className={`font-bold text-3xl rounded-xl  text-white w-full h-full bg-primary hover:bg-primary-100`}
                                onClick={handleSeasonClick}>
                        Select Season 
                    </button>
                </div>

                <div className='h-24'> 
                    <button className='font-bold text-2xl rounded-xl text-gray-200 w-full h-full bg-gray-100 cursor-default' >
                        Create a New Season 
                    </button>
                </div>
            </div> 
            </Panel>

        </Container>
        <Modal 
          isVisible={showSeasons}
          onClose={() => {setShowSeasons(false)}}>
            <div className='bg-white container max-w-screen-sm rounded-xl overflow-hidden'>
                <h1 className='font-bold text-2xl text-center mt-2'> Seasons </h1>
                <div className='grid grid-cols-2 gap-4 m-4'>
                    { soccerSeasons.map((season,index) => (
                        <div key={index}
                         className='bg-primary cursor-pointer hover:bg-primary-100 py-1 text-center font-bold text-lg text-white rounded-md'
                         onClick={() => handleSelectSeason(season,'soccer')}                         
                         > 
                            {"Soccer - " + season.season_name + " " + season.year}
                        </div>

                    ))}
                </div>
            </div>
        </Modal>
      </>
    );
}

export async function getServerSideProps() {

  let soccerSeasons: Season[]=[];
  let defaultSeason: Season = {season_id: 0, season_name: 'none', year: 0};
  let defaultSport: string = 'soccer';

  try {
    soccerSeasons = await getSeasons(Sport.SOCCER);
    defaultSeason = soccerSeasons.slice(-1)[0];
    defaultSport = 'soccer';
  } catch (e) {
    console.error('Unable to get data')
  }

  return { props: { soccerSeasons, defaultSeason, defaultSport}}

}
