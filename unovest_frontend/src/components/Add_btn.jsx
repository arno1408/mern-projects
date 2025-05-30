import React from 'react'
import { FaPlus } from 'react-icons/fa'

const Add_btn = ({ onClick, label, labelclassName = '',className='', iconClassName='' }) => {
    return (
        <button onClick={onClick} className={`${className} cursor-pointer flex items-center gap-4 py-[10px] px-[14px] rounded-2xl bg-grey-2 bg-opacity-20  border border-accent-bright-green `}  >
            {/* shadow-[0px_2px_10px_0px_rgba(103,234,179,0.60)] */}
            <span className={`flex-1 text-grey-2 whitespace-nowrap text-lg lg:text-sm 2xl:text-base p-0 font-semibold ${labelclassName}`}>{label}</span>
            <FaPlus size={15} className={`text-accent-bright-green  ${iconClassName}`} />
        </button>
    )
}

export default Add_btn