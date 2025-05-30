import { CalendarIcon } from '@mui/x-date-pickers';
import React, { useEffect, useRef } from 'react';

const ProgressBarCirculer = ({ percentage1, percentage2, circle1, circle2, title, label1, label2,className='' }) => {
    const progressBarRef = useRef(null);
    const progressBarRef2 = useRef(null);
    const size = 300;
    const radius = 110;
    const strokeWidth = 23;

    useEffect(() => {
        if (progressBarRef.current) {
            const circumference = 2 * Math.PI * radius;
            const strokeDashArrayValue = (circumference * (percentage1 + (percentage1 / 10))) / 100;
            progressBarRef.current.style.strokeDasharray = `${strokeDashArrayValue} ${circumference}`;
            progressBarRef.current.style.strokeDashoffset = `0px`;
        }
        if (progressBarRef2.current) {
            const circumference = 2 * Math.PI * radius;
            const strokeDashArrayValue = (circumference * (percentage1 + (percentage1 / 10) + (percentage2 + (percentage2 / 10)))) / 100;
            progressBarRef2.current.style.strokeDasharray = `${strokeDashArrayValue} ${circumference}`;
            progressBarRef2.current.style.strokeDashoffset = `0px`;
        }
    }, [percentage1, percentage2]);
    
    return (
        <div className='flex flex-col items-center isolate gap-7  max-md:w-[288px]'>
            <div className="relative w-fit">
                <svg
                    className="transform rotate-90 "
                    height={size} width={size}
                    viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg"
                >
                    <circle className="progress-bar__background transition-all duration-1000"
                        cx={size / 2} cy={size / 2} r={radius}
                        fill="none" stroke="#ECECEC" stroke-opacity="0.3" strokeWidth={strokeWidth}
                    />
                    {/* second circle */}
                    <circle
                        className="progress-bar__progress transition-all duration-1000"
                        ref={progressBarRef2} cx={size / 2} cy={size / 2} r={radius + 11}
                        fill="none" stroke={circle2} strokeWidth={strokeWidth + 4}
                        transform={`rotate(180 ${size / 2} ${size / 2})`}
                        transition="stroke-dashoffset 1s ease-in-out"
                    />
                    {/* first circle */}
                    <circle
                        className="progress-bar__progress transition-all duration-1000"
                        ref={progressBarRef} cx={size / 2} cy={size / 2} r={radius + 12}
                        fill="none" stroke={circle1} strokeWidth={strokeWidth + 15}
                        transform={`rotate(180 ${size / 2} ${size / 2})`}
                        transition="stroke-dashoffset 1s ease-in-out"
                    // strokeLinecap="round"
                    />
                    <text
                        className="circle-text text-grey-3 text-xl uppercase"
                        x="50%" y="50%" dy=".3em" textAnchor="middle"
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    >
                        {title}
                    </text>

                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full" style={{ boxShadow: "rgb(47, 47, 47) 0px 0px 60px 30px", zIndex: "-1" }}></div>
                <div className="drop-shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full" style={{ boxShadow: "inset 0px 0px 39px 6px #2f2f2f" }}></div>
            </div>
            <div className={`flex flex-col gap-2 max-md:w-[288px]  ${className}`}>
                <div className="flex md:justify-start items-center xl:gap-12  lg:gap-4 md:gap-7 justify-between" style={{ color: circle1 }}>
                    <p className="finacialCardHeading text-start">{label1}</p>
                    <p className="textFontextrabold lg:font-semibold">{percentage1?.toFixed(2)}%</p>
                </div>
                <div className="flex lg:justify-start items-center xl:gap-12  lg:gap-4 md:gap-7  justify-between" style={{ color: circle2 }}>
                    <p className="grow shrink basis-0  finacialCardHeading text-start">{label2}</p>
                    <p className="textFontextrabold lg:font-semibold">{percentage2?.toFixed(2)}%</p>
                </div>
            </div>
        </div>
    );
};

export default ProgressBarCirculer;
