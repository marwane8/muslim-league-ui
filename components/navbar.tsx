import Link from "next/link"
import React from "react"

import { useState } from 'react'

import Menu from '/public/svgs/menu.svg'
import Close from '/public/svgs/close.svg'
import Basketball from '/public/svgs/basketball.svg'

export default function Navbar() {
    

    const [open, setOpen] = useState<boolean>(false)
    const [subMenu, setSubMenu] = useState<string>('opacity-0 top-[-200px]')

    const toggleMenu = () => {
        if(open) {
            setOpen(false);
            setSubMenu('opacity-0 top-[-200px]');
        } else {
            setOpen(true);
            setSubMenu('bg-primary rounded-b-lg top-[32px] shadow-2xl')
        }
    }

    const pages = [
        {
            name: 'Standings',
            link: '/standings'
        },
        {
            name: 'Awards',
            link: '/awards'
        },
        {
            name: 'Teams',
            link: '/teams'
        },

        {
            name: 'About',
            link: '/about'
        },
    ]

    return (
        <div className="bg-primary">
        <nav className="container max-w-screen-xl p-1 md:flex md:items-center md:justify-between">
            <div className="flex items-center justify-between">
                <span className="flex items-center text-xl font-bold text-white">
                    <Link href='/'>
                         <div>
                         <Basketball className="w-10 mx-2 duration-500 cursor-pointer hover:text-primary-500" />
                        </div>
                    </Link>
                    Muslim League CT
               </span>

               <div className="pr-2" onClick={() => toggleMenu()}>
                 {open ? <Close className="block text-white cursor-pointer md:hidden w-7"/> : <Menu className="block text-white cursor-pointer md:hidden w-7"/> }
                </div> 

            </div>

            <ul className={`z-[1] md:flex my-4 pb-3 md:shadow-none md:my-0 md:items-center tansition-all absolute ease-in duration-500 md:bg-primary md:opacity-100 md:static  ${subMenu}`}>

                { pages.map((page,index) => (
                <li key={index} onClick={() => toggleMenu()} className="pt-3 pb-1 mx-3 text-lg font-bold text-white duration-500 border-b pr-9 md:pb-0 md:pr-0 md:border-none md:my-0 hover:text-primary-500">
                    <Link href={page.link}>
                        {page.name}
                    </Link>
                </li>
 
                ))}
            
            </ul>
        </nav>
        </div>
    )    
}
    