import React, { useEffect, useRef, useState } from 'react'
import './rangepicker.css'
import { FaPlus } from "react-icons/fa6";
import Rewards_icon from '../my-power/sidebar-icons/Rewards_icon';
import Goals_icon from '../my-power/sidebar-icons/Goals_icon';

const MoneyDoFor = ({ heading, subtitle, children, amount, addbtn, style, setsection, list=[], isBack= false }) => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
          if (window.innerWidth < 768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
      }, [window.innerWidth]);

    return (
        <div className="bg-zinc-400 min-w-[40%] rounded-[20px]" style={{ background: "radial-gradient(228.97% 106.42% at 136.67% 129.74%, rgb(152, 145, 173) 0%, rgb(83, 128, 150) 22.18%, rgb(60, 86, 110) 37.79%, rgb(19, 21, 41) 89.23%)" }}>
            <div className={`text-dark-blue p-4 md:pl-[60px] md:pr-[28px] text-lg font-extrabold font-Montserrat md:p-[10px] justify-between md:h-[72px] flex items-center gap-[10px] rounded-tr-[20px] rounded-tl-[20px]`} style={style}>
                <div className='flex md:items-center md:justify-center flex-grow'>
                    {isBack && (
                        <button className='me-2 flex gap-2 cursor-pointer' onClick={() => {list?.length > 0? setsection(1): setsection(2) }}> 
                        {"<"} <p className='underline italic hidden md:block'>Back</p>
                        </button>
                    )}
                    <p className=' MoneyDoFor-Heading'><span className={isMobile && 'scale-75'}> <Goals_icon stroke={"#0F3A4D"} /></span>{heading}</p>
                    <div className='hidden md:flex items-center ml-2 '>
                        {addbtn ? <button className='border p-[11px] rounded-2xl h-fit bg-dark-blue text-white  border-grey-2' style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }} onClick={() => setsection(2)}>
                            <FaPlus />
                        </button> : null}
                    </div>
                </div>

            </div>
            {children}
        </div>
    )
}

export default MoneyDoFor