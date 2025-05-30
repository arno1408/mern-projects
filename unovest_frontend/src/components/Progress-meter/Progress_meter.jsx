import Tooltip from "../tooltip/Tooltip"
import Meter_pointer from "./Meter_pointer"
import Scale from "./Scale"

const Progress_meter = ({ percent,className }) => {
    const FireStatusMessage =()=>{
        return (
            <div className="max-w-64">
                <h5>your FIRE status indicates how much of your Financial Freedom journey you have already completed</h5>
            </div>
        )
    }
    return (
        <>
            <div className={`flex items-center justify-center flex-col gap-2  max-md:gap-3 relative max-md:mx-[36px] max-md:my-[20px]  ${className}`}>
           
                <div className="w-full relative ">
                    <p data-tooltip-id="fire_status" className="text-end text-orange md:text-accent-bright-green text-2xl  md:text-4xl font-semibold font-Work_Sans md:mt-7  mb-1 max-md:pb-5  mr-7 md:pt- max-md:mr-[-10px]">
                        {percent || 0}%</p>
                    <Scale percent={percent} />
                    <Meter_pointer percent={percent} />
                </div>
                <div className="text-center text-accent-bright-green md:block hidden ">
                    <span className="text-[32px] font-black">FIRE </span>
                    <span className="text-2xl font-bold leading-[28.80px]">Status</span>
                </div>
                <div className="text-accent-bright-green md:hidden block absolute md:relative  start-1 top-0 ">
                    <span className="text-emerald-300 text-sm font-normal font-['Montserrat'] leading-[18.48px] italic">my</span>
                    <span className="text-emerald-300 text-2xl font-black font-['Montserrat']">FIRE</span>
                    <span className="text-emerald-300 text-base font-extrabold font-['Montserrat'] leading-tight">Status</span>
                </div>
            </div>
           
            <Tooltip
                id={'fire_status'}
                backgroundColor={'#232E41'}
                message={<FireStatusMessage/>}
                noArrow={true}
                position="top"
                opacity={1}
            />
        </>
       
    )
}

export default Progress_meter