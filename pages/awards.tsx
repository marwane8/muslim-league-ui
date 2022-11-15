import React from "react"
import Container from "../components/container"

import Header from '../components/header'
import Image from 'next/image'

import mvp from '/public/awards/mvp.jpg' 
import scoringLeader from '/public/awards/scoring_leader.jpg' 
import reboundLeader from '/public/awards/rebound_leader.jpg' 
import dpoy from '/public/awards/dpoy.jpg' 
import classAct from '/public/awards/class_act.jpg' 

export default function Award() {
    

    const players = [
        {
            award: 'MVP',
            name: 'Kyle Walker',
            src: mvp
        },
        {
            award: 'Scoring Leader',
            name: 'Ralph',
            src: scoringLeader
        },
        {
            award: 'Rebound Leader',
            name: 'Kabar',
            src: reboundLeader
        },
        {
            award:'DPOY',
            name: 'Abdullah',
            src: dpoy
        },
        {
            award: 'Class Act',
            name: 'Mohammed',
            src: classAct
        }
    ]

    return (
       <Container>
            <Header title='Awards | Muslim League CT'/> 
            <h2 className='m-8 text-2xl font-bold text-center text-primary md:text-4xl'> 2021 Awards </h2>
            <div className="flex flex-wrap justify-center max-w-xl gap-10 m-auto mb-10">
                { players.map((player,index) => (

                <div key={index} className="rounded-xl pb-1 text-center overflow-hidden bg-gray shadow-lg w-[250px]"> 
                        <Image
                            src={player.src} 
                            alt="Award Winner Holding Trophy"
                        />
                    <h2 className="text-lg font-bold text-primary">{player.award}</h2> 
                    <p>{player.name}</p>
                </div>
                ))}
            </div>
       </Container>     
    )    
}
