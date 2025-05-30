import { useEffect, useState } from "react";
import { double_down_arrow, down_arrow,Undo_small } from "../assets/Icons"
import { getData, userRevealStatus } from "../pages/destop_L1/server";
import Tooltip from "./tooltip/Tooltip";
import { CurrencyFinder } from "../Variable";
import { useDispatch, useSelector } from "react-redux";
import { SummaryDetails } from "../redux/slices/Page_Data";
import FinancialFreedomCard from "./FinancialFreedomCard";
 
const ResultCards = ({ revealId, label, value, subValue, className, style,fetchRevealData, revealStatus, summaryInformation}) => {
    const getuserData = JSON.parse(localStorage.getItem('userdetails'));
    const dispatch = useDispatch();
    const {user_data} = getuserData
    const [revealData, setRevealData] = useState({});
    const [isFlipped, setIsFlipped] = useState(false);
    const [verticleSlide, setVerticleSlide] = useState(false);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const summaryHandler =(revealId) =>{
        setVerticleSlide(true)
        dispatch(SummaryDetails({showRevealSummary:{status: true, id:revealId }}));
    }

    const summaryCloseHandler=()=>{
        setVerticleSlide(false)
        dispatch(SummaryDetails({showRevealSummary:{status: true, id:revealId }}));
    }


    const revealArray = [
       {
            id: user_data?.is_enough_money_for_all_goal_reveal_id,
            status: user_data?.is_enough_money_for_all_goal_reveal_status
        },
        {
            id: user_data?.is_fire_amount_reveal_id,
            status: user_data?.is_fire_amount_reveal_status
        },
        {
            id: user_data?.is_retire_sum_reveal_id,
            status: user_data?.is_retire_sum_reveal_status
        },
        {
            id: user_data?.is_likely_inheritance_reveal_id,
            status: user_data?.is_likely_inheritance_reveal_status
 
        }
    ]
 
    const revealFilterData = revealArray.filter(list => {
        if(list.id == revealId){
            return list
        }
    })
   
    // to make reveal status as true
    const revealHandler=()=>{
        const revealPayload = {
            reveal_status_number: revealId
        }
        userRevealStatus(revealPayload,(success) =>{
            if(success.data.code === 200){
                getuserData.user_data=success.data.message
                localStorage.setItem('userdetails',JSON.stringify(getuserData))
                getData('user_update_reveal_status',(success) =>{
                    if(success.data.code === 200){
                        fetchRevealData(success.data.message)
                        setRevealData(success.data.message)
                    }
                },(error)=>{
                    console.log(error,'error');
                })
            }
        },(error)=>{
            console.log(error,'error');
        })
    }
 
    return (
        <div className={`${className} ${revealFilterData.length > 0 ? 'flip-cardActive': ''} result_card card-shadow`}
            style={style}
        >
            <div className="self-stretch md:justify-center items-center inline-flex">
                <div className="result-card-heading text-dark-blue ">{label}</div>
            </div>
              {revealFilterData.length > 0 ?(
                    <div  className={`flip-card-back w-fit lg:mx-auto justify-center items-end inline-flex lg:flex-row lg:gap-2 `}>
                      {subValue && <span className=" text-dark-blue result-card-currencyicon"><CurrencyFinder/></span>}  
                        <p className=" text-dark-blue result-card-currencyValue">
                            {value}
                        </p>
                        {subValue && (
                            <p className="text-dark-blue result-card-currencySubValue ">{subValue}</p>
                        )}
                        <div className={`bg-gray-700 p-2 shadow-icon-flip w-fit rounded-full z-200 absolute right-3 bottom-8 hidden md:block`}>
                            <img src={double_down_arrow} className="cursor-pointer" alt="" onClick={() => summaryHandler(revealId)} />
                        </div>
                      
                    </div>
                ) : (
                    <div className="flip-cards max-[500px]:absolute right-5">
                        <div className="flip-cards-inner">
                            <div className="flip-card-front">
                                <div className="w-fit hover:scale-125" onClick={revealHandler}>
                                    <img src={Undo_small} data-tooltip-id={`flip-tooltip-${revealId}`} className="rounded-full shadow-icon-flip" alt="reveal_icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className={`absolute  ${verticleSlide ? 'top-0 opacity-100 z-10': 'top-9 opacity-0 -z-10'} bg-slate-700 rounded-2xl transition-all ease-in-out duration-300`}>
                    <FinancialFreedomCard containerClass='ResultFinancialCard'  style={{ background: "#B4DAF6" }}
                        heading={label}>
                        <div className='flex flex-col lg:gap-3 '>
                            <p className={`${summaryInformation?.cashflowdetail?.livingAge ? 'text-emerald-300' : 'text-orange'} text-2xl md:text-4xl font-extrabold md:font-semibold text-center`}>{summaryInformation?.cashflowdetail?.livingAge}</p>
                            <div className='flex lg:gap-[33px] md:gap-[10px] justify-around'>
                                <div>
                                    <p className=" summaryInformation-subValueTitle pt-3 md:pt-0 ">{summaryInformation?.subValueTitle}</p>
                                    <p className="summaryInformation-subValue">{summaryInformation?.subValue1}</p>
                                </div>
                                <div>
                                    <p className=" summaryInformation-subValueTitle leading-[18.48px] md:leading-snug">{summaryInformation?.subValueTitle2}</p>
                                    <p className="summaryInformation-subValue" >{summaryInformation?.subValue2}</p>
                                </div>
                            </div>
                            <div className={`bg-slate-400 p-2 shadow-icon-flip w-fit rounded-full z-200 absolute right-3 bottom-8 hidden md:block`}>
                                <img src={double_down_arrow}  className="cursor-pointer" alt="" onClick={() => summaryCloseHandler(revealId)} />
                            </div>
                        </div>
                    </FinancialFreedomCard>
                        <Tooltip
                            id={`lock`}
                            backgroundColor={'#232E41'}
                            message="upgrade to level 2"
                            noArrow={true}
                            opacity={1}
                            style={{ zIndex: 9999 }}
                        />
                </div>
                 {(revealFilterData?.length == 0 ) && (
                    <Tooltip
                        id={`flip-tooltip-${revealId}`}
                        backgroundColor={'#232E41'}
                        message="Flip to find out"
                        noArrow={true}
                        opacity={1}
                        style={{zIndex:999}}
                    />
            )}
           
        </div>
    )
   
}
 
export default ResultCards
{/* <div className={`bg-white px-2 py-3 w-fit rounded-full z-200 absolute ${revealId === 1 && value == 'YES!'? 'right-[-120px] bottom-0':revealId === 1 && value == 'NO'?'right-[-140px] bottom-0':revealId === 2 && value > 0?'right-[-74px] bottom-0':revealId === 2 && value <= 0?'right-[-127px] bottom-0':revealId === 3 && value > 0?'right-[-106px] bottom-0':revealId === 3 && value <= 0?'right-[-127px] bottom-0':value == 'YES'?'right-[-127px] bottom-0':value == 'NO' &&'right-[-137px] bottom-0'}  hidden md:block`}>
  <img src={down_arrow} alt="" />
 </div> */}