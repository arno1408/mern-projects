import React, { useEffect, useState } from 'react'
import RangePickerCards from '../../components/rangepickers/RangePickerCards'
import RangeInput from '../../components/rangepickers/RangeInput'
import MoneyCard from '../../components/rangepickers/MoneyCard';
import { getData } from '../destop_L1/server';
import { useSelector, useDispatch } from 'react-redux'
import { all_level_1_data } from '../../redux/slices/Level_1_all_data';
import { NumericUnit, RegexNumberWithCommas, changeNumbertoComma, formatNumberWithCommas } from '../../Variable';
import useFetchPortfolio from '../../useFetchPortfolio/useFetchPortfolio';
import { CurrencyData } from '../../constants';
import Cashflow_icon from '../../components/my-power/sidebar-icons/Cashflow_icon';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";

const MoneyOut = () => {

    const [showdetailsinput, setshowdetailsinput] = useState(false);
    let allData = useSelector((state) => state?.level_1_data)
    const allmodels = useSelector(state => state?.Card_inputs);
    const numerictype = useSelector(state => state?.statistical_Data?.numerical_format)
    console.log(numerictype,'type');
    const [isMobile, setIsMobile] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
          if (window.innerWidth < 768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
      }, [window.innerWidth]); 

    useEffect(() =>{
        let temp = { ...allData?.expenses_data };
        if(allData?.expenses_data?.is_lumsum === true){
            temp['fixed_expenses_per_year'] = temp['yearly_expenses']
        }

        if(allData?.expenses_data?.is_lumpsum === false){
            temp['yearly_expenses'] =  (temp['fixed_expenses_per_year'] +  temp['variable_expenses_per_year']);
        }
        dispatch(all_level_1_data({ expenses_data: temp }))
    },[])

    const handleInputChange = (e) => {
        let temp = { ...allData?.expenses_data };
        temp[e.target.name] = +e.target.value.replace(/,/g, '')
        temp['yearly_expenses'] = (temp['fixed_expenses_per_year'] || 0) + (temp['variable_expenses_per_year'] || 0)
        temp['isEdit_expense'] = true;
        dispatch(all_level_1_data({ expenses_data: temp }))
    };
    const {result_chart_data} = useFetchPortfolio(allData?.expenses_data?.yearly_expenses, allData?.expenses_data?.fixed_expenses_per_year, allData?.expenses_data?.variable_expenses_per_year);

   
    const CurrencyFinder=()=>{
       
        // const userdetails = JSON.parse(localStorage.getItem('userdetails'));
        // const numerictype = userdetails?.user_data?.numerical_format || 'lakhs';
        if(numerictype == 'millions'){
            return <FaDollarSign/>;
        } else if(allmodels?.preferred_currency){
          const selectedCurrency = CurrencyData?.find(currency => currency.currencyIndex == allmodels?.preferred_currency).symbol
          return selectedCurrency;
        } else{
            return <FaIndianRupeeSign />;
          }
      }
    

      const DetailedViewRender=()=>{
        return(
            <>
            <div className='DetailedViewRender-container'>
                <div className='DetailedViewRender-TextContainer'>
                    <p className='moneyIn-text '>
                        <span className='block md:hidden absolute h-[9px] w-[9px] bg-aqua rounded-full start-[-15px] top-1/2 transform translate-y-[-50%]'></span>
                        {"Fixed Expenses per Year"}</p>
                </div>
                <div className="order-3 md:order-2 md:ml-auto">
                    <RangeInput 
                    className=' progress moneyOutRange-Input' 
                    step={10000} name="fixed_expenses_per_year" 
                    value={isNaN(allData?.expenses_data?.fixed_expenses_per_year) == false? allData?.expenses_data?.fixed_expenses_per_year: 0} 
                    min="0" max={'100000000'} 
                    style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(Number(allData?.expenses_data?.fixed_expenses_per_year)|| 0) / 100000000 * 100}%, #676767 ${(Number(allData?.expenses_data?.fixed_expenses_per_year)|| 0) / 100000000 * 100}%, #676767 100%)` }} 
                    onChange={handleInputChange} />
                    {/* <input type="range"  className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleInputChange(e)} /> */}
                </div>
                <div className='moneyIn-Value order-2 md:order-3' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                    <p className='moneyIn-ValueIcon'><CurrencyFinder/></p>
                    <input type="text"
                        // autoFocus
                        name='fixed_expenses_per_year'
                        value={changeNumbertoComma(allData?.expenses_data?.fixed_expenses_per_year? allData?.expenses_data?.fixed_expenses_per_year?.toString() : "", numerictype)}
                        // value={NumericFormatConversion(allData?.expenses_data.fixed_expenses_per_year)}
                        onChange={handleInputChange}
                        className={`moneyIn-Value-text`}
                    />
                    {/* <span className='text-base'><NumericUnit/></span>  */}
                </div>
            </div>
            {/* "Variable Expenses per Year" */}
            <div className='DetailedViewRender-container'>
                <div className='DetailedViewRender-TextContainer'>
                    <p className='moneyIn-text '>
                        <span className='block md:hidden absolute h-[9px] w-[9px] bg-aqua rounded-full start-[-15px] top-1/2 transform translate-y-[-50%]'></span>
                        {"Variable Expenses per Year"}
                    </p>
                </div>
                <div className="order-3 md:order-2 md:ml-auto">
                    <RangeInput 
                    className=' progress moneyOutRange-Input' 
                    step={10000} name="variable_expenses_per_year" 
                    value={isNaN(allData?.expenses_data?.variable_expenses_per_year) == false?allData?.expenses_data?.variable_expenses_per_year: 0} 
                    min="0" max={'100000000'} 
                    style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(allData?.expenses_data?.variable_expenses_per_year|| 0) / 100000000 * 100}%, #676767 ${(allData?.expenses_data?.variable_expenses_per_year|| 0) / 100000000 * 100}%, #676767 100%)` }} 
                    onChange={handleInputChange} />
                    {/* <input type="range"  className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleInputChange(e)} /> */}
                </div>
                <div className='moneyIn-Value order-2 md:order-3' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                    <p className='moneyIn-ValueIcon '><CurrencyFinder/></p>
                    <input type="text"
                        // autoFocus
                        value={changeNumbertoComma(allData?.expenses_data?.variable_expenses_per_year? allData?.expenses_data?.variable_expenses_per_year?.toString() : "", numerictype)}
                        // value={NumericFormatConversion(allData?.expenses_data.variable_expenses_per_year)}
                        name='variable_expenses_per_year'
                        onChange={handleInputChange}
                        className={`moneyIn-Value-text`}
                    />
                    {/* <span className='text-base'><NumericUnit/></span>  */}
                </div>
            </div>
        </> 
        )
      }

      const LumpsumRender=()=>{
        return(
            <div className='flex gap-6 items-center justify-center'>
            <div className='max-w-[140px]'>
                <p className='text-grey-3 text-start'>{"Total Expenses per Year"}</p>
            </div>
            <div className="ml-auto">
                <RangeInput 
                className='progress' 
                step={1000} 
                name="yearly_expenses" 
                value={allData?.expenses_data?.yearly_expenses}
                 min="0" max={10000000} 
                 style={{  background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(allData?.expenses_data?.yearly_expenses || 0) / 10000000 * 100}%, #676767 ${(allData?.expenses_data?.yearly_expenses || 0) / 10000000 * 100}%, #676767 100%)` }} 
                 onChange={handleInputChange} />
                {/* <input type="range"  className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleInputChange(e)} /> */}
            </div>
            <div className='flex items-center bg-grey-4 w-[139px] py-[8px] border text-aqua border-aqua px-[15px] rounded-2xl font-normal font-Work_Sans text-xs input-border-none' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                <p className='font-normal font-Work_Sans text-lg'><CurrencyFinder/></p>
                <input type="text"
                    autoFocus
                    value={changeNumbertoComma(allData?.expenses_data?.yearly_expenses.toString() || "", numerictype)}
                    name='yearly_expenses'
                    onChange={handleInputChange}
                    className={`w-full font-normal font-Work_Sans input-border-none bg-transparent text-lg`}
                />
            </div>
        </div>
        )
      }

    return (
        <MoneyCard heading={"Money Out"} Icon={Cashflow_icon} subtitle={`${isMobile?'':'(no EMIs)'}`} amount={changeNumbertoComma(allData?.expenses_data?.yearly_expenses, numerictype)} style={{ background: "#A1FBF6" }}>
            <div className={`p-9 md:p-12 md:pb-[82px] flex flex-col gap-6 justify-center  ${isMobile && 'border-2 rounded-b-xl border-solid shadow-2xl border-aqua'}`}>
                {/* <RowallData?.expenses_data inputName={"Fixed Expenses per Year"}/> */}
                {/* {allData?.expenses_data?.is_lumsum == false ?
                    <DetailedViewRender/>
                   :
                    <LumpsumRender/>
                } */}
                {DetailedViewRender()}
           
            </div>
        </MoneyCard>
    )
}

export default MoneyOut


  // useEffect(()=>{
    //     let temp = { ...allData?.expenses_data };
    //     temp['fixed_expenses_per_year'] = NumericBaseFormatConversion(temp['yearly_expenses'])
    //     dispatch(all_level_1_data({ expenses_data: temp }))
    // },[]);

    // useEffect(()=>{
    //     let temp = { ...allData?.expenses_data };
    //     temp['fixed_expenses_per_year'] = NumericBaseFormatConversion(temp['yearly_expenses'])
    //     dispatch(all_level_1_data({ expenses_data: temp }))
    // },[numerictype]);

   {/* <RowallData?.expenses_data inputName={"Variable Expenses per Year"} /> */}
                {/* <div className='flex justify-between'>
                    <p className='text-grey-3'>Plan Till Age</p>
                    <input type="number"
                        autoFocus
                        className="py-[9px] text-aqua px-4 rounded-2xl font-normal font-Work_Sans w-[60px] text-xs input-border-none bg-transparent" style={{ background: "rgba(220, 220, 220, 0.10)" }}
                    />
                </div>
                <div className='flex justify-between'>
                    <p className='text-grey-3'>Any Financial Dependents?</p>
                    <div className="bg-grey-1 px-3 py-[5px] rounded-2xl border border-aqua" style={{ background: 'linear-gradient(184deg, rgba(24, 33, 50, 0.40) 2.7%, rgba(24, 34, 51, 0.40) 96.07%' }}>
                        <select name="" id="" className='w-[60px] text-white  text-lg input-border-none bg-transparent'>
                            <option className="text-white  text-lg input-border-none bg-dark-blue" value={"true"}>Yes</option>
                            <option className="text-white  text-lg input-border-none bg-dark-blue" value={"false"}>No</option>
                        </select>
                    </div>
                </div> */}