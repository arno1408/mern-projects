import React from 'react'
import { FiEye } from 'react-icons/fi'

const EyeIconButton = ({ icon, text, bg, textColor, colorbg, color, onClick }) => {
    return (
        <button className='flex-1' onClick={onClick}>
            <div class={`EyeIconButton-container ${bg}`} style={{ background: colorbg, color: color }}>
                <div class={` EyeIconButton-text ${textColor}`}>{text}</div>
                <div className="EyeIconButton-img">
                    {/* <img src={icon} alt="" /> */}
                    {icon}
                </div>
            </div>
        </button>
    )
}

export default EyeIconButton
