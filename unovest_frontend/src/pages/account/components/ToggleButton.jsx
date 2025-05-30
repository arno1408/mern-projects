import React, { useState } from 'react'

function ToggleButton({id, label}) {

    const [isChecked, setChecked] = useState(false);

    const handleToggle = () => {
        setChecked(!isChecked);
    };

    return (
        <>
            <div >
                <label htmlFor={id} className='my-account-desc flex justify-between items-center w-full'>{label}
                <input type="checkbox" id={id} checked={isChecked} onChange={handleToggle} className='hidden' disabled='disable'/>

                <span className={`w-[30px] h-4  bg-opacity-60 rounded-xl relative ${isChecked ? 'bg-emerald-300' : 'bg-zinc-300'}`}>
                    <span className={`w-3.5 h-3.5 bg-white rounded-[11px] shadow block absolute top-1/2 transition-all duration-75 translate-y-[-50%] ${isChecked ? 'right-0' : 'left-0'}`}></span>
                </span>
                </label>

            </div>
        </>
    )
}

export default ToggleButton
