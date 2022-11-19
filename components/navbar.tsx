import Link from "next/link"
import React from "react"

import { useState } from 'react'

import Menu from '/public/svgs/menu.svg'
import Close from '/public/svgs/close.svg'
import Basketball from '/public/svgs/basketball.svg'

export default function Navbar() {
    

    const [open, setOpen] = useState<boolean>(false)
    const [subMenu, setSubMenu] = useState<string>('opacity-0 left-[-150px] top-[32px]')

    const toggleMenu = () => {
        if(open) {
            setOpen(false);
            setSubMenu('opacity-0 left-[-150px] top-[32px]');
        } else {
            setOpen(true);
            setSubMenu('bg-primary rounded-b-lg left-[-4px] top-[32px] ')
        }
    }

    const pages = [
        {
            name: 'Standings',
            link: '/standings'
        },
        {
            name: 'Teams',
            link: '/teams'
        },
        {
            name: 'Stats',
            link: '/stats'
        },
        {
            name: 'Awards',
            link: '/awards'
        },

        {
            name: 'About',
            link: '/about'
        },
    ]

    return (
        <>
        <div className="p-6">  </div>
        <div className="bg-primary w-full fixed z-30">
            
        <nav className="container max-w-screen-xl p-1 md:flex md:items-center md:justify-between">
            <div className="flex flex-row-reverse justify-end items-center md:justify-between">
                <span className="flex items-center m-auto text-xl font-bold text-white duration-500 cursor-pointer hover:text-primary-500">
                    <Link href='/'>
                         <div>
                         <Basketball className="w-10 mx-2" />
                        </div>
                    </Link>
                    <Link href='/'>
                        Muslim League CT
                    </Link>
               </span>

               <div className="ml-2" onClick={() => toggleMenu()}>
                 {open ? <Close className="block text-white cursor-pointer md:hidden w-7"/> : <Menu className="block text-white cursor-pointer md:hidden w-7"/> }
                </div> 

            </div>

            <ul className={`z-[1] md:flex my-4 pb-2 md:shadow-none md:my-0 md:items-center h-screen md:h-[10px] tansition-all absolute ease-in duration-500 md:bg-primary md:opacity-100 md:static  ${subMenu}`}>

                { pages.map((page,index) => (
                <li key={index} onClick={() => toggleMenu()} className="pt-2 pb-1 mx-3 text-lg font-bold text-white duration-500 border-b pr-9 md:pb-0 md:pr-0 md:border-none md:my-0 hover:text-primary-500">
                    <Link href={page.link}>
                        {page.name}
                    </Link>
                </li>
 
                ))}
            
            </ul>
        </nav>
        </div>
        </>
    )    
}
    