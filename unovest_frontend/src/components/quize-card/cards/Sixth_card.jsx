import React, { useEffect, useState } from "react";
import QuestionCard from "../../QuestionCard"
import Card_footer from "../Card_footer";
import { useNavigate } from "react-router-dom";
import { check_6_card } from "../../../assets/Icons";
import { saveDetails } from "../../../pages/destop_L1/server";
import { useDispatch, useSelector } from "react-redux";
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { updateCradInputs } from "../../../redux/slices/Card_Inputs";
import { formatNumberWithCommas } from "../../../Variable";
import { CurrencyData } from "../../../constants";
import Tooltip from "../../tooltip/Tooltip";
 
const Sixth_card = ({ handleNextClick,handleAlertClick }) => {
    const naviagte = useNavigate()
    const [selectedCard, setSelectedCard] = useState(1);
    const [values, setvalues] = useState({});
    const [fieldValues, setfieldValues] = useState({});
    const allmodels = useSelector((state) => state.Card_inputs)

    const dispatch = useDispatch();
   
    let OptionCard = ({ value, isactive, children, title, handleCheckBox, name, checked ,className }) => {
        return (
            <div className="relative">
                {isactive ? <div className="absolute top-[-7px] left-[-1px] lg:top-[-8px] lg:left-[-4px]">
                    <img src={check_6_card} className="max-w-[80%] lg:max-w-[85%]" alt="" />
                </div> : null}
                <label className={`${isactive ? "bg-desk-green lg:bg-accent-bright-green text-dark-blue" : "lg:bg-grey-2 lg:bg-opacity-20 text-grey-2 border border-blue-grey"} p-3 2xl:p-5 lg:p-4 cursor-pointer rounded-[20px] items-center flex min-h-[5rem] lg:min-h-[4.5rem]`}>
                    <input onChange={(e) => {
                        handleCheckBox(e)
                        setSelectedCard(+e.target.value)
                    }}
                        type="radio" defaultValue={value} name={name} hidden id="" defaultChecked={checked} />
                    <div className="flex items-center justify-between">
                        <p className={`xl:text-base lg:text-sm md:text-base text-sm small-text-6 font-semibold leading-6 tracking-[-0.4px] ${className}`}>{title}</p>
                        {children}
                    </div>
                </label>
            </div>
        )
    }
    useEffect(() => {
        dispatch(updateCradInputs({ post_retirment: { "is_will_continue_to_spend_the_same_way": true } }))
        dispatch(updateCradInputs({ post_retirment_rate: { "reduse_expenses_by": 10 } }))
    }, []);
 
    const handleCheckBox = (e) => {
        if (e.target.checked) {
            setvalues((prev) => ({ [e.target.name]: e.target.checked }));
            dispatch(updateCradInputs({ post_retirment: { [e.target.name]: e.target.checked } }))
        }
    }
 
    const handleInput = (e) => {
        setfieldValues((prev) => ({ [e.target.name]: e.target.value }));
        dispatch(updateCradInputs({ post_retirment_rate: { [e.target.name]: parseInt(e.target.value) } }))
    }
 
 
    const save = (data) => {
 
 
        saveDetails("user-post-retirement", data, success => {
            if (success.data.code === 200) {
                naviagte("congratulation",{replace:true})
            }
        }, error => {
            console.log(error)
            handleAlertClick('Please enter income','error')
        })
    }
 
 
    const validate = () => {
 
        if (allmodels?.post_retirment?.is_will_continue_to_spend_the_same_way) {
            let obj = {
                is_will_continue_to_spend_the_same_way: allmodels?.post_retirment?.is_will_continue_to_spend_the_same_way,
                will_continue_to_spend_the_same_way_rate: null,
                login_form_number: 6
            }
            save(obj);
        } else if (allmodels?.post_retirment?.is_reduse_expenses_by) {
            let obj = {
                is_reduse_expenses_by: allmodels?.post_retirment?.is_reduse_expenses_by,
                reduse_expenses_by: 10,
                login_form_number: 6
            }
            save(obj);
        } else if (allmodels?.post_retirment?.is_withdrawal_rate) {
            let obj = {
                is_withdrawal_rate: allmodels?.post_retirment?.is_withdrawal_rate,
                withdrawal_rate: allmodels?.use_withdrawal_rate,
                login_form_number: 6
            }
            save(obj);
        }
    }
 
    const CurrencyFinder=()=>{
        if(allmodels?.preferred_currency){
          const selectedCurrency = CurrencyData?.find(currency => currency.currencyIndex == allmodels?.preferred_currency).symbol
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
      
      const show_yearly_expense = allmodels?.expenses_table_is_lumsum ?  allmodels?.yearly_expenses : (allmodels?.fixed_expenses_per_year + allmodels?.variable_expenses_per_year);
    return (
        <div className="card card-6 ">
            <QuestionCard number='6' className='leading-tight' label="Do you wish to continue the same lifestyle post-retirement?"
                subtitle='Select One' subtitlePostion='subtitlePostion6'
            />
            <div className="card-body cards-scroll sixth-card-py hide-scrollbar" style={{margin:'0rem 2rem'}}>
                <div className=" flex flex-col gap-2 2xl:max-w-[90%] lg:max-w-[95%] max-w-[431px]  mx-auto">
                    <div className="flex gap-4 items-center justify-between 2xl:pb-8 lg:pb-4">
                        <div className="text-accent-bright-green lg:text-grey-3 italic lg:not-italic 2xl:text-sm xl:text-[13px] lg:text-xs md:text-sm text-xs font-normal lg:font-medium font-Montserrat">Your Current Annual Expenses</div>
                        <div className="px-6 py-2.5 lg:py-2  ">
                            <div className="text-accent-bright-green lg:text-grey-3 text-lg md:text-xl lg:text-base font-normal font-Work_Sans capitalize text-6"><CurrencyFinder/>{formatNumberWithCommas(show_yearly_expense)}</div>
                        </div>
                    </div>
                    <OptionCard value={1} isactive={selectedCard === 1}
                        handleCheckBox={handleCheckBox}
                        name={"is_will_continue_to_spend_the_same_way"}
                        className={'md:max-w-[80%] lg:max-w-full'}
                        title='So much to catch up on, I will continue to spend the same way !'
                        checked={allmodels?.post_retirment?.is_will_continue_to_spend_the_same_way ? true : false}
                    />
                    <OptionCard value={2}
                        handleCheckBox={handleCheckBox}
                        isactive={selectedCard === 2}
                        name={"is_withdrawal_rate"}
                        className={' lg:me-7 md:max-w-[70%] lg:max-w-full'}
                        checked={allmodels?.post_retirment?.is_withdrawal_rate ? true : false}
                        title='I will adjust my current plan . Let’s use a withdrawal rate'
                    >
                        <div className={`${selectedCard === 2 ? " border-none " : ""}md:ml-5 lg:ml-0 py-2 w-fit h-fit px-2 bg-grey-1 text-white rounded-2xl justify-center items-center flex selectCard-2`} >
                            <input type="number"
                                autoFocus
                                data-tooltip-id="is_withdrawal_rate"
                                onChange={handleInput}
                                defaultValue={allmodels?.use_withdrawal_rate}
                                name={"withdrawal_rate"}
                                disabled={true}
                                className={`${selectedCard === 2 ? "text-[#8792A6] lg:text-white" : "text-white"} text-lg lg:text-base font-normal font-Work_Sans w-3 lg:w-6  input-border-none bg-transparent lg:ps-3 `}
                            />
                            <p className={`${selectedCard === 2 ? "text-[#8792A6] lg:text-white" : "text-white"} text-lg lg:text-base font-Work_Sans lg:pe-2`}>%</p>
                        </div>
                        <Tooltip
                            id={'is_withdrawal_rate'}
                            message={<WithdrawlMessage />}
                            backgroundColor={'#232E41'}
                            zIndex={999}
                            opacity={1}
                        />
                    </OptionCard>
                    <OptionCard value={3}
                        checked={allmodels?.post_retirment?.is_reduse_expenses_by ? true : false}
                        isactive={selectedCard === 3}
                        name={"is_reduse_expenses_by"}
                        className={'md:max-w-[70%] lg:max-w-full'}
                        handleCheckBox={handleCheckBox}
                        title='I will slow down & reduce expenses by'
                    >
                        <div className={`${selectedCard === 3 ? "  bg-white border lg:border-cyan-950" : "lg:border lg:border-white text-white lg:border-opacity-30 bg-grey-2 lg:bg-transparent bg-opacity-10 lg:bg-opacity-0"} md:mr-4 lg:mr-0 py-1 lg:py-2 h-fit px-2 lg:px-3  rounded-[15px] lg:rounded-2xl  flex justify-center items-center max-sm:ml-6 margin-6`} style={selectedCard === 3 ? { boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.50) inset' } : {}}>
                            <input type="number"
                                onChange={handleInput}
                                autoFocus
                                defaultValue={allmodels?.post_retirment_rate?.reduse_expenses_by}
                                name={"reduse_expenses_by"}
                                disabled={selectedCard !== 3 ? true : false}
                                className={`${selectedCard === 3 ? "text-black lg:text-grey-4" : "text-white"}text-lg lg:text-base  font-normal font-Work_Sans w-5 lg:w-6 input-border-none bg-transparent`}
                            />
                            <p className={`${selectedCard === 3 ? "text-black " : 'text-white'}  text-center text-lg lg:text-base  font-normal font-Work_Sans capitalize whitespace-nowrap`}>%</p>
                        </div>
                    </OptionCard>
                    {allmodels?.post_retirment?.is_reduse_expenses_by ? <div className="px-2 gap-4 flex items-center justify-between">
                        <p className="text-emerald-300  font-light font-Montserrat italic lg:not-italic text-xs md:text-sm lg:text-xs xl:text-sm ">Post-Retirement Expenses</p>
                        <div className="px-6 py-1 lg:p-1.5 rounded-[15px] lg:rounded-[14px] border-0 lg:border lg:border-emerald-300 font-light">
                            <p className="text-emerald-300 text-lg md:text-xl lg:text-base font-light font-Work_Sans flex items-center text-6"> <span><LiaRupeeSignSolid />
                            </span>{allmodels?.post_retirment?.is_reduse_expenses_by ? formatNumberWithCommas((allmodels?.yearly_expenses * (1 - (allmodels?.post_retirment_rate?.reduse_expenses_by / 100))).toFixed(1)) : 0}</p>
                        </div>
                    </div> : null}
                </div>
                <Card_footer className='card-footer-w max-md:mt-8 ' title='Finish'
                    BackonClick={() => { handleNextClick(4) }}
                    // NextonClick={() => naviagte("congratulation")}
                    NextonClick={() => validate()}
                />
            </div>
        </div>
    )
}
 
export default React.memo(Sixth_card)