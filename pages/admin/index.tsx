import { useRouter } from 'next/router';
import { useState } from 'react';

import Container from '../../components/container';
import Header from '../../components/header';
import Panel from '../../components/panel';
import Modal from '../../components/modal';

import {  Sport, SportSeason, Season, makeSportSeason } from '../../utils/league-types';
import { getSeasons } from '../../utils/api/league-api';

import { formatSport } from '../../utils/utils';

type Props = {
  season_menu: SportSeason[],
  init_season: SportSeason
}

export default function Admin({season_menu, init_season}: Props) {

    const router = useRouter();
    const [showSeasons,setShowSeasons] = useState<boolean>(false);
    const [season,setSeason] = useState<SportSeason>(init_season);
 

    const handleInsertGamesClick = async () => {
        const link = '/admin/'+ season.sport +'/' + season.season_id + '/input-stats';
        router.push(link);
    }

    const handleSeasonClick = async () => {
        setShowSeasons(true);
    }
    const handleSelectSeason = (season: SportSeason ) => {
        setSeason(season);
        setShowSeasons(false);
    }



    return (
      <>
        <Header title='Admin | Muslim League CT'/>
        <Container>

            <h1 className='mt-5 py-5 text-4xl font-bold text-center grow  text-primary'>  League Admin </h1>
            <Panel 
                title={ formatSport(season.sport) + " - " + season.season_name + " " + season.year}
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
                       <h2> {formatSport(season.sport) + " - "  + season.season_name + " " + season.year + " "} </h2>
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
                    { season_menu.map((season,index) => (
                        <div key={index}
                         className= { season.sport === Sport.SOCCER ? 
                              'bg-primary cursor-pointer hover:bg-primary-100 py-1 text-center font-bold text-lg text-white rounded-md' 
                            : 'bg-secondary cursor-pointer hover:bg-secondary-100 py-1 text-center font-bold text-lg text-white rounded-md'}
                         onClick={() => handleSelectSeason(season)}                         
                         > 
                            { formatSport(season.sport) + " | " + season.season_name + " " + season.year}
                        </div>

                    ))}
                </div>
            </div>
        </Modal>
      </>
    );
}

export async function getServerSideProps() {

  let season_menu:SportSeason[]=[];
  let init_season: Season = {season_id: 0, season_name: 'none', year: 0};

  try {
    let soccer_seasons = await getSeasons(Sport.SOCCER);
    let soccer_menu = soccer_seasons.map((season) => makeSportSeason(Sport.SOCCER,season));

    let bball_seasons = await getSeasons(Sport.BASKETBALL);
    let bball_menu = bball_seasons.map((season) => makeSportSeason(Sport.BASKETBALL,season));
    season_menu = soccer_menu.concat(bball_menu);

    init_season = bball_menu.slice(-1)[0];
  } catch (e) {
    console.error('Unable to get data')
  }


  return { props: { season_menu, init_season}}

}
