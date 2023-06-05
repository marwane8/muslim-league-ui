
import NextLink from 'next/link';
import React, { useState } from "react"

import Container from '../components/container'
import Basketball from '/public/svgs/basketball.svg'
import Soccer from '/public/svgs/soccer.svg'


enum Sport {
   HOME,
   BASKETBALL,
   SOCCER 
}
type NavLinks = {
  name: string,
  link: string,
  toggle: boolean,
  sport?: Sport
}[]

export default function Navbar() {
    
    const homeNav = [
        {
            name: 'Basketball',
            link: '/basketball',
            toggle: true,
            sport: Sport.BASKETBALL
        },

        {
            name: 'Soccer',
            link: '/soccer',
            toggle: true,
            sport: Sport.SOCCER
        },
        {
            name: 'About',
            link: '/about',
            toggle: false 
        },
    ]

    const basketballNav = [
        {
            name: 'Games',
            link: '/basketball/games/20220610',
            toggle: false 
        },

        {
            name: 'Standings',
            link: '/basketball/standings',
            toggle: false 
        },
        {
            name: 'Stats',
            link: '/basketball/stats',
            toggle: false 
        },
        {
            name: 'Teams',
            link: '/basketball/teams',
            toggle: false 
        },

    ]
    const soccerNav = [
        {
            name: 'Standings',
            link: '/soccer/standings',
            toggle: false 
        },
        {
            name: 'Stats',
            link: '/soccer/stats',
            toggle: false 
        },
        {
            name: 'Teams',
            link: '/soccer/teams',
            toggle: false 
        },
    ]

    const [sport, setSport]  = useState<Sport>(Sport.HOME)
    const [navLinks, setNavLinks]  = useState<NavLinks>(homeNav)

    const toggleSport = (sport: Sport | undefined) => {
        if (sport === Sport.BASKETBALL) {
            setNavLinks(basketballNav);
            setSport(Sport.BASKETBALL);
        } else if ( sport === Sport.SOCCER) {
            setNavLinks(soccerNav);
            setSport(Sport.SOCCER);
        } else {
            setNavLinks(homeNav);
            setSport(Sport.HOME);
        }

    }

    const renderSport = () => {
        if (sport === Sport.SOCCER) {

            return  (
                <NextLink href='/soccer'>
                    <h1 className='duration-500 hover:text-primary-100 cursor-pointer'>
                        Soccer
                    </h1>
                </NextLink>
            );
        } else if (sport === Sport.BASKETBALL) {
            return  (
                <NextLink href='/basketball'>
                    <h1 className='duration-500 hover:text-red cursor-pointer'>
                        Basketball
                    </h1>
                </NextLink>
            );
        } else {
            return <h1 className='cursor-default'> Leagues </h1>;
        }
    };
    return (
        <>
        <div className="p-12">  </div>
        <div className="bg-primary w-full fixed z-10">
            
        <nav className="container max-w-screen-xl p-2">
            <div className="flex flex-row-reverse justify-end items-center">
                <span className="flex items-center m-auto text-2xl font-bold text-white cursor-pointer">
                    <div className='duration-500 hover:text-primary-500' onClick={() => toggleSport(Sport.HOME)}>
                      <NextLink href='/'>
                        <h1 className='mr-6'>
                            Muslim League CT
                        </h1>
                      </NextLink>
                    </div>

                    <div className={ 
                      sport===Sport.BASKETBALL ? 'text-red' : 'duration-500 hover:text-red' } 
                      onClick={() => toggleSport(Sport.BASKETBALL)}>
                    <NextLink href='/basketball'>
                         <div>
                         <Basketball className="w-9 mx-1" />
                        </div>
                    </NextLink>
                    </div>
                    <div className={ 
                      sport===Sport.SOCCER ? 'text-primary-100' : 'duration-500 hover:text-primary-100' } 
                      onClick={() => toggleSport(Sport.SOCCER)}>
                    <NextLink href='/soccer'>
                         <div>
                         <Soccer className="w-9 mx-1" />
                        </div>
                    </NextLink>
                    </div>
               </span>

            </div>

        </nav>
        <div className='bg-white shadow-md shadow-gray-300'> 
            <Container>
                <nav className='flex p-2 justify-between'>
                    
                    <div className='flex text-lg pr-2 font-bold border-r-2 md:border-none'> {renderSport()} </div>
                    <ul className='flex overflow-y-auto'>

                        { navLinks.map((page,index) => (

                            <NextLink key={index} href={page.link}>
                                <li className='mx-3 text-lg cursor-pointer text-gray-300  pb-0 pr-0 hover:text-primary-500'>
                                    <a onClick={() => page.toggle ? toggleSport(page.sport) : null }> {page.name} </a>  
                                </li>
                            </NextLink>

                        ))}
                    
                    </ul>

                </nav>
            </Container>
        </div>
        </div>
        </>
    )    
}
    