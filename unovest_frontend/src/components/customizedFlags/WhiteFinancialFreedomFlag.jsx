import React from 'react'

const WhiteFinancialFreedomFlag = (props) => {
  const { cx, cy, value, maxvalue,payload } = props;
  return (
    <g x={cx - 10} y={cy - 10}>
        <circle cx={props.cx} cy={props.cy} r={19} fill="white" fillOpacity="0.2" />
        <circle cx={props.cx} cy={props.cy} r={14} fill="#67EAB3" />
        <circle cx={props.cx} cy={props.cy} r={8} fill="#0F3A4D" />

        <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86" viewBox="0 0 100 100" fill="none"
            x={cx - 23}
            y={cy - 75}
        >
            <g filter="url(#filter0_d_514_1031)">
                <path d="M49.1998 21.8448C31.7085 17.8531 23.6119 21.2578 21.75 23.4591L24.6227 50.7553C26.9633 48.2115 37.4857 42.1555 53.1896 45.9124C68.8934 49.6693 77.6071 46.4994 80.001 44.4449L74.894 21.8448C73.6173 23.508 66.691 25.8365 49.1998 21.8448Z" fill="#EFEFEF" />
                <rect x="0.437121" y="0.362995" width="0.797437" height="59.3217" transform="matrix(0.996416 -0.0845939 0.0998994 0.994998 19.9653 20.2204)" fill="white" stroke="white" strokeWidth="0.797437" />
            </g>
            <defs>
                <filter id="filter0_d_514_1031" x="0" y="0" width="100" height="100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.405206 0 0 0 0 0.917448 0 0 0 0 0.702306 0 0 0 0.8 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_514_1031" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_514_1031" result="shape" />
                </filter>
            </defs>
        </svg>

        <svg width="6" height="150" viewBox="0 0 2 326" fill="none" xmlns="http://www.w3.org/2000/svg"
        x={cx - 3.5} y={cy}
        >
            <rect width="5" height="280" fill="url(#paint0_linear_975_14346)" />
            <defs>
                <linearGradient id="paint0_linear_975_14346" x1="1" y1="0" x2="1" y2="326" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0F3A4D" />
                    <stop offset="1" stopColor="#0F3A4D" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>



        {/* <svg width="2" height="326" viewBox="0 0 2 326" x={cx - 1} y={cy}  >
            <rect width="2" height="120" fill="url(#paint0_linear_975_14346)" />
            <defs>
                <linearGradient id="paint0_linear_975_14346" x1="1" y1="0" x2="1" y2="326" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0F3A4D" />
                    <stop offset="1" stopColor="#0F3A4D" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg> */}
    </g>
);
}

export default WhiteFinancialFreedomFlag
