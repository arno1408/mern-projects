import React from 'react'

const FinancialFreedomCard = ({ containerClass, className, children, heading, style }) => {
    return (
        <div className={`${containerClass}  FinancialFreedomCard-container  `}>
            <div className={`h-[57px] flex items-center justify-center rounded-tl-[20px] rounded-tr-[20px]   ${className}`}
                style={style}
            >
                <div className="FinancialFreedomCard-heading " >{heading}</div>
            </div>
            <div className='px-2 md:py-2 py-4 grid place-content-center h-[72%]'>
                {children}
            </div>
        </div>
    )
}

export default FinancialFreedomCard
