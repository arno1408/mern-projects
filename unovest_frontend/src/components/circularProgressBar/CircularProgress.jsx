import { useState } from "react";
import "./styles.css";
// import CircularProgressBar from "./CircularProgressBar";
const CircularProgress = (props) => {
  const [percentage, setpercentage] = useState(25);
  const handleChangeEvent = (event) => {
    setpercentage(event.target.value);
  };



  const CircularProgressBar = (props) => {
    // Size of the enclosing square
    const sqSize = props.sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    // const radius = (props.sqSize - props.strokeWidth) / 2;
    const radius = (props.sqSize - props.strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - (dashArray * props.percentage1) / 100;
    console.log("dashArray", dashArray, "dashOffset", dashOffset)
    return (
      <svg width={300} height={300} viewBox={viewBox} className="circle-svg">
        {/* <circle
          className="circle-background"
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          // r={radius}
          r="100"
          strokeWidth={`${props.strokeWidth}px`}
        /> */}
        <circle
          className="circle-background"
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          r={179}
          stroke="#ECECEC"
          stroke-opacity="0.2"
          stroke-width={`${props.strokeWidth}px`} />
        <circle
          className="circle-proress2"
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          // r={radius}
          r={194}
          stroke={props?.circle2}
          strokeWidth={`${35}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${props.sqSize / 2} ${props.sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }}
        />
        <circle
          className="circle-progess"
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          // r={radius}
          r="194"
          strokeWidth={`${55}px`}
          stroke={props?.circle1}
          // Start progress marker at 12 O'Clock
          style={{
            transform: `rotate(-180 ${props.sqSize / 2} ${props.sqSize / 2})`,
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset + 50
          }}
        />

        <text
          className="circle-text text-grey-3 text-3xl"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
        >
          {props.text}
        </text>
      </svg>
    );
  };

  return (
    <div className="main flex-col flex justify-center items-center relative">
      <CircularProgressBar
        strokeWidth="20"
        sqSize="500"
        percentage1={props?.value?.value1}
        percentage2={props?.value?.value2}
        text={props.text}
        circle1={props?.circle1}
        circle2={props?.circle2}
      />
      <div>
        <input
          className="hidden"
          id="progressInput"
          type="range"
          min="0"
          max="100"
          step="1"
          value={percentage}
          onChange={handleChangeEvent}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full" style={{ boxShadow: "rgb(47, 47, 47) 0px 0px 60px 30px", zIndex: "-1" }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full " style={{ boxShadow: "inset 0px 0px 39px 6px #2f2f2f" }}></div>
    </div>
  );
};
export default CircularProgress;