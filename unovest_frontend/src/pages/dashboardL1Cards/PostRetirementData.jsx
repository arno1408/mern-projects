import React, { useEffect, useState } from 'react'
import RangePickerCards from '../../components/rangepickers/RangePickerCards'
import Assumptions_icon from '../../components/my-power/sidebar-icons/Assumptions_icon'
import { useDispatch, useSelector } from 'react-redux';
import { formatNumberWithCommas } from '../../Variable';
import Tooltip from '../../components/tooltip/Tooltip';
import Card_footer from '../../components/quize-card/Card_footer';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { CurrencyData } from '../../constants';
import { all_level_1_data } from '../../redux/slices/Level_1_all_data';
import { check_6_card } from '../../assets/Icons';
import useFetchPortfolio from '../../useFetchPortfolio/useFetchPortfolio';
import { RxCross2 } from 'react-icons/rx';

const PostRetirementData = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedCard, setSelectedCard] = useState(1);
    let allData = useSelector((state) => state?.level_1_data)
    const dispatch = useDispatch();
    const {result_chart_data} = useFetchPortfolio(allData?.post_retirement_data?.withdrawal_rate,allData?.post_retirement_data?.reduse_expenses_by );
    console.log(result_chart_data,"chart");

    useEffect(() => {
        if (window.innerWidth < 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
    }, [window.innerWidth]);

    const handleCheckBox = (e) => {
        if (e.target.checked) {
            const temp = {...allData?.post_retirement_data}
            if( temp[e.target.name]){
                temp[e.target.name] = e.target.checked
            }else{
                temp[e.target.name] = false
            }
            dispatch(all_level_1_data({ post_retirement_data: temp }))
        }
    }

    
    const handleInput = (e) => {
        // setfieldValues((prev) => ({ [e.target.name]: e.target.value }));
        const temp = {...allData?.post_retirement_data}
        if(e.target.name === 'reduse_expenses_by'){
            temp[e.target.name] = +e.target.value
        }else{
            temp[e.target.name] = e.target.value
        }
        dispatch(all_level_1_data({ post_retirement_data: temp }))
    }

    const CurrencyFinder=()=>{
        if(allData?.profile_data?.preferred_currency){
          const selectedCurrency = CurrencyData?.find(currency => currency.currencyIndex == allData?.profile_data?.preferred_currency).symbol
          return selectedCurrency;
        }else{
          return '₹';
        }
      }
   
      const WithdrawlMessage=()=>{
        return (
            <div className="w-48">
                You can change the Withdrawal Rate  at the next stage of your journey. Hold tight till then!
            </div>
        )
      }

    let OptionCard = ({ value, isactive, children, title, handleCheckBox, name, checked ,className }) => {
        return (
            <div className="relative">
                {isactive ? <div className="absolute top-[-7px] left-[-1px] lg:top-[-10px] lg:left-[-13px]">
                    <img src={check_6_card} className="max-w-[60%] lg:max-w-[100%]" alt="" />
                </div> : null}
                <label className={`${isactive ? "bg-desk-green lg:bg-accent-bright-green text-dark-blue" : "lg:bg-grey-2 lg:bg-opacity-20 text-grey-2 border border-blue-grey"} p-3 lg:p-6 cursor-pointer  rounded-[20px]  items-center flex min-h-[80px] lg:min-h-[100px] max-md:min-h-fit `}>
                    <input onChange={(e) => {
                        handleCheckBox(e)
                        setSelectedCard(+e.target.value)
                    }}
                        type="radio" defaultValue={value} name={name} hidden id="" defaultChecked={checked} />
                    <div className="flex items-center justify-between">
                        <p className={`text-xs lg:text-lg font-semibold leading-6 tracking-[-0.4px] ${className}`}>{title}</p>
                        {children}
                    </div>
                </label>
            </div>
        )
    }

    const crossClickHandler=()=>{
        const temp = { ...allData?.post_retirement_data }
        temp['post_retirement_lifestyle'] = 'false';
        dispatch(all_level_1_data({ post_retirement_data: temp }))
    }
    

    const show_yearly_expense = allData?.expenses_data?.is_lumsum ?  allData?.expenses_data?.yearly_expenses : (allData?.expenses_data?.fixed_expenses_per_year + allData?.expenses_data?.variable_expenses_per_year);
  return (
    <RangePickerCards heading={"Post Retirement Lifestyle"} Icon={Assumptions_icon} containerClass=' max-md:border-2 max-md:rounded-b-xl max-md:border-solid max-md:shadow-2xl max-md:border-accent-green'>
          {allData?.post_retirement_data?.post_retirement_lifestyle == 'true' &&  <div onClick={()=> crossClickHandler()} className={`bg-emerald-100 absolute z-50  rounded-3xl shadow-icon-flip -right-2 -top-3 p-2 border border-1 border-solid border-slate-500`}><RxCross2 size={18} /></div> }
          <div className="lg:mx-auto pt-[15px] lg:pt-[50px] pb-[90px] lg:pb-[68px] flex flex-col justify-between overflow-y-scroll hide-scrollbar mx-8 my-0 max-md:mx-4 max-md:my-0">
                <div className=" flex flex-col gap-2 max-w-96 mx-auto">
                    <div className="flex gap-4 items-center justify-between">
                        <div className="text-accent-bright-green lg:text-grey-3 italic lg:not-italic text-xs lg:text-base font-normal lg:font-medium font-Montserrat">Your Current Annual Expenses</div>
                        <div className="px-6 py-2.5 rounded-[15px] border-0 lg:border lg:border-grey-3 ">
                            <div className="text-accent-bright-green lg:text-grey-3 text-sm lg:text-xl font-normal font-['Work Sans'] capitalize"><CurrencyFinder/>{formatNumberWithCommas(show_yearly_expense)}</div>
                        </div>
                    </div>
                    <OptionCard value={1} isactive={selectedCard === 1}
                        handleCheckBox={handleCheckBox}
                        name={"is_will_continue_to_spend_the_same_way"}
                        title='So much to catch up on, I will continue to spend the same way!'
                        checked={allData?.post_retirement_data?.is_will_continue_to_spend_the_same_way ? true : false}
                    />
                    <OptionCard value={2}
                        handleCheckBox={handleCheckBox}
                        isactive={selectedCard === 2}
                        name={"use_withdrawal_rate_check"}
                        // className={'lg:w-[17rem] lg:me-7'}
                        checked={allData?.post_retirement_data?.use_withdrawal_rate_check ? true : false}
                        title='I will adjust my current plan . Let’s use a withdrawal rate'
                    >
                        <div className={`${selectedCard === 2 ? " border-none " : ""} py-2 w-fit h-fit px-2 bg-grey-1 text-white rounded-2xl  justify-center items-center flex selectCard-2`} >
                            <input type="number"
                                autoFocus
                                data-tooltip-id="use_withdrawal_rate"
                                onChange={handleInput}
                                // defaultValue={allData?.use_withdrawal_rate}
                                value={allData?.post_retirement_data?.withdrawal_rate || 4}
                                name={"withdrawal_rate"}
                                disabled={true}
                                className={`${selectedCard === 2 ? "text-[#8792A6] lg:text-white" : "text-white"} disabled:opacity-45 text-lg lg:text-xl font-normal font-Work_Sans w-3 lg:w-6  input-border-none bg-transparent lg:ps-3`}
                            />
                            <p className={`${selectedCard === 2 ? "text-[#8792A6] lg:text-white" : "text-white"} opacity-45 text-lg lg:text-xl font-Work_Sans lg:pe-2`}>%</p>
                        </div>
                        <Tooltip
                            id={'use_withdrawal_rate'}
                            message={<WithdrawlMessage />}
                            backgroundColor={'#232E41'}
                            zIndex={999}
                            opacity={1}
                        />
                    </OptionCard>
                    <OptionCard value={3}
                        checked={allData?.post_retirement_data?.reduse_expenses_by_check ? true : false}
                        isactive={selectedCard === 3}
                        name={"reduse_expenses_by_check"}
                        handleCheckBox={handleCheckBox}
                        title='I will slow down & reduce expenses by'
                    >
                        <div className={`${selectedCard === 3 ? "   bg-white border lg:border-cyan-950" : "lg:border lg:border-white text-white lg:border-opacity-30 bg-grey-2 lg:bg-transparent bg-opacity-10 lg:bg-opacity-0"} py-1 lg:py-2 h-fit px-2 lg:px-3  rounded-[15px] lg:rounded-2xl  flex justify-center items-center max-sm:ml-6`} style={selectedCard === 3 ? { boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.50) inset' } : {}}>
                            <input type="number"
                                onChange={handleInput}
                                autoFocus
                                // defaultValue={allData?.post_retirment_rate?.reduse_expenses_by}
                                value={Number(allData?.post_retirement_data?.reduse_expenses_by)}
                                name={"reduse_expenses_by"}
                                disabled={selectedCard !== 3 ? true : false}
                                className={`${selectedCard === 3 ? "text-black lg:text-grey-4" : "text-white"}text-lg lg:text-xl  font-normal font-Work_Sans w-5 lg:w-6 input-border-none bg-transparent`}
                            />
                            <p className={`${selectedCard === 3 ? "text-black lg:text-grey-4 " : 'text-white'}  text-center text-lg lg:text-xl  font-normal font-Work_Sans capitalize whitespace-nowrap`}>%</p>
                        </div>
                    </OptionCard>
                    {allData?.post_retirement_data?.reduse_expenses_by ? <div className="px-2 gap-4 flex items-center justify-between">
                        <p className="text-emerald-300  font-light font-Montserrat italic lg:not-italic max-md:text-xs lg:text-base  ">Post-Retirement Expenses</p>
                        <div className="px-6 py-1 rounded-[15px] border-0 lg:border lg:border-emerald-300 font-light">
                            <p className="text-emerald-300 text-lg max-md:text-base font-light font-Work_Sans flex items-center"> <span><LiaRupeeSignSolid />
                            </span>{allData?.post_retirement_data?.reduse_expenses_by ? formatNumberWithCommas((allData?.expenses_data?.yearly_expenses * (1 - (allData?.post_retirement_data?.reduse_expenses_by / 100))).toFixed(1)) : 0}</p>
                        </div>
                    </div> : null}
                </div>
                {/* <Card_footer className='mx-auto max-w-[280px] p lg:max-w-[350px] py-2 max-md:mt-8' title='Save'
                    BackonClick={() => {handleBackClick()}}
                    NextonClick={() => {handleNextClick()}}
                /> */}
            </div>
    </RangePickerCards>
  )
}

export default PostRetirementData
