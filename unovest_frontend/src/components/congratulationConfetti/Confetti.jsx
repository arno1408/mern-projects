import React, { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

// confetti are added to congratulate the user on addtion of points 
const Confettis = ({start,width,height,recycle=false}) => {
    const { Wwidth, Wheight } = useWindowSize();
    return (
        <Confetti 
        width={width? width: Wwidth} 
        height={height? height:Wheight} 
        run={start} 
        recycle={recycle} />
    );
}

export default Confettis
