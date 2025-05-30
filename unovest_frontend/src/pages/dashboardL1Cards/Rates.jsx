import React, { useEffect, useState } from 'react'
import RangePickerCards from '../../components/rangepickers/RangePickerCards'
import RangeInput from '../../components/rangepickers/RangeInput'
import { getData } from '../destop_L1/server';
import { useDispatch, useSelector } from 'react-redux'
import useFetchPortfolio from '../../useFetchPortfolio/useFetchPortfolio';
import { all_level_1_data } from '../../redux/slices/Level_1_all_data';
import Assumptions_icon from '../../components/my-power/sidebar-icons/Assumptions_icon';
import Tooltip from '../../components/tooltip/Tooltip';
import { IoLockClosed } from 'react-icons/io5';
import PostRetirementData from './PostRetirementData';


const Rates = () => {
    const [isMobile, setIsMobile] = useState(false);
    const dispatch = useDispatch();
    const [rangeValue, setrangeValue] = useState(0);
    const [inputs, setinputs] = useState({ income_growth: 0, expense_growth: 0, portpolio_growt: 0, p_retirement_lifestyle: 0 });
    // const [inputs, setinputs] = useState({ average_growth_rate: 0, average_inflation: 0, expected_average_annual_ror: 0, p_retirement_lifestyle: 0 });
    let allData = useSelector((state) => state?.level_1_data)
    const {result_chart_data} = useFetchPortfolio(allData?.lead_annual_income_data?.average_growth_rate,allData?.expenses_data?.average_inflation,allData?.lead_invested_value_data?.expected_average_annual_ror);
    console.log(result_chart_data,"chart");
    
    useEffect(() => {
          if (window.innerWidth < 768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
      }, [window.innerWidth]); 

    const handleChangeInputs = (e) => {
        let temp = {...allData}
       let numericValue = +e.target.value.replace(/[%\s]/g, '');

        if(e.target.name === "income_growth"){
            temp = { ...allData?.lead_annual_income_data }
            temp['average_growth_rate'] = numericValue;
            temp['isEdit_rate'] = true;
            dispatch(all_level_1_data({ lead_annual_income_data: temp }))
        }else if(e.target.name === "expense_growth"){
            temp = { ...allData?.expenses_data }
            temp['average_inflation'] = numericValue;
            temp['isEdit_rate'] = true;
            dispatch(all_level_1_data({ expenses_data: temp }))
        }else if(e.target.name === "portpolio_growt"){
             temp = { ...allData?.lead_invested_value_data }
            temp['expected_average_annual_ror'] = numericValue;
            temp['isEdit_rate'] = true;
            dispatch(all_level_1_data({ lead_invested_value_data: temp }))
        }else if(e.target.name === "post_retirement_lifestyle"){
            temp = { ...allData?.post_retirement_data }
           temp['post_retirement_lifestyle'] = e.target.value.replace(/[%\s]/g, '');
           temp['isEdit_rate'] = true;
           dispatch(all_level_1_data({ post_retirement_data: temp }))
        }
        setinputs({
            ...inputs,
            income_growth: temp?.average_growth_rate,
            expense_growth: temp?.average_inflation,  
            portpolio_growt: temp?.expected_average_annual_ror,  
        });
    }

    useEffect(() =>{
        let temp = null;
        temp = { ...allData?.post_retirement_data }
        temp['post_retirement_lifestyle'] = 'false';
        dispatch(all_level_1_data({ post_retirement_data: temp }))
    },[])
    
    
    const Message=({message})=>{
        return (
            <div className='w-52'>
                {message}
            </div>
        )
    }
    
    return (
        <RangePickerCards heading={"Rates"} Icon={Assumptions_icon}>
            <div className={`p-12 flex flex-col gap-9 md:gap-6 justify-center ${isMobile && 'border-2 rounded-b-xl border-solid shadow-2xl border-accent-green'}`}>
                {/* <RowInputs inputName={"Income Growth"}/> */}
                {/* "Income Growth" */}
                <div className='rates-container'>
                    <div className='order-1'>
                        <p className='rates-heading'>{"Income Growth"}</p>
                    </div>
                    <div className="rates-rangeInput">
                        <RangeInput className='progress w-full' name={"income_growth"} value={allData?.lead_annual_income_data?.average_growth_rate} min="0" max="100" style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${allData?.lead_annual_income_data?.average_growth_rate}%, #676767 ${inputs?.income_growth}%, #676767 100%)` }} onChange={handleChangeInputs} />
                        {/* <input type="range"  className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleRangeChange(e)} /> */}
                    </div>
                    <div className='rates-Input border  text-accent-green border-accent-bright-green max-md:border-accent-bright-green  ring-accent-green '>
                        <input type="number"
                            //autoFocus
                            name='income_growth'
                            onChange={handleChangeInputs}
                            value={`${allData?.lead_annual_income_data?.average_growth_rate}`}
                            className={`text-center bg-transparent w-full max-md:bg-transparent rounded-2xl font-['Work Sans'] input-border-none focus:outline-none `}
                        />
                        <span>%</span>
                    </div>
                </div>
                {/* <RowInputs inputName={"Expense Growth/ Inflation"} /> */}
                {/* Expense Growth/ Inflation */}
                <div className='rates-container'>
                    <div className='order-1 max-w-[65%]'>
                        <p className='rates-heading'>{"Expense Growth/ Inflation"}</p>
                    </div>
                    <div className="rates-rangeInput">
                        <RangeInput className='progress w-full' name={"expense_growth"} value={allData?.expenses_data?.average_inflation} min="0" max="100" style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${allData?.expenses_data?.average_inflation}%, #676767 ${inputs.expense_growth}%, #676767 100%)` }} onChange={handleChangeInputs} />
                        {/* <input type="range"  className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleRangeChange(e)} /> */}
                    </div>
                    <div className='rates-Input border  text-accent-green border-accent-bright-green max-md:border-accent-bright-green  ring-accent-green '>
                        <input type="number"
                            value={`${allData?.expenses_data?.average_inflation}`}
                            //autoFocus
                            onChange={handleChangeInputs}
                            name='expense_growth'
                            className={`text-center bg-transparent w-full max-md:bg-transparent rounded-2xl font-['Work Sans'] input-border-none focus:outline-none `}
                        />
                         <span>%</span>
                    </div>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='rates-heading'>Portfolio Growth</p>
                    <div className='flex items-center' data-tooltip-id='upgrade-l2'>
                        <div className='rates-Input  text-accent-green  '>
                            <input type="number"
                                name='portpolio_growt'
                                // defaultValue={allData?.lead_invested_value_data?.expected_average_annual_ror}
                                value={`${allData?.lead_invested_value_data?.expected_average_annual_ror.toFixed(1)}`}
                                //autoFocus
                              
                                disabled
                                onChange={handleChangeInputs}
                                className="disabled:opacity-45 text-center bg-transparent w-full max-md:bg-transparent rounded-2xl font-['Work Sans'] input-border-none focus:outline-none " 
                            />
                            <span className='opacity-45'>%</span>
                        </div>
                        <IoLockClosed size={'1.4em'} color='#B5B5B5' className='order-3' />
                    </div>
                </div>
                <div className='flex justify-between'>
                    <p className='rates-heading'>Post-Retirement Lifestyle</p>
                    <div className="bg-grey-1 py-1 px-2 max-md:px-2 max-md:py-2 rounded-2xl border border-zinc-400  md:border-accent-bright-green flex items-center" style={{ background: 'linear-gradient(184deg, rgba(24, 33, 50, 0.40) 2.7%, rgba(24, 34, 51, 0.40) 96.07%' }}>
                        <select name="post_retirement_lifestyle" value={allData?.post_retirement_data?.post_retirement_lifestyle} onChange={handleChangeInputs} id="" className='w-[70px] max-md:w-fit text-white  text-lg max-md:text-base input-border-none bg-transparent'>
                            <option className="text-white text-lg max-md:text-xs input-border-none bg-dark-blue" value={"true"}>Edit</option>
                            <option className="text-white text-lg max-md:text-xs input-border-none bg-dark-blue" value={"false"}>No</option>
                        </select>
                    </div>
                </div>
                <div className={` ${allData?.post_retirement_data?.post_retirement_lifestyle == 'true' ? 'absolute w-3/4 bottom-28 right-12 max-md:w-full max-md:right-0 max-md:bottom-32 z-40 opacity-100 max-md:z-50' : 'absolute scale-50 opacity-0 -z-20 -bottom-10 -right-20 max-md:scale-0'} transition-all ease-in-out duration-300`}>
                    <PostRetirementData />
                </div>
                
                <Tooltip
                    id={'upgrade-l2'}
                    backgroundColor={'#232E41'}
                    message={<Message message={'Upgrade to Level 2'}/>}
                    opacity={1}
                    position='top'
                /> 
            </div>
        </RangePickerCards>
    )
}

export default Rates
