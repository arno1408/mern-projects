import React from 'react'
import RangeInput from '../rangepickers/RangeInput';
import { RiDeleteBin6Line } from "react-icons/ri";

const OweLoanForm = () => {
    let rangeValue = 50;

    return (
        <div>
            <div className='flex items-center justify-between'>
                <p className="text-zinc-400 text-sm font-normal font-['Montserrat'] leading-[18.48px]">What is this Loan for</p>
                <button className='text-desk-light-blue-2'><RiDeleteBin6Line /></button>
            </div>

            <div className='flex bg-grey-4 py-2 px-4 border border-slate-400 rounded-2xl font-normal font-Work_Sans text-xs input-border-none' style={{ background: "#DCDCDC1A" }}>
                <textarea className='bg-transparent text-blue-200 text-sm font-semibold font-["Montserrat"] w-full input-border-none ' name="" cols="30" rows="2"></textarea>
                <input type="text"
                    autoFocus
                    // onChange={handleChangeInputs}
                    name='outstanding_balance'
                    // value={loan?.outstanding_balance}
                    className={`hidden w-full font-normal font-Work_Sans input-border-none bg-transparent text-lg leading-3`}
                />
            </div>

            <RangeInput className='progress w-full'
                value={rangeValue}
                min="0" max="10000000"
                style={{ background: `linear-gradient(to right, #B0C3F5 0%, #B0C3F5 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }}
            // onChange={(e) => setrangeValue(e.target.value)} 
            />

        </div>
    )
}

export default OweLoanForm
