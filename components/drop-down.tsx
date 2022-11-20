import React from "react"
import { NextPage } from "next"
import { useState } from 'react'

const DropDown: NextPage<Props> = ({title,options=[]}) => {
    
    const [season,setSeason] = useState<number>(2022)

    const handleSeasonChange = (event: any) => {
        setSeason(event.target.value)
    }


    return (
        <>
            <h2 className="text-xs mb-1 ml-1 font-bold text-gray-200"> {title} </h2>
            <div>
                <select className="bg-gray-100 focus:ring-2 hover:bg-gray-150 flex justify-between font-bold mb-2 py-1 px-2 text-sm rounded-md w-64" 
                        onChange={(e) => {handleSeasonChange(e)}}
                >
                    { options.map((ops,index) => (
                        <option key={index} value={ops.value}> {ops.value} </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default DropDown

type Props = {
  title?: string,
  options: {key: number, value: string}[],
}
