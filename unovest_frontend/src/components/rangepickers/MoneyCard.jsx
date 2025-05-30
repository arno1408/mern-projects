import React, { useEffect, useRef, useState } from 'react'
import './rangepicker.css'
import { FaPlus } from "react-icons/fa6";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { CurrencyFinder } from '../../Variable';


const MoneyCard = ({ heading,onbackClick, subheading, subtitle,isBack=false, children,headingClassName, amount, addbtn, style, hideinput, clickBtn, Icon=null }) => {
    const [background,setBackground]=useState('')


    useEffect(() => {
    if(window.innerWidth >=750){     
       setBackground("radial-gradient(119.97% 202.42% at 136.67% 122.74%, rgb(152, 145, 173) 0%, rgb(83, 128, 150) 22.18%, rgb(60, 86, 110) 37.79%, rgb(19, 21, 41) 89.23%)" )
    }
    else{
        setBackground("radial-gradient(564.97% 145.42% at 349.67% 21.74%, rgb(152, 145, 173) 0%, rgb(83, 128, 150) 0%, rgb(60, 86, 110) 37.79%, rgb(19, 21, 41) 60.23%)" )
    }},[])
    return (
        <div className="bg-zinc-400 md:min-w-[40%] xl:ms-8 rounded-[20px] flex-1" style={{background:background} }>
            <div className={`text-dark-blue p-4 md:pl-[60px] md:pr-[28px] lg:text-lg  font-Montserrat justify-center md:justify-between h-[72px] flex items-center gap-[10px]  max-md:gap-1  rounded-tr-[20px] rounded-tl-[20px]`} style={style}>
                {isBack && <div className='scale-150' onClick={onbackClick}><MdOutlineArrowBackIos/></div>} 
                <div className='flex items-center'>
                    <p className={`xl:text-2xl lg:text-base md:text-base max-md:text-lg flex gap-1 font-extrabold max-md:items-center  ${headingClassName}`}><span className='text-sm max-md:text-xs max-md:flex max-md:items-center font-semibold font-["Montserrat"] '>{Icon && <span className='max-md:scale-75 flex'><Icon stroke={'black'} /></span> }{subheading} </span>{heading} </p>
                    {subtitle ? <p className='max-md:block font-semibold '>{subtitle}</p> : null}
                </div>
                <div className='flex items-center gap-[10px]'>
                   {amount && <p className={`border font-semibold md:flex lg:items-center flex items-center border-dark-blue px-4 py-2 rounded-2xl xl:text-xl lg:text-lg md:text-base flex-wrap  max-md:text-base max-md:font-bold max-md:py-1 max-md:px-2 leading-[1.3] ${hideinput ? hideinput : " ASDASD"}`}><CurrencyFinder/>{`${amount}`}</p>} 
                    {addbtn ?
                        <button onClick={clickBtn} className='hidden md:block border p-[11px] rounded-2xl h-fit bg-dark-blue text-white  border-grey-2' style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}>
                            <FaPlus />
                        </button> : null}
                </div>
            </div>
            {children}
        </div>
    )
}

export default MoneyCard