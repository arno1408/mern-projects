import React from 'react'
import { Tooltip as ReactTooltip } from "react-tooltip";


const Tooltip = ({id,border,customBorder,borderRadius="12px",backgroundColor,color,opacity=0.9,position='bottom',message='',className,width='',margin_left='',noArrow,clickable=false, positionStrategy, zIndex}) => {
 
  return (
    <div>
       <ReactTooltip
        id={id}
        opacity={opacity}
        place={position}
        content={message}
        style={{backgroundColor: backgroundColor, color: color,borderImage:customBorder, borderRadius:borderRadius,width:width,marginLeft:margin_left, zIndex:zIndex}}
        noArrow={noArrow}
        clickable={clickable}
        border={border}
        // positionStrategy={positionStrategy && positionStrategy}
        // isOpen={true}
        // openOnClick={true}
      />  
    </div>
  )
}

export default Tooltip
