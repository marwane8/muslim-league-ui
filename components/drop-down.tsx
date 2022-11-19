import React from "react"

import { useState } from 'react'

import Down from '/public/svgs/down.svg'


export default function DropDown() {
    const [open, setOpen] = useState<boolean>(false)
    const [subMenu, setSubMenu] = useState<string>('hidden')

    const toggleMenu = () => {
        if(open) {
            setOpen(false);
            setSubMenu('hidden');
        } else {
            setOpen(true);
            setSubMenu('')
        }
    }
    
    const options = [
        {
            year: 2021,
            season: 'SUMMER'
        },
        {
            year: 2022,
            season: 'SUMMER'
        }
    ]

  return (

      <div className="relative">

        <h2 className="text-xs mb-1 ml-1 font-bold text-gray-200"> SEASON </h2>
        <button className="bg-gray-100 focus:ring-2 hover:bg-gray-150 flex justify-between font-bold mb-2 py-1 px-2 text-sm rounded-md w-64"
                onClick={() => toggleMenu()}> 
          <div>SUMMER 22</div> 
          <Down className="text-black w-5"/>
        </button>
        <ul className={`absolute left-4 bg-gray-100 border border-gray-200 rounded-md text-center w-56 ${subMenu}`}>
            { options.map((season,index) => (
                <li key={index }className="text-gray-200 hover:font-bold cursor-pointer hover:bg-gray-150 text-sm py-1">
                    {season.season} {season.year}
                </li>
 
            ))}
        </ul>
      </div>
 
  )
}


type Props = {
  title?: string,
  button?: string,
  link?: string,
  tailWindImage?: string
}
