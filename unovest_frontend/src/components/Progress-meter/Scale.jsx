const Scale = ({ percent }) => {
    let scale_width
    let scale_height
    if(window.innerWidth >=750){     
        scale_width =300  // 135
       scale_height =84
    }
    else{
        scale_width = 183
        scale_height=60
    }
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={`${scale_width}`} height={`${scale_height}`} viewBox="0 0 254 84" fill="none" className="transition duration-1000 ">
                <defs>
                    <linearGradient id="gradient1"
                        x1={percent >= 50 ? "0%" : '100%'}
                        y1="0%"
                        x2={percent >= 50 ? "100%" : '-4%'}
                        // y2={percent >= 50 ? percent === 100 ? "100%" : '0%' : '100%'}
                        y2={percent >= 50 ? percent === 100 ? "100%" : '0%' : '0%'}
                    >

                        <stop offset={`${percent >= 50 ? percent : 100 - percent}%`} stop-color={percent >= 50 ? "#67EAB3" : '#0F3A4D'} />
                        <stop offset={`${percent >= 50 ? 100 - percent : percent}%`} stop-color={percent >= 50 ? "#0F3A4D" : '#67EAB3'} />

                    </linearGradient>
                </defs>
                <g id="Ellipse 6" filter="url(#filter0_i_2775_9450)">
                    <path d="M244.085 83.1604C244.085 42.3988 191.663 9.35498 126.996 9.35498C62.329 9.35498 9.90625 42.3988 9.90625 83.1604"
                        stroke="url(#gradient1)" stroke-width="18" />
                </g>

                <defs>
                    <filter id="filter0_i_2775_9450" x="0.90625" y="0.35498" width="252.18" height="86.8057"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2775_9450" />
                    </filter>
                </defs>
                {/* <g fill="black">
                    <circle cx="9" cy="41" r="2.5"></circle>
                    <circle cx="40" cy="16" r="2.5"></circle>
                    <circle cx="72" cy="3" r="2.5"></circle>
                    <circle cx="80" cy="1" r="2.5"></circle>
                </g> */}
            </svg>
            <div className="h-2 max-w-[254px] max-md:w-[180px] mx-auto " style={{ backgroundImage: "linear-gradient(90deg, #66E8B3 19.46%, #0F3A4D 75%)", }} ></div>









            {/* <svg xmlns="http://www.w3.org/2000/svg" width="300" height="84" viewBox="0 0 254 84" fill="none">
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="70%" stop-color="#66E8B3" />
                        <stop offset="30%" stop-color="#0F3A4D" />
                    </linearGradient>
                </defs>
                <path
                    d="M244.085 83.1604C244.085 42.3988 191.663 9.35498 126.996 9.35498C62.329 9.35498 9.90625 42.3988 9.90625 83.1604"
                    stroke="url(#gradient1)" stroke-width="19" />
                <g fill="black">
                    <circle cx="9" cy="41" r="2.5"></circle>
                    <circle cx="40" cy="16" r="2.5"></circle>
                    <circle cx="72" cy="3" r="2.5"></circle>
                    <circle cx="80" cy="3" r="2.5"></circle>
                </g>
            </svg> */}


            {/* <svg xmlns="http://www.w3.org/2000/svg" width="300" height="84" viewBox="0 0 254 84" fill="none">
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="70%" stop-color="#66E8B3" />
                        <stop offset="30%" stop-color="#0F3A4D" />
                    </linearGradient>
                    <filter id="insetShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                        <feOffset in="blur" dx="0" dy="4" result="offsetBlur" />
                        <feBlend in="SourceGraphic" in2="offsetBlur" mode="normal" />
                    </filter>
                </defs>
                <path d="M244.085 83.1604C244.085 42.3988 191.663 9.35498 126.996 9.35498C62.329 9.35498 9.90625 42.3988 9.90625 83.1604" stroke="url(#gradient1)" stroke-width="19" filter="url(#insetShadow)" />
                <g fill="black">
                    <circle cx="9" cy="41" r="2.5"></circle>
                    <circle cx="40" cy="16" r="2.5"></circle>
                    <circle cx="72" cy="3" r="2.5"></circle>
                    <circle cx="80" cy="3" r="2.5"></circle>
                </g>
            </svg> */}

        </>
    )
}

export default Scale