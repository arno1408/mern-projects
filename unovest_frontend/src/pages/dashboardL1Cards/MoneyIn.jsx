import React, { useEffect, useRef, useState } from 'react'
import RangePickerCards from '../../components/rangepickers/RangePickerCards'
import RangeInput from '../../components/rangepickers/RangeInput'
import MoneyCard from '../../components/rangepickers/MoneyCard';
import { useSelector, useDispatch } from 'react-redux'
import { all_level_1_data } from '../../redux/slices/Level_1_all_data';
import { NumericUnit, RegexNumberWithCommas, changeNumbertoComma, formatNumberWithCommas } from '../../Variable';
import useFetchPortfolio from '../../useFetchPortfolio/useFetchPortfolio';
import { CurrencyData } from '../../constants';
import Cashflow_icon from "../../components/my-power/sidebar-icons/Cashflow_icon";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";

const MoneyIn = () => {
    let allData = useSelector((state) => state?.level_1_data)
    const allmodels = useSelector(state => state?.Card_inputs);

    const salary = allData?.lead_annual_income_data?.salary
    const freelance = allData?.lead_annual_income_data?.freelance
    const rents = allData?.lead_annual_income_data?.rents

    const dispatch = useDispatch();
    const [inputs, setinputs] = useState({ income_growth: 0, expense_growth: 0, portpolio_growt: 0, p_retirement_lifestyle: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const numerictype = useSelector(state => state?.statistical_Data?.numerical_format)

    useEffect(() => {
          if (window.innerWidth < 768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
      }, [window.innerWidth]); 
   
    const handleInputChange = (e) => {
        let temp = { ...allData?.lead_annual_income_data };
        temp[e.target.name] = +e.target.value.replace(/,/g, '')
        temp['total_annual_income'] = (temp['salary']||0) + (temp['freelance']||0) + (temp['rents']|| 0)
        temp['isEdit_income'] = true;
        dispatch(all_level_1_data({ lead_annual_income_data: temp }))
    };

    useEffect(() =>{
        let temp = { ...allData?.lead_annual_income_data };
        if(temp['salary'] <= 0 && temp['freelance'] <= 0 && temp['rents'] <= 0){
            temp['salary'] = temp['total_annual_income'] 
        }
        dispatch(all_level_1_data({ lead_annual_income_data: temp }))
    },[])

    const {result_chart_data} = useFetchPortfolio(allData?.lead_annual_income_data?.total_annual_incomes, salary,freelance,rents);
    console.log(result_chart_data,'result_chart_data');
  

    const CurrencyFinder=()=>{
        // const userdetails = JSON.parse(localStorage.getItem('userdetails'));
        // const numerictype = userdetails?.user_data?.numerical_format || 'lakhs';
        if(numerictype == 'millions'){
            return (<FaDollarSign />) ;
        } else if(allmodels?.preferred_currency){
          const selectedCurrency = CurrencyData?.find(currency => currency.currencyIndex == allmodels?.preferred_currency).symbol
          return selectedCurrency;
        } else{
            return (<FaIndianRupeeSign />);
          }
      }
    
    const DetailedViewMobileRender=()=>{
            return (<>
                <div>
                {/* "Salary" */}
                    <div className='flex justify-between w-full items-center'>
                        <div className='max-w-[100px]'>
                            <p className='text-grey-3 text-start text-sm'>{"Salary"}</p>
                        </div>
                        <div className='flex items-center gap-1 bg-grey-4 w-[139px] py-1 border text-aqua border-aqua px-[15px] rounded-2xl font-normal font-Work_Sans input-border-none' style={{ background: "#DCDCDC1A" }}>
                            <p className='font-normal font-Work_Sans text-lg'><CurrencyFinder /></p>
                            <input type="text"
                                //    autoFocus
                                name="salary"
                                value={changeNumbertoComma(allData?.lead_annual_income_data?.salary ? allData?.lead_annual_income_data?.salary.toString() : "", numerictype)}
                                // value={NumericFormatConversion(allData?.lead_annual_income_data?.salary)}
                                onChange={handleInputChange}
                                className={`w-full font-semibold text-lg font-Work_Sans input-border-none bg-transparent`}
                            />
                             <NumericUnit/>
                        </div>
                    </div>
                    <div className="ml-auto w-full">
                        <RangeInput
                            className='progress min-w-[220px]'
                            step={10000}
                            name="salary"
                            value={isNaN(allData?.lead_annual_income_data?.salary) == false? allData?.lead_annual_income_data?.salary : 0} min={'0'} max={'100000000'}
                            style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${((allData?.lead_annual_income_data?.salary || 0) / 100000000) * 100}%, #676767 ${((allData?.lead_annual_income_data?.salary || 0) / 100000000) * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                         </div>

                </div>
            {/* "Freelance / Business" */}
                <div className='flex flex-wrap gap-2 items-center justify-center'>
                    <div className='flex justify-between w-full items-center'>
                        <div className='max-w-[35%]'>
                            <p className='text-grey-3 text-start text-sm'>{"Freelance / Business"}</p>
                        </div>
                        <div className='flex items-center gap-1 bg-grey-4 w-[139px] py-1 border text-aqua border-aqua px-[15px] rounded-2xl font-normal font-Work_Sans input-border-none' style={{ background: "#DCDCDC1A" }}>
                            <p className='font-normal font-Work_Sans text-lg'><CurrencyFinder /></p>
                            <input type="text"
                                // autoFocus
                                name='freelance'
                                value={changeNumbertoComma(allData?.lead_annual_income_data?.freelance? allData?.lead_annual_income_data?.freelance.toString(): "", numerictype)}
                                // value={NumericFormatConversion(allData?.lead_annual_income_data?.freelance)}
                                onChange={handleInputChange}
                                className={`w-full font-semibold text-lg font-Work_Sans input-border-none bg-transparent`}
                            />
                             <NumericUnit/>
                        </div>
                    </div>
                    <div className="ml-auto w-full">
                        <RangeInput className='progress min-w-[220px]'
                            step={10000}
                            name="freelance"
                            value={isNaN(allData?.lead_annual_income_data?.freelance) == false? allData?.lead_annual_income_data?.freelance : 0 } min="0" max="100000000"
                            style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(allData?.lead_annual_income_data?.freelance || 0) / 100000000 * 100}%, #676767 ${(allData?.lead_annual_income_data?.freelance || 0) / 100000000 * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                    </div>
                </div>
                  {/* "Rents */}
                <div className='flex flex-wrap gap-2 items-center justify-center'>
                    <div className='flex justify-between w-full items-center'>
                        <div className='max-w-[100px]'>
                            <p className='text-grey-3 text-start text-sm'>{"Rents"}</p>
                        </div>
                       
                        <div className='flex items-center gap-1 bg-grey-4 w-[139px] py-1 border text-aqua border-aqua px-[15px] rounded-2xl font-normal font-Work_Sans input-border-none order-2 md:order-3' style={{ background: "#DCDCDC1A" }}>
                            <p className='font-normal font-Work_Sans text-lg'><CurrencyFinder /></p>
                            <input type="text"
                                // autoFocus
                                name='rents'
                                value={changeNumbertoComma(allData?.lead_annual_income_data?.rents? allData?.lead_annual_income_data?.rents.toString() : "", numerictype)}
                                // value={NumericFormatConversion(allData?.lead_annual_income_data?.rents)}
                                onChange={handleInputChange}
                                className={`w-full font-semibold text-lg font-Work_Sans input-border-none bg-transparent`}
                            />
                             <NumericUnit/>
                        </div>
                    </div>
                        <div className="ml-auto w-full">
                            <RangeInput
                                className='progress min-w-[220px]'
                                step={10000}
                                name="rents"
                                value={isNaN(allData?.lead_annual_income_data?.rents) == false?allData?.lead_annual_income_data?.rents: 0} min="0" max="100000000"
                                style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(allData?.lead_annual_income_data?.rents || 0) / 100000000 * 100}%, #676767 ${(allData?.lead_annual_income_data?.rents || 0) / 100000000 * 100}%, #676767 100%)` }}
                                onChange={handleInputChange} />
                        </div>
                </div>
        </>)
    }  
      
    const DetailedViewRender=()=>{
        return (<>
            <div className='flex flex-wrap moneyIn-container'>
                <div className='moneyInText-container'>
                    <p className='moneyIn-text'>{"Salary"}</p>
                </div>
                <div className="ml-auto">
                    <RangeInput 
                    className='moneyInRange-Input progress ' 
                    step={10000} 
                    name="salary" 
                    value={isNaN(allData?.lead_annual_income_data?.salary) == false?allData?.lead_annual_income_data?.salary : 0} 
                    min={'0'} max={'100000000'}
                    style={{   background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${((allData?.lead_annual_income_data?.salary || 0) / 100000000) * 100}%, #676767 ${((allData?.lead_annual_income_data?.salary || 0) / 100000000) * 100}%, #676767 100%)` }} 
                    onChange={handleInputChange} />
                    {/* <input type="range" className='progress' step="1" min="0" max="100" value={allData?.lead_annual_income_data?.salary} style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleInputChange(e)} /> */}
                </div>
                <div className='moneyIn-Value' style={{ background: "#DCDCDC1A" }}>
                    <p className='moneyIn-ValueIcon'><CurrencyFinder /></p>
                    <input 
                        type={'text'}
                    //    autoFocus
                        name="salary"
                        // value={changeNumbertoComma(allData?.lead_annual_income_data?.salary ? allData?.lead_annual_income_data?.salary.toString() : "")}
                        value={changeNumbertoComma(allData?.lead_annual_income_data?.salary ? allData?.lead_annual_income_data?.salary.toString() : "", numerictype)}
                        onChange={handleInputChange}
                        className={`moneyIn-Value-text`}
                    />
                </div>
            </div>
            {/* "Freelance / Business" */}
            <div className='flex moneyIn-container'>
                <div className='moneyInText-container'>
                    <p className='moneyIn-text'>{"Freelance / Business"}</p>
                </div>
                <div className="ml-auto">
                    <RangeInput className='moneyInRange-Input progress ' 
                    step={10000} 
                    name="freelance" 
                    value={isNaN(allData?.lead_annual_income_data?.freelance) == false?allData?.lead_annual_income_data?.freelance : 0} 
                    min="0" max="100000000"
                    style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(allData?.lead_annual_income_data?.freelance || 0) / 100000000 * 100}%, #676767 ${(allData?.lead_annual_income_data?.freelance || 0) / 100000000 * 100}%, #676767 100%)` }} 
                    onChange={handleInputChange} />
                    {/* <input type="range" className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleInputChange(e)} /> */}
                </div>
                <div className='moneyIn-Value' style={{ background: "#DCDCDC1A" }}>
                    <p className='moneyIn-ValueIcon'><CurrencyFinder /></p>
                    <input type="text"
                        // autoFocus
                        name='freelance'
                        // value={changeNumbertoComma(allData?.lead_annual_income_data?.freelance ? allData?.lead_annual_income_data?.freelance.toString() : "")}
                        value={changeNumbertoComma(allData?.lead_annual_income_data?.freelance ? allData?.lead_annual_income_data?.freelance.toString() : "", numerictype)}
                        onChange={handleInputChange}
                        className={`moneyIn-Value-text`}
                    />
                </div>
            </div>
            {/* <RowInputs inputName={"Freelance / Business"} /> */}
            {/* "Rents" */}
            {/* <RowInputs inputName={"Rents"} /> */}
            <div className='flex flex-wrap moneyIn-container'>
                <div className='moneyInText-container order-1'>
                    <p className='moneyIn-text'>{"Rents"}</p>
                </div>
                <div className="md:ml-auto order-3 md:order-2">
                    <RangeInput 
                    className='moneyInRange-Input progress ' 
                    step={10000} 
                    name="rents" 
                    value={isNaN(allData?.lead_annual_income_data?.rents) == false?allData?.lead_annual_income_data?.rents: 0} min="0" max="100000000"
                        style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(allData?.lead_annual_income_data?.rents || 0) / 100000000 * 100}%, #676767 ${(allData?.lead_annual_income_data?.rents || 0) / 100000000 * 100}%, #676767 100%)` }} 
                    onChange={handleInputChange} />
                    {/* <input type="range" className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleInputChange(e)} /> */}
                </div>
                <div className='moneyIn-Value order-2 md:order-3' style={{ background: "#DCDCDC1A" }}>
                    <p className='moneyIn-ValueIcon'><CurrencyFinder /></p>
                    <input type="text"
                        // autoFocus
                        name='rents'
                        // value={changeNumbertoComma(allData?.lead_annual_income_data?.rents ? allData?.lead_annual_income_data?.rents.toString() : "")}
                        value={changeNumbertoComma(allData?.lead_annual_income_data?.rents ? allData?.lead_annual_income_data?.rents.toString() : "", numerictype)}
                        onChange={handleInputChange}
                        className={`moneyIn-Value-text`}
                    />
                </div>
            </div>
        </>)

    }

    const LumpsumRender=()=>{
        return(
            <div className='flex flex-wrap gap-2 md:gap-6 items-center justify-between md:justify-center'>
            <div className='max-w-[140px] order-1'>
                <p className='text-grey-3'>{"Total Annual Income"}</p>
            </div>
            <div className="md:ml-auto order-3 md:order-2 w-full md:w-auto">
                <RangeInput 
                className='progress w-full md:w-auto' step={10000} 
                name="total_annual_income" 
                value={allData?.lead_annual_income_data?.total_annual_income}  
                min="0" 
                max="10000000" 
                style={{  background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${((allData?.lead_annual_income_data?.total_annual_income || 0) / 10000000) * 100}%, #676767 ${((allData?.lead_annual_income_data?.total_annual_income || 0) / 10000000) * 100}%, #676767 100%)` }} onChange={handleInputChange} />
                {/* <input type="range" className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleInputChange(e)} /> */}
            </div>
            <div className='flex items-center bg-grey-4 w-[139px] py-2 border text-aqua border-aqua px-[15px] rounded-2xl font-normal font-Work_Sans input-border-none order-2 md:order-3' style={{ background: "#DCDCDC1A" }}>
                <p className='font-normal font-Work_Sans text-lg'><CurrencyFinder/></p>
                <input type="text"
                    autoFocus
                    name='total_annual_income'
                    value={changeNumbertoComma(allData?.lead_annual_income_data?.total_annual_income ? allData?.lead_annual_income_data?.total_annual_income.toString() : "")}
                    onChange={handleInputChange}
                    className={`w-full font-normal font-Work_Sans input-border-none bg-transparent text-lg`}
                />
            </div>
        </div>
        )
    }

    return (
        <MoneyCard heading={"Money In"} Icon={Cashflow_icon} amount={changeNumbertoComma(allData?.lead_annual_income_data?.total_annual_income, numerictype)} style={{ background: "#A1FBF6" }}>
            <div className={`p-9 md:p-12 flex flex-col gap-6 justify-center  ${isMobile && 'border-2 rounded-b-xl border-solid shadow-2xl border-aqua'}`}>
                {/* <RowInputs inputName={"Salary"}/> */}
                {/* Salary  */}
                {/* {allData?.lead_annual_income_data?.is_lumsum == false ?
                    <DetailedViewRender/>
                    :
                    <LumpsumRender/>
                } */}
                {isMobile ? DetailedViewMobileRender():DetailedViewRender()}
            </div>
        </MoneyCard>
    )
}

export default MoneyIn

  // useEffect(() =>{
    //     let temp = { ...allData?.lead_annual_income_data };
    //     if(temp['salary'] <= 0 && temp['freelance'] <= 0 && temp['rents'] <= 0){
    //         temp['salary'] = NumericBaseFormatConversion(temp['total_annual_income']) 
    //     }else{
    //         temp['salary'] = NumericBaseFormatConversion(temp['salary']) 
    //         temp['freelance'] = NumericBaseFormatConversion(temp['freelance']) 
    //         temp['rents'] = NumericBaseFormatConversion(temp['rents']) 
    //     }
    //     dispatch(all_level_1_data({ lead_annual_income_data: temp }))
    // },[numerictype])
