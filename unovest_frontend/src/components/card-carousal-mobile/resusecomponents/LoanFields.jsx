import React from 'react'
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
const LoanFields = () => {
    return (
        <div className="flex w-full pl-3 pr-3 py-3 rounded-2xl shadow border border-emerald-300 border-opacity-60 justify-between items-center gap-2">
            <input type="text" className='bg-transparent w-full border-none font-Montserrat text-sm text-white input-border-none' />
            <div className="flex gap-2">
                <button className='text-accent-bright-green'><FiEdit3 /></button>
                <button className='text-accent-bright-green'><RiDeleteBin6Line/></button>
            </div>
        </div>
    )
}

export default LoanFields
