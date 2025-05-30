import { BsCheck } from "react-icons/bs";
import { IMAGEBACKENDURL } from "../../Variable";
 
const CheckCard = ({ checked, id, onchange, label,icons }) => {
    return (
        <>
        {/* <label className={`flex  h-12 w-72 md:h-[50px] md:w-[360px] lg:h-[106px] lg:max-w-[216px] items-center p-6  ${checked ? 'bg-desk-green lg:bg-accent-bright-green' : 'lg:bg-grey-2 bg-transparent border border-blue-grey lg:bg-opacity-20'} rounded-[15px] md:rounded-[20px] backdrop-blur-xl justify-between gap-2 cursor-pointer mx-auto `}>
            <span className=":min-w-[28px]">
               {checked ? <img src={`${baseUrl}${icons.selected}`} alt="goals_img"  height={28} width={28}/>:
                <img src={`${baseUrl}${icons.unselected}`} alt="goals_img" height={28} width={28}/>}
            </span>
            <p className={`flex items-center self-stretch ${checked ? 'text-dark-blue font-bold text-lg' : 'text-slate-200 font-semibold text-md'
                }  leading-5 tracking-[-0.36px]`}>          
                {label}
            </p>
 
            <span className={`min-w-[16px] max-w-[16px] lg:min-w-[28px] lg:max-w-[28px] h-4  lg:h-7 border-[1px] lg:border-2 ${checked ? "lg:border-accent-bright-green border-dark-blue" : "lg:border-dark-blue"}  flex justify-center items-center rounded-full ${checked ? 'bg-dark-blue ' : 'lg:bg-grey-1 bg-dark-blue  border-accent-bright-green'}  relative grey-shadow`}
            >
                {checked && <BsCheck  className=" text-desk-green lg:text-accent-bright-green  text-base lg:text-3xl" />}
            </span>
 
            <input id={id} className="hidden" type="checkbox" checked={checked} onChange={onchange} />
        </label>  */}
 
        {/* visible in mobile  */}
        <label className={`check-card ${checked ? 'bg-desk-green lg:bg-accent-bright-green' : 'lg:bg-grey-2 bg-transparent border border-blue-grey lg:bg-opacity-20'} backdrop-blur-xl `}>
            <div className="flex gap-0  items-center">
            <span className="min-w-[22px] lg:min-w-[28px]">
               {checked ? <img src={`${IMAGEBACKENDURL}${icons.selected}`} alt="goals_img" className="w-4 h-4 lg:w-5 lg:h-5 "  />:
                <img src={`${IMAGEBACKENDURL}${icons.unselected}`} alt="goals_img" className="w-4 h-4 lg:w-5 lg:h-5"/>}
            </span>
            <p className={`flex items-center self-stretch text-sm md:text-base lg:text-[15px] 2xl:text-[17px] ${checked ? 'text-dark-blue max-md:font-semibold font-extrabold  ' : 'text-grey-3  lg:text-slate-200 font-semibold max-md:font-semibold '
                }  leading-5 tracking-[-0.36px]`}>          
                {label}
            </p>
            </div>
 
            <span className={`min-w-[16px] max-w-[16px] lg:min-w-5 lg:max-w-5 h-4  lg:h-5 border-[1px] lg:border-2 ${checked ? "lg:border-accent-bright-green border-dark-blue" : "lg:border-dark-blue"} flex justify-center items-center rounded-full ${checked ? 'bg-dark-blue ' : 'lg:bg-grey-1 bg-dark-blue  border-accent-bright-green'} relative grey-shadow`}
            >
                {checked && <BsCheck  className=" text-desk-green lg:text-accent-bright-green  text-base lg:text-3xl" />}
            </span>
 
            <input id={id} className="hidden" type="checkbox" checked={checked} onChange={onchange} />
        </label>
    </>
    )
};
 
export default CheckCard;