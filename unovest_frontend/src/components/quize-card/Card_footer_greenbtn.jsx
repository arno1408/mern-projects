import React from 'react'
import RoundedBtn from '../RoundedBtn'
import { FaChevronLeft } from 'react-icons/fa'
import Plus_Green_btn from './Plus_Green_btn'
const Card_footer_greenbtn = ({ BackonClick, NextonClick, title, className, disableFooter=false,iconClassName,onClick }) => {
    return (
        <div className={`${className} w-full flex items-center gap-2.5 lg:gap-4`} >
            <span className="cursor-pointer w-8 aspect-square flex items-center justify-center bg-grey-2 bg-opacity-20 rounded-full"
                onClick={BackonClick}
            ><FaChevronLeft size={22} className=" text-grey-3" /></span>
            <Plus_Green_btn onClick={onClick}/>
            <RoundedBtn label={title} onClick={NextonClick} disable={disableFooter} className={`${disableFooter && 'opacity-45'}`} />
        </div>
    )
}
 
export default Card_footer_greenbtn