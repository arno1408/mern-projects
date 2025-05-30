
const Card_input = ({ onChange,title,maxLength,min,max, placeholder, error,tooltipId, className, type, name, value }) => {
    return (
        <>
            <input className={`card-input ${className}`} style={{ boxShadow: error?'0px 0px 4px 4px rgba(255, 147, 86, 1), 0px 0px 4px 4px rgba(239, 239, 239, 1)':'2px 2px 4px 0px rgba(0, 0, 0, 0.50) inset' }}
                // font-Work_Sans
                data-tooltip-id={tooltipId}
                name={name}
                type={type}
                placeholder={placeholder}
                onWheel={(e) => e.target.blur()}
                onChange={onChange}
                value={value}
                title={title}
                maxLength={maxLength}
                max={max}
                min={min}
            />
        </>
    )
}

export default Card_input
