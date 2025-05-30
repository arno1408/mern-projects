
const Meter_pointer = ({percent=0}) => {
    function percentageToAngle(percent) {
        if (percent <=100) {
            let final_angle;
         return  final_angle = (percent * 1.8) 
        }
    }
    let final_angle = percentageToAngle(percent);
    let pointer_height
    if(window.innerWidth >=750){     
     pointer_height = 130  // 135
    }
    else{
        
         pointer_height = 90
    }
    
    return (
            <div className="pointer w-fit  absolute bottom-2 left-1/2 -translate-x-1/2 origin-center transition duration-1000 animate-spin-meter"
                style={{
                    transformOrigin: "bottom center",
                    transform: `translate(-50%) rotate(${final_angle - (90)}deg)`,
                }}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height={`${pointer_height}`} viewBox="0 0 25 135" fill="none">
                <g filter="url(#filter0_bd_576_567)">
                    <path d="M12.5 0L20.7578 16L12.5 127L4.75781 16L12.5 0Z" fill="url(#paint0_linear_576_567)" />
                </g>
                <defs>
                    <filter id="filter0_bd_576_567" x="0.757812" y="-4" width="25" height="139"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_576_567" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="effect1_backgroundBlur_576_567"
                            result="effect2_dropShadow_576_567" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_576_567" result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear_576_567" x1="12.7578" y1="0" x2="12.7578" y2="127"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF5651" />
                        <stop offset="0.720309" stop-color="#FFCB4D" />
                    </linearGradient>
                </defs>
            </svg>

            {/* <svg xmlns="http://www.w3.org/2000/svg" width="28" height="135" viewBox="0 0 28 135" fill="none">
                <g filter="url(#filter0_bd_576_567)">
                    <path d="M13.5 0L24 16L13.5 127L4 16L13.5 0Z" fill="url(#paint0_linear_576_567)" />
                </g>

                <defs>
                    <filter id="filter0_bd_576_567" x="0" y="-4" width="28" height="139" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_576_567" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="effect1_backgroundBlur_576_567" result="effect2_dropShadow_576_567" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_576_567" result="shape" />
                    </filter>

                    <linearGradient id="paint0_linear_576_567" x1="13.7578" y1="0" x2="13.7578" y2="127" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF5651" />
                        <stop offset="0.720309" stop-color="#FFCB4D" />
                    </linearGradient>
                </defs>
            </svg> */}
        </div>
    )
}

export default Meter_pointer