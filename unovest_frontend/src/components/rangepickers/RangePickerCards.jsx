import React, { useEffect, useState } from 'react'
import './rangepicker.css'

const RangePickerCards = ({ heading, children,onclick, Icon = null, containerClass='' }) => {
    const [background,setBackground]=useState('')
    useEffect(() => {
    if(window.innerWidth >=750){     
       setBackground("radial-gradient(120.97% 129.42% at 139.67% 99.74%, rgb(152, 146, 173) 0%, rgb(84, 128, 150) 22.18%, rgb(60, 86, 110) 37.79%, rgb(19, 21, 41) 89.23%)" )
    }
    else{
        setBackground("radial-gradient(564.97% 145.42% at 349.67% 21.74%, rgb(152, 145, 173) 0%, rgb(83, 128, 150) 0%, rgb(60, 86, 110) 37.79%, rgb(19, 21, 41) 60.23%)" )
    }},[])
    return (
        <div className={`${containerClass} bg-zinc-400  min-w-full md:min-w-[40%] rounded-[20px] flex-1 relative`} style={{ background:background }}>
            <div className="text-dark-blue text-lg font-extrabold font-Montserrat p-[10px] bg-accent-green h-[55px] md:h-[72px] flex items-center justify-center rounded-tr-[20px]  rounded-tl-[20px]">
                <p className='xl:text-2xl lg:text-xl  md:text-2xl text-lg  flex gap-1 items-center text-[#0F3A4D]'>{Icon && <span ><Icon stroke={'black'} /></span>}{heading}</p>
            </div>
            {children}
        </div>
    )
}

export default RangePickerCards
