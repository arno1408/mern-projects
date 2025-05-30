import React from 'react'
import { FaPlus } from 'react-icons/fa'
const Plus_Green_btn = ({ onClick }) => {
    return (
        <span className=" cursor-pointer w-8 h-8 p-2 flex items-start justify-center bg-accent-bright-green bg-opacity-20 md:bg-opacity-100  rounded-full"
            onClick={onClick}
        ><FaPlus size={15} />
        </span>
    )
}
 
export default Plus_Green_btn