import React from 'react'
import './rangepicker.css'
const RangeInput = (props) => {
    return (
        <input type="range" name={props.name} disabled={props.disabled} step={props.step ? props.step : 1} className={props.className} value={props.value} min="0" max={props.max} style={props.style} onChange={props.onChange} />
    )
}

export default RangeInput
