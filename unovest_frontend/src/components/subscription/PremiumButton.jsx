import React from 'react'
import { premium } from '../../assets/images'
import { FaChevronRight } from 'react-icons/fa'

const PremiumButton = ({ onClick, label, type, className = '' }) => {
  return (
    <>
      <button onClick={onClick} type={type} className={`${className}   py-3 bg-accent-bright-green rounded-[30px] shadow-[0px_0px_10px_0px_rgba(103,234,179,0.60)] flex  items-center  w-full `}>
      <div className='flex items-center mr-auto gap-5 pl-7'>
      <img src={premium}></img>
        <p className="text-[rgba(15, 58, 77, 1)] text-2xl font-extrabold font-['Montserrat']  capitalize ">{label}</p>
        </div>
        <span><FaChevronRight  className="text-dark-blue text-3xl mr-12" /></span>
      </button>
    </>
  )
}

export default PremiumButton

