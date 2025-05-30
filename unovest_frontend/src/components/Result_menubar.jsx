import { useState } from "react"
import { Avatar, BellIcon } from "../assets/Icons"
import Filter_btn from "./Filter_btn"

const Result_menubar = () => {
    const [count_type, setCount_type] = useState(true)

    let Count_btn = ({ isActive, onClick, label }) => {
        return (
            <>
                <div onClick={onClick}
                    className={`${isActive ? "px-[26px] bg-grey-3 text-cyan-950 text-xl  leading-relaxed " : "px-[18px] text-grey-2 text-base leading-[21.12px]"}  flex items-center justify-center font-medium  h-9 rounded-[30px] cursor-pointer`}   >
                    {label}
                </div>
            </>
        )
    }

    return (
        <>
            <div className=" flex justify-between items-center bg-grey-2 bg-opacity-20 shadow py-[6px] px-4 gap-3">

                <div className="flex gap-3 items-start flex-1">
                    <Filter_btn onClick={() => console.log("object")} />
                    <div className=" ">
                        <p className="text-grey-3 flex-1 text-[28px] font-extrabold tracking-[-1.12px]   leading-9">RapidFIRE</p>
                    </div>
                </div>

                <div className="flex-1 flex gap-[60px] pl-[7%] items-center text-dark-blue">
                    <button className="cursor-pointer text-[18px] text-grey-3 font-semibold  uppercase tracking-[-0.36px]">Level 0</button>
                    <button className="cursor-pointer text-[32px] font-black text-accent-bright-green uppercase tracking-[-0.64px]">Level 1</button>
                    <button className="cursor-pointer text-[18px] text-grey-3 font-semibold  uppercase tracking-[-0.36px]">Level 2</button>
                </div>

                <div className="flex-1 flex justify-end gap-12 items-center mr-1">

                    <div className="flex rounded-[30px] bg-grey-2 bg-opacity-20 items-center">
                        <Count_btn
                            onClick={() => setCount_type(true)}
                            isActive={count_type} label={"Millions"}
                        />
                        <Count_btn
                            onClick={() => setCount_type(false)}
                            isActive={!count_type} label={"Lakhs"}
                        />

                    </div>

                    <div className=" flex items-center ">
                        <img src={Avatar} alt="" srcSet="" />
                        <div className=" flex items-center gap-2">
                            <div>
                                <span className="text-grey-2 text-xl  font-medium leading-relaxed">hi,</span>
                                <span className="text-grey-2 text-2xl tracking-[-0.48px] font-bold leading-[28.80px]"> Jane</span>
                            </div>
                        </div>
                    </div>

                    <button type="button" className=""><img src={BellIcon} alt="notification" srcSet="" /></button>
                </div>
            </div>
        </>
    )
}

export default Result_menubar