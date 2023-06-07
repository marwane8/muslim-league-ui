import React from "react"
import { NextPage } from "next"

type Props = {
  title?: string,
  options: {key: number, value: string}[]
  dropDownSize?: string,
  currentOption: number,
  changeOption?: any
}

const DropDown: NextPage<Props> = ({title,options=[],dropDownSize='',currentOption,changeOption}) => {
    let dropDownWidth = 'w-64'
    switch(dropDownSize) {
        case 'small':
            dropDownWidth = 'w-42';
            break;
        case 'medium':
            dropDownWidth = 'w-52';
            break;
        case 'large':
            dropDownWidth = 'w-64';
            break;
    }


    return (
        <>
            <h2 className="text-xs mb-1 ml-1 font-bold text-gray-200"> {title} </h2>
            <div>
                <select className={`bg-gray-100 ${dropDownWidth} focus:ring-2 hover:bg-gray-150 flex justify-between font-bold mb-2 py-1 px-2 text-sm rounded-md`} 

                        value={currentOption}
                        onChange={changeOption}
                >
                    { options.map((ops,index) => (
                        <option key={index} value={ops.key}> {ops.value} </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default DropDown

