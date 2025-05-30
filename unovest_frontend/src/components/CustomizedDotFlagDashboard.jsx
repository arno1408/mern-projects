import React from 'react'

const CustomizedDotFlagDashboard = (props) => {
    const { cx, cy, stroke, payload, value, fill, r, index, strokeWidth } = props;
    if(value[1] == 1250 || value[1] == 1510){
        return(
            <g x={cx - 10} y={cy - 10}>
                <circle cx={props.cx} cy={props.cy} r={value[1] == 1250? 8 : 15} fill="#67EAB3" fillOpacity="0.8"/>
                <circle cx={props.cx} cy={props.cy} r={value[1] == 1250? 6 : 10} fill="#0F3A4D" />
                <circle cx={props.cx} cy={props.cy} r={value[1] == 1250? 4: 10} fill="#0F3A4D" />
              
                <svg xmlns="http://www.w3.org/2000/svg" width={value[1] == 1250?"70":"100"} height={value[1] == 1250?"70":"100"} viewBox="0 0 100 100" fill="none"
                    x={value[1] == 1250?cx - 10: cx-15}
                    y={value[1] == 1250?cy - 35:cy-65}
                >
                    {value[1] == 1250?(
                    <>
                       <g filter="url(#filter0_d_6185_10610)">
                          <path d="M24.5999 10.9224C15.8543 8.92655 11.806 10.6289 10.875 11.7295L12.3113 25.3776C13.4817 24.1058 18.7429 21.0778 26.5948 22.9562C34.4467 24.8346 38.8035 23.2497 40.0005 22.2224L37.447 10.9224C36.8086 11.754 33.3455 12.9182 24.5999 10.9224Z" fill="#67EAB3"/>
                          <rect x="0.218561" y="0.181498" width="1.797437" height="32.3217" transform="matrix(0.996415 -0.0845939 0.0998994 0.994998 9.98265 10.1102)" fill="white" stroke="white" stroke-width="0.398719"/>
                      </g>
                      <defs>
                          <filter id="filter0_d_6185_10610" x="0" y="0" width="100" height="100" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0"/>
                          <feGaussianBlur stdDeviation="10"/>
                          <feComposite in2="hardAlpha" operator="out"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0.405206 0 0 0 0 0.917448 0 0 0 0 0.702306 0 0 0 0.6 0"/>
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6185_10610"/>
                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6185_10610" result="shape"/>
                          </filter>
                      </defs>
                  </>
                    ):(
                     <>
                     <g filter="url(#filter0_d_514_1031)">
                     <g filter="url(#filter0_d_6201_11028)">
                        <path d="M40.319 11.8975C22.328 7.79175 14.0001 11.2937 12.085 13.5579L15.0397 41.634C17.4472 39.0176 28.2703 32.7885 44.4228 36.6528C60.5753 40.517 69.538 37.2565 72.0002 35.1433L66.7474 11.8975C65.4342 13.6082 58.31 16.0032 40.319 11.8975Z" fill="white"/>
                        <rect x="0.44961" y="0.373366" width="0.820221" height="42.0166" transform="matrix(0.996415 -0.0845939 0.0998994 0.994998 10.2504 10.2269)" fill="white" stroke="white" stroke-width="0.820221"/>
                    </g>
                     </g>
                    <defs>
                        <filter id="filter0_d_514_1031" x="0" y="0" width="100" height="100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0"/>
                        <feGaussianBlur stdDeviation="10"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.405206 0 0 0 0 0.917448 0 0 0 0 0.702306 0 0 0 0.6 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6201_11028"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6201_11028" result="shape"/>
                        </filter>
                    </defs>
                    </>
                    )}
                   
                </svg>
               
                

                {/* <svg width="6" height="150" viewBox="0 0 2 326" fill="none" xmlns="http://www.w3.org/2000/svg"
                x={cx - 3.5} y={cy}
                >
                    <rect width="5" height="280" fill="url(#paint0_linear_975_14346)" />
                    <defs>
                        <linearGradient id="paint0_linear_975_14346" x1="1" y1="0" x2="1" y2="326" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#0F3A4D" />
                            <stop offset="1" stopColor="#0F3A4D" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg> */}

            </g>
        )
    }
}

export default CustomizedDotFlagDashboard
