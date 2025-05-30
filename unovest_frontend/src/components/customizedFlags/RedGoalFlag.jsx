import React from 'react'

const RedGoalFlag = (props) => {
  const { cx, cy, value, maxvalue,payload } = props;
  return (
    <g x={cx - 10} y={cy - 10}>
    <circle cx={props.cx} cy={props.cy} r={7} fill="white" fillOpacity="0.2" />
    <circle cx={props.cx} cy={props.cy} r={5} fill="#67EAB3" />
    <circle cx={props.cx} cy={props.cy} r={3} fill="#0F3A4D" />

    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"  
    x={cx - 4}
    y={cy - 35}>
  <path d="M14.5994 0.922396C5.85377 -1.07345 1.80546 0.628889 0.874512 1.72954L2.31084 15.3776C3.48118 14.1058 8.74238 11.0778 16.5943 12.9562C24.4462 14.8346 28.8031 13.2497 30 12.2224L27.4465 0.922396C26.8082 1.754 23.345 2.91825 14.5994 0.922396Z" fill="url(#paint0_linear_841_4908)"/>
  <rect x="0.218561" y="0.181498" width="0.398719" height="29.6608" transform="matrix(0.996415 -0.0845939 0.0998994 0.994998 -0.0173481 0.110217)" fill="url(#paint1_linear_841_4908)" stroke="url(#paint2_linear_841_4908)" stroke-width="0.398719"/>
  <defs>
    <linearGradient id="paint0_linear_841_4908" x1="15.4373" y1="0" x2="15.4373" y2="15.3776" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF5151"/>
      <stop offset="1" stop-color="#FFD84C"/>
    </linearGradient>
    <linearGradient id="paint1_linear_841_4908" x1="0.398719" y1="0" x2="0.398719" y2="30.0596" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF5151"/>
      <stop offset="1" stop-color="#FFD84C"/>
    </linearGradient>
    <linearGradient id="paint2_linear_841_4908" x1="0.398719" y1="0" x2="0.398719" y2="30.0596" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF5151"/>
      <stop offset="1" stop-color="#FFD84C"/>
    </linearGradient>
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
  )
}

export default RedGoalFlag
