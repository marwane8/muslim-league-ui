import React from "react"

import { useState } from 'react'

export default function DropDown() {
    
    const [season,setSeason] = useState<number>(2022)

    const handleSeasonChange = (event: any) => {
        setSeason(event.target.value)
    }

    const seasons = [
        {
            year: 2022,
            season: 'SUMMER'
        }
    ]

  return (
    <>
        <h2 className="text-xs mb-1 ml-1 font-bold text-gray-200"> SEASON </h2>
        <div>
            <select className="bg-gray-100 focus:ring-2 hover:bg-gray-150 flex justify-between font-bold mb-2 py-1 px-2 text-sm rounded-md w-64" 
                    value={season}
                    onChange={(e) => {handleSeasonChange(e)}}
            >
                { seasons.map((season,index) => (
                    <option key={index} value={season.year}>{season.season} {season.year} </option>
                ))}
            </select>
        </div>
    </>
  )
}
