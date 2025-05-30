import { FaChevronLeft } from 'react-icons/fa'
import RoundedBtn from '../RoundedBtn'

const Card_footer = ({ BackonClick, NextonClick, title, className, disableFooter=false }) => {
    return (
        <div className={`${className} w-full flex items-center gap-2.5 lg:gap-4`} >
            <span className="cursor-pointer w-8 aspect-square flex items-center justify-center bg-grey-2 bg-opacity-20 rounded-full"
                onClick={(BackonClick)}
            ><FaChevronLeft size={22} className=" text-grey-3" /></span>
            <RoundedBtn label={title} onClick={NextonClick} disable={disableFooter} className={`${disableFooter && 'opacity-45'}`} />
        </div>
    )
}

export default Card_footer