import { useRouter } from 'next/router';
import { useState } from 'react';

import Container from '../../components/container';
import Header from '../../components/header';
import Panel from '../../components/panel';
import Modal from '../../components/modal';

import { Sport, Season } from '../../utils/league-types';
import { getSeasons } from '../../utils/api/league-api';
import { capFirstLetter } from '../../utils/utils';

type Props = {
  seasons: Season[],
  init_season: Season 
}

export default function Admin({seasons, init_season}: Props) {

    const router = useRouter();
    const [showSeasons,setShowSeasons] = useState<boolean>(false);
    const [season,setSeason] = useState<Season>(init_season);
 
    const handleEditRostersClick = async () => {
        const link = '/admin/'+ Sport[season.sport_id] + '/' + season.id + '/edit-roster';
        router.push(link);
    }

    const handleInsertGamesClick = async () => {
        const link = '/admin/'+ Sport[season.sport_id] + '/' + season.id + '/edit-stats';
        router.push(link);
    }


    const handleSeasonClick = async () => {
        setShowSeasons(true);
    }
    const handleSelectSeason = (season: Season ) => {
        setSeason(season);
        setShowSeasons(false);
    }



    return (
      <>
        <Header title='Admin | Muslim League CT'/>
        <Container>

            <h1 className='mt-5 py-5 text-4xl font-bold text-center grow  text-primary'>  League Admin </h1>
            <Panel 
                title={ capFirstLetter(Sport[season.sport_id]) + " - " + season.name + " " + season.year}
                titleSize='large'>

            <div className='m-auto grid grid-cols-2 max-w-3xl  gap-4 my-7'>
                <div className='h-24'> 
                    <button className={`font-bold text-xl px-2 rounded-xl  text-white w-full h-full bg-primary hover:bg-primary-100`}
                                onClick={handleEditRostersClick}>

                        Edit {season.name} {season.year} Rosters
                    </button>
                </div>
                <div className='h-24'> 
                    <button className='font-bold px-2 text-xl  rounded-xl text-gray-200 w-full h-full bg-gray-100 cursor-default' >
                        Edit {season.name} {season.year} Schedule 
                    </button>
                </div>

                <div className='h-24 col-span-2'>
                    <button className={`font-bold text-3xl rounded-xl  text-white w-full h-full bg-primary hover:bg-primary-100`}
                                onClick={handleInsertGamesClick}>
                       Edit  {season.name} {season.year}  Stats
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
                    { seasons.map((season,index) => (
                        <div key={index}
                         className= { season.sport_id === 2 ? 
                              'bg-primary cursor-pointer hover:bg-primary-100 py-1 text-center font-bold text-lg text-white rounded-md' 
                            : 'bg-secondary cursor-pointer hover:bg-secondary-100 py-1 text-center font-bold text-lg text-white rounded-md'}
                         onClick={() => handleSelectSeason(season)}                         
                         > 
                            { capFirstLetter(Sport[season.sport_id]) + " | " + season.name + " " + season.year}
                        </div>

                    ))}
                </div>
            </div>
        </Modal>
      </>
    );
}

export async function getServerSideProps() {

  let seasons: Season[]=[];
  let init_season: Season = {id: 0, sport_id: 0, name: 'sport', year: 0};

  try {
    seasons = await getSeasons("all");
    init_season = seasons.slice(-1)[0];
  } catch (e) {
    console.error('Unable to get data')
  }

  return { props: { seasons, init_season}}

}
