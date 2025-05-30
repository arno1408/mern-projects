import React, { useState } from 'react'
import { BsCheck } from 'react-icons/bs'
const MobileCheckField = () => {
    const [check, setcheck] = useState(false);
    return (
        <label className={`w-full p-4  rounded-2xl border border-emerald-300 border-opacity-60 backdrop-blur-xl flex justify-between items-center gap-7 ${check ? 'bg-accent-bright-green' : 'bg-transparent'}`}>
            <p htmlFor="" className={`text-sm ${check ? 'text-dark-blue font-semibold' : 'text-white'}`}>Property</p>
            <input type="checkbox" hidden value={check} onChange={(e) => setcheck(e.target.checked)} />
            <span className={`w-4 h-4 border border-accent-bright-green rounded-full flex justify-center items-center grey-shadow ${check ? "bg-black" : 'bg-white'}`}>{check ? <BsCheck color='#67EAB3' width={"20px"} /> : null}</span>
        </label>
    )
}

export default MobileCheckField
