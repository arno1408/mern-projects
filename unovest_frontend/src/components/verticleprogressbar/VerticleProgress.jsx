import React from 'react'
const VerticleProgress = ({ bg, value, color, border }) => {
    return (
        <div className='h-96 max-md:h-[205px] w-12 max-md:w-9 flex items-end flex-col-reverse'>
            <div className={`w-12 rounded-[5px] transition-all duration-1000 ${bg} ${border}`} style={{ height: value * 10 + "%", boxShadow: "-2px -2px 8px 2px rgba(0, 0, 0, 0.50)" }}> </div>
            <div className={`text-xl font-medium  ${color} mb-[6px]`}>{value.toString().length > 2 ? value + "%" : value + ".00" + "%"}</div>
        </div>
    )
}

export default VerticleProgress
