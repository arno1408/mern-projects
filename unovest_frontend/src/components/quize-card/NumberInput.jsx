
const NumberInput = ({ onChange,error, title,maxLength,max,min,placeholder, className, type, name, value,step=null, disabledCheck=false,tooltipId="" }) => {
    return (
        <>
            <input className={`number-input ${className}`} style={{ boxShadow: error?'0px 0px 4px 4px rgba(255, 147, 86, 1),  0px 0px 4px 4px rgba(239, 239, 239, 1)':'2px 2px 4px 0px rgba(0, 0, 0, 0.50) inset' }}
                // font-Work_Sans
                name={name}
                data-tooltip-id={tooltipId}
                type={step?'number':'text'}
                step={step}
                maxLength={maxLength}
                max={max}
                min={min}
                placeholder={placeholder}
                onWheel={(e) => e.target.blur()}
                onChange={onChange}
                value={value != null || value !== "" || typeof value == 'number' ? Number(value?.replace(/,/g, ''))?.toLocaleString() : ""}
                title={title}
                disabled={disabledCheck}
            />
        </>
    )
}

export default NumberInput 
