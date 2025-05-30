import React, { useEffect, useRef, useState } from 'react'
import RangePickerCards from '../../components/rangepickers/RangePickerCards'
import RangeInput from '../../components/rangepickers/RangeInput'
import MoneyCard from '../../components/rangepickers/MoneyCard';
import { useDispatch, useSelector } from 'react-redux';
import { all_level_1_data } from '../../redux/slices/Level_1_all_data';
import { NumericUnit, RegexNumberWithCommas, changeNumbertoComma, formatNumberWithCommas } from '../../Variable';
import useFetchPortfolio from '../../useFetchPortfolio/useFetchPortfolio';
import { CurrencyData } from '../../constants';
import Tooltip from '../../components/tooltip/Tooltip';
import Networth_icon from '../../components/my-power/sidebar-icons/Networth_icon';
import { Premium } from '../../assets/Icons';
import { NumericBaseFormatConversion, NumericFormatConversion } from '../../numericalFormatConversion/NumericFormatConversion';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";
import { IoLockClosed } from 'react-icons/io5';

const WhatYouOwn = () => {
    const [isMobile, setIsMobile] = useState(false);
    const dispatch = useDispatch();
    let allData = useSelector((state) => state?.level_1_data);
    const allmodels = useSelector(state => state?.Card_inputs);
    const numerictype = useSelector(state => state?.statistical_Data?.numerical_format)
    // const userdetails = JSON.parse(localStorage.getItem('userdetails'));
    // const numerictype = userdetails?.user_data?.numerical_format || 'lakhs';

    const [isDisabled, setIsDisabled] = useState({
        cash_ror: true,
        bond_ror: true,
        equity_ror: true,
    });
    
    useEffect(() => {
          if (window.innerWidth < 768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
      }, [window.innerWidth]); 

    useEffect(() =>{
        let temp = {...allData?.lead_invested_value_data}; 
        let updatedConverted = [...allData?.lead_invested_value_data?.investmentdata]
       
        let investmentdata = updatedConverted.map((asset) => {
   
            if(temp['is_lumsum'] === true){  
                if(asset['cash_amount'] === 0){
                    return {...asset, cash_amount: temp['total_invested_value'], cash_ror: temp['expected_average_annual_ror']}
                }
              return asset;
            }
            return asset;
        });

        const assetsUpdated = {...temp, investmentdata}
        temp['total_invested_value'] = (investmentdata[0]?.['equity_amount'] + investmentdata[1]?.['bond_amount'] + investmentdata[2]?.['cash_amount']);
        dispatch(all_level_1_data({ lead_invested_value_data: assetsUpdated }))
    },[]);

  
    const handleInputChange = (e) => {
        if(e.target.name === 'total_invested_value'){
            let temp = { ...allData?.lead_invested_value_data };
            temp[e.target.name] = +e.target.value.replace(/,/g, '') 
            temp['isEdit_investment'] = true;
            dispatch(all_level_1_data({ lead_invested_value_data: temp }))
        }else{
            let temp = {...allData?.lead_invested_value_data}; 
            let updatedAssets = [...allData?.lead_invested_value_data?.investmentdata]; 
            let newArray = {...temp, investmentdata:updatedAssets.map(ele => {

                let calculatedEquity_ror = ele['equity_ror'] > 0? ele['equity_ror']: 11;
                let calculatedBonds_ror = ele['bonds_ror'] > 0? ele['bonds_ror']: 6;
                let calculatedCash_ror = 4; 

                if(e.target.name === 'equity_amount' && ele[e.target.name] !== undefined){
                    return {...ele, [e.target.name]:+e.target.value.replace(/,/g, ''),equity_ror: calculatedEquity_ror }
                }else if(e.target.name === 'bond_amount' && ele[e.target.name] !== undefined){
                    return {...ele, [e.target.name]:+e.target.value.replace(/,/g, ''),bonds_ror: calculatedBonds_ror }
                }else if(e.target.name === 'cash_amount' && ele[e.target.name] !== undefined) {
                    return {...ele, [e.target.name]:+e.target.value.replace(/,/g, ''),cash_ror: calculatedCash_ror }
                } else{
                    return ele;
                }
               
                // return ele[e.target.name] !== undefined ? {...ele, [e.target.name]:+e.target.value.replace(/,/g, ''), equity_ror: calculatedEquity_ror, cash_ror: calculatedCash_ror, bonds_ror:calculatedBonds_ror }:ele
            })} 
        
            let newArrayUpdateAsset = [...newArray?.investmentdata ];
            
            newArray['total_invested_value'] = (newArrayUpdateAsset[0]?.['equity_amount'] || 0) +(newArrayUpdateAsset[1]?.['bond_amount'] || 0) +(newArrayUpdateAsset[2]?.['cash_amount'] || 0)
            
             //----------------calculate weighted average for equity, cash and bond----------------------//
            const weightedAverage = ((
            ((temp['cash_ror'] || 4) / 100) * (newArrayUpdateAsset[2]?.['cash_amount'] || 0) +
            ((temp['bond_ror'] || 6) / 100) * (newArrayUpdateAsset[1]?.['bond_amount'] || 0) +
            ((temp['equity_ror'] || 11) / 100) * (newArrayUpdateAsset[0]?.['equity_amount'] || 0)) /
            ((newArrayUpdateAsset[2]?.['cash_amount'] || 0) + 
            (newArrayUpdateAsset[1]?.['bond_amount'] || 0) + 
            (newArrayUpdateAsset[0]?.['equity_amount'] || 0))) * 100
           
            newArray['expected_average_annual_ror'] = Math.round(weightedAverage);
            newArray['isEdit_investment'] = true;
            dispatch(all_level_1_data({ lead_invested_value_data: newArray }))
        }
    };

    let assetDetails ={};
    assetDetails = {
          equity_amount: allData?.lead_invested_value_data?.investmentdata[0].equity_amount || 0,
          bond_amount: allData?.lead_invested_value_data?.investmentdata[1]?.bond_amount || 0,
          cash_amount: allData?.lead_invested_value_data?.investmentdata[2]?.cash_amount || 0,
          equity_ror: allData?.lead_invested_value_data?.investmentdata[0]?.equity_ror || 0,
          bond_ror: allData?.lead_invested_value_data?.investmentdata[1]?.bonds_ror || 0,
          cash_ror: allData?.lead_invested_value_data?.investmentdata[2]?.cash_ror || 0,
      }

    const {result_chart_data} = useFetchPortfolio(assetDetails.equity_amount,assetDetails.equity_ror,
        assetDetails.bond_amount,assetDetails.bond_ror,assetDetails.cash_amount,assetDetails.cash_ror, allData?.lead_invested_value_data?.total_invested_value);
    console.log(result_chart_data,"chart");
    // console.log(allData?.lead_invested_value_data?.total_invested_value,"value");
    
    const CurrencyFinder=()=>{
        // const userdetails = JSON.parse(localStorage.getItem('userdetails'));
        // const numerictype = userdetails?.user_data?.numerical_format || 'lakhs';
        if(numerictype == 'millions'){
            return <FaDollarSign />;
        } else if(allmodels?.preferred_currency){
          const selectedCurrency = CurrencyData?.find(currency => currency.currencyIndex == allmodels?.preferred_currency).symbol
          return selectedCurrency;
        } else{
            return <FaIndianRupeeSign />;
          }
      }

    const LumpsumRender=()=>{
        return(
            <div className='flex w-full justify-between gap-3 items-start relative'>
            <div className='flex-grow'>
                <div className='flex flex-wrap justify-between items-start text-grey-3'>
                    <p className='w-full md:w-auto slg:max-w-[130px] leading-[40px] md:leading-4 relative'>{"Total value of Investment"}
                        <span className='block md:hidden absolute h-[9px] w-[9px] bg-aqua rounded-full start-[-15px] top-1/2 transform translate-y-[-50%]'></span>
                    </p>
                    {/* <p className='border px-4 py-2 rounded-2xl leading-[0.6] border-desk-light-blue-2 text-desk-light-blue-2'>{`₹ ${"5,49,29,295"}`}</p> */}
                    <p className='flex items-center gap-0.5 px-2 w-full md:max-w-[138px] border rounded-2xl border-desk-light-blue-2 text-desk-light-blue-2 h-9'>
                        <span><CurrencyFinder/></span>
                        <input type="text" 
                        // autoFocus min={0} 
                        name="total_invested_value" 
                        onChange={handleInputChange} 
                        value={allData?.lead_invested_value_data?.total_invested_value && changeNumbertoComma(allData?.lead_invested_value_data?.total_invested_value.toString())} 
                        className='input-border-none  bg-transparent max-w-[90%] text-desk-light-blue-2' />
                    </p>
                </div>
                <RangeInput className='progress w-full' name="total_invested_value" value={allData?.lead_invested_value_data?.total_invested_value} min="0" max="10000000" style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(allData?.lead_invested_value_data?.total_invested_value|| 0) / 10000000 * 100}%, #676767 ${(allData?.lead_invested_value_data?.total_invested_value|| 0) / 10000000 * 100}%, #676767 100%)` }} onChange={handleInputChange} />
            </div>
            <input type="text"
                autoFocus
                value={`${allData?.lead_invested_value_data?.expected_average_annual_ror} %`}
                onChange={handleInputChange}
                name='expected_average_annual_ror'
                className={`w-[70px] border border-desk-light-blue-2 text-desk-light-blue-2 font-normal font-Work_Sans input-border-none leading-4 px-4 py-2 md:py-2 rounded-2xl absolute md:static top-0 end-0`}
                style={{ background: "rgba(220, 220, 220, 0.1)" }}
            />
        </div>
        )
    } 

    const DetailedMobileViewRender=()=>{
        return (
            <>
                {/*-------------------------------------------- equity -------------------------------------------- */}
                <div className='flex w-full justify-between gap-3 items-baseline relative mb-7 '>
                    <div className='flex-grow'>
                        <div className='flex flex-wrap justify-between items-center text-grey-3 gap-4'>
                            <div className='flex gap-1  mt-2' data-tooltip-id='equity'>
                                <p className='w-full md:w-auto leading-[40px] md:leading-4 relative max-md:text-sm'>{"Equity"}
                                    <span className='block md:hidden absolute h-[9px] w-[9px] bg-aqua rounded-full start-[-15px] top-1/2 transform translate-y-[-50%]'></span>
                                </p>
                            </div>
                            <p className='flex items-center gap-0.5 px-2 h-9 md:h-auto w-full md:max-w-[138px] border rounded-2xl border-desk-light-blue-2 text-desk-light-blue-2 bg-[#384759]]'>
                                <span><CurrencyFinder /></span>
                                <input 
                                    type="text"
                                    min={0}
                                    name='equity_amount'
                                    value={changeNumbertoComma(assetDetails.equity_amount ? assetDetails.equity_amount.toString() : "", numerictype)}
                                    // value={NumericFormatConversion(assetDetails.equity_amount)}
                                    className=' input-border-none  max-md:text-lg bg-transparent w-full md:max-w-[90%] py-1 font-semibold'
                                    onChange={handleInputChange} />
                            </p>
                        </div>
                        <RangeInput
                            className='progress w-full'
                            name="equity_amount"
                            value={assetDetails.equity_amount || 0}
                            min="0"
                            max="10000000"
                            style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(assetDetails.equity_amount || 0) / 10000000 * 100}%, #676767 ${(assetDetails.equity_amount || 0) / 10000000 * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                    </div>
                    <input type="text"
                        value={`${assetDetails.equity_ror ? assetDetails.equity_ror : 0} %`}
                        data-tooltip-id='ror'
                        // autoFocus
                        onChange={handleInputChange}
                        name='equity_ror'
                        className={`${isDisabled.equity_ror && 'opacity-45'} w-[70px] text-desk-light-blue-2 font-semibold font-Work_Sans input-border-none leading-4 px-4 py-2 md:py-2 rounded-2xl absolute md:static top-0 end-0 `}
                        style={{ background: "rgb(62,62,62)" }}
                        disabled
                    />
                </div>

                {/* --------------------------------------------bonds--------------------------------------------  */}
                <div className='flex w-full justify-between gap-3 items-baseline relative mb-7'>
                    <div className='flex-grow'>
                        <div className='flex flex-wrap justify-between items-center text-grey-3  gap-4'>
                            <div className='flex gap-1 mt-2 ' data-tooltip-id='bonds'>
                                <p className='w-full md:w-auto leading-[40px] md:leading-4 relative max-md:text-sm '>{"Bond"}
                                    <span className='block md:hidden absolute h-[9px] w-[9px] bg-aqua rounded-full start-[-15px] top-1/2 transform translate-y-[-50%]'></span>
                                </p>
                            </div>
                            <p className='flex items-center gap-0.5 px-2 w-full md:max-w-[138px] border rounded-2xl border-desk-light-blue-2 text-desk-light-blue-2 py-1 h-9 md:h-auto'>
                                <span><CurrencyFinder /></span>
                                <input
                                    type="text"
                                    min={0}
                                    name="bond_amount"
                                    onChange={handleInputChange}
                                    value={changeNumbertoComma(assetDetails.bond_amount ? assetDetails.bond_amount.toString() : "", numerictype)}
                                    // value={NumericFormatConversion(assetDetails.bond_amount)}
                                    className='input-border-none max-md:text-lg  bg-transparent w-full md:max-w-[90%]  font-semibold' />
                            </p>
                        </div>
                        <RangeInput
                            className='progress w-full'
                            name="bond_amount"
                            value={assetDetails.bond_amount || 0}
                            min="0"
                            max="10000000"
                            style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(assetDetails.bond_amount || 0) / 10000000 * 100}%, #676767 ${(assetDetails.bond_amount || 0) / 10000000 * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                    </div>
                    <input type="text"
                        value={`${assetDetails.bond_ror ? assetDetails.bond_ror : 0} %`}
                        data-tooltip-id='ror'
                        // autoFocus
                        onChange={handleInputChange}
                        name='bonds_ror'
                        className={`${isDisabled.bond_ror && 'opacity-45'} opacity-45 w-[70px]  text-desk-light-blue-2 font-semibold font-Work_Sans input-border-none leading-4 px-4 py-2 md:py-2 rounded-2xl absolute md:static top-0 end-0`}
                        style={{ background: "rgb(62,62,62)" }}
                        disabled
                    />
                </div>

                {/*-------------------------------------------- cash -------------------------------------------- */}
                <div className='flex w-full justify-between gap-3 items-baseline relative mb-7'>
                    <div className='flex-grow'>
                        <div className='flex flex-wrap justify-between items-center text-grey-3  gap-4'>
                            <div className='flex gap-1 mt-2' data-tooltip-id='cash'>
                                <p className='w-full md:w-auto leading-[40px] md:leading-4 relative max-md:text-sm'>{"Cash"}
                                    <span className='block md:hidden absolute h-[9px] w-[9px] bg-aqua rounded-full start-[-15px] top-1/2 transform translate-y-[-50%]'></span>
                                </p>
                            </div>
                            <p className='flex items-center gap-0.5 px-2 py-1 h-9 md:h-auto w-full md:max-w-[138px] border rounded-2xl border-desk-light-blue-2 text-desk-light-blue-2'>
                                <span><CurrencyFinder /></span>
                                <input type="text"
                                    name='cash_amount'
                                    onChange={handleInputChange}
                                    value={changeNumbertoComma(assetDetails.cash_amount ? assetDetails.cash_amount.toString() : "", numerictype)}
                                    // value={NumericFormatConversion(assetDetails.cash_amount)}
                                    className='input-border-none  max-md:text-lg bg-transparent w-full md:max-w-[90%] font-semibold'
                                // disabled={true}
                                />
                            </p>
                        </div>
                        <RangeInput
                            className='progress w-full' name="cash_amount" value={assetDetails.cash_amount || 0}
                            min="0"
                            max="10000000"
                            style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(assetDetails.cash_amount || 0) / 10000000 * 100}%, #676767 ${(assetDetails.cash_amount || 0) / 10000000 * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                    </div>
                    <input type="text"
                        data-tooltip-id='ror'
                        value={`${assetDetails.cash_ror ? assetDetails.cash_ror : 0} %`}
                        // autoFocus
                        name='cash_ror'
                        onChange={handleInputChange}
                        className={`${isDisabled.cash_ror && 'opacity-45'} opacity-45 w-[70px]   text-desk-light-blue-2 font-semibold font-Work_Sans input-border-none leading-4 px-4 py-2 md:py-2 rounded-2xl absolute md:static top-0 end-0`}
                        style={{ background: "rgb(62,62,62)" }}
                        disabled
                    />
                </div>


                {/*-------------------------------------------- real Estate -------------------------------------------- */}
                <div className='flex w-full justify-between gap-3 items-baseline relative mb-7'>
                    <div className='flex-grow'>
                        <div className='flex flex-wrap justify-between items-center text-grey-3  gap-4'>
                            <div className='flex gap-2  mt-2' data-tooltip-id='realEstate'>
                                <p className='opacity-45 w-full md:w-auto leading-[40px] md:leading-4 relative max-md:text-sm ps-1'>{"Real Estate"}
                                <span className='text-slate-200 block md:hidden absolute start-[-17px] top-1/2 transform translate-y-[-50%]' ><img src={Premium} alt="premium" /></span>
                                </p>
                            </div>
                            <p className='opacity-45 flex items-center gap-0.5 px-2 py-1 h-9 md:h-auto w-full md:max-w-[138px] border rounded-2xl border-desk-light-blue-2 text-desk-light-blue-2'>
                                <span><CurrencyFinder /></span>
                                <input type="text"
                                    name='real_estate'
                                    onChange={handleInputChange}
                                    value={changeNumbertoComma(assetDetails.real_estate ? assetDetails.real_estate.toString() : "", numerictype)}
                                    // value={NumericFormatConversion(assetDetails.real_estate || 0)}
                                    className='input-border-none  max-md:text-lg bg-transparent w-full md:max-w-[90%] font-semibold'
                                    disabled={true}
                                />
                            </p>
                        </div>
                        <RangeInput
                            className='opacity-45 progress w-full' name="real_estate" value={assetDetails.real_estate || 0}
                            min="0"
                            max="10000000"
                            disabled={true}
                            style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(assetDetails.real_estate || 0) / 10000000 * 100}%, #676767 ${(assetDetails.real_estate || 0) / 10000000 * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                    </div>
                    <input type="text"
                        data-tooltip-id='ror'
                        value={`${assetDetails.real_estate_ror ? assetDetails.real_estate_ror : 0} %`}
                        // autoFocus
                        name='real_estate_ror'
                        onChange={handleInputChange}
                        className={`${isDisabled.real_estate_ror && 'opacity-45'} opacity-45 w-[70px]   text-desk-light-blue-2 font-semibold font-Work_Sans input-border-none leading-4 px-4 py-2 md:py-2 rounded-2xl absolute md:static top-0 end-0`}
                        style={{ background: "rgb(62,62,62)" }}
                        disabled
                    />

                </div>

                {/*-------------------------------------------- gold-------------------------------------------- */}
                <div className='flex w-full justify-between gap-3 items-baseline relative mb-7'>
                    <div className='flex-grow'>
                        <div className='flex flex-wrap justify-between items-center text-grey-3  gap-4'>
                            <div className='flex gap-1 mt-2 ' data-tooltip-id='gold'>
                                <p className='opacity-45 w-full md:w-auto leading-[40px] md:leading-4 relative max-md:text-sm ps-1'>{"Gold"}
                                <span className='text-slate-200 block md:hidden absolute start-[-17px] top-1/2 transform translate-y-[-50%]' ><img src={Premium} alt="premium" /></span>
                                </p>
                            </div>
                            <p className='opacity-45 flex items-center gap-0.5 px-2 py-1 h-9 md:h-auto w-full md:max-w-[138px] border rounded-2xl border-desk-light-blue-2 text-desk-light-blue-2'>
                                <span><CurrencyFinder /></span>
                                <input type="text"
                                    name='gold'
                                    onChange={handleInputChange}
                                    value={changeNumbertoComma(assetDetails.gold ? assetDetails.gold.toString() : "", numerictype)}
                                    // value={NumericFormatConversion(assetDetails.gold || 0)}
                                    className='input-border-none  max-md:text-lg bg-transparent w-full md:max-w-[90%] font-semibold'
                                    disabled={true}
                                />
                            </p>
                        </div>
                        <RangeInput
                            className='opacity-45 progress w-full' name="gold" value={assetDetails.gold || 0}
                            min="0"
                            max="10000000"
                            disabled={true}
                            style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(assetDetails.gold || 0) / 10000000 * 100}%, #676767 ${(assetDetails.gold || 0) / 10000000 * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                    </div>
                    <input type="text"
                        data-tooltip-id='ror'
                        value={`${assetDetails.gold_ror ? assetDetails.gold_ror : 0} %`}
                        // autoFocus
                        name='gold_ror'
                        onChange={handleInputChange}
                        className={`${isDisabled.gold_ror && 'opacity-45'} opacity-45 w-[70px]  text-desk-light-blue-2 font-semibold font-Work_Sans input-border-none leading-4 px-4 py-2 md:py-2 rounded-2xl absolute md:static top-0 end-0`}
                        style={{ background: "rgb(62,62,62)" }}
                        disabled
                    />

                </div>

                  {/*-------------------------------------------- alternatives-------------------------------------------- */}
                  <div className='flex w-full justify-between gap-3 items-baseline relative mb-7'>
                    <div className='flex-grow'>
                        <div className='flex flex-wrap justify-between items-center text-grey-3  gap-4'>
                            <div className='flex gap-1 mt-2' data-tooltip-id='alternatives'>
                                <p className='opacity-45 w-full md:w-auto leading-[40px] md:leading-4 relative max-md:text-sm ps-1'>{"alternative"}
                                <span className='text-slate-200 block md:hidden absolute start-[-17px] top-1/2 transform translate-y-[-50%]' ><img src={Premium} alt="premium" /></span>
                                </p>
                            </div>
                            <p className='opacity-45 flex items-center gap-0.5 px-2 py-1 h-9 md:h-auto w-full md:max-w-[138px] border rounded-2xl border-desk-light-blue-2 text-desk-light-blue-2'>
                                <span><CurrencyFinder /></span>
                                <input type="text"
                                    name='alternative'
                                    onChange={handleInputChange}
                                    value={changeNumbertoComma(assetDetails.gold ? assetDetails.gold.toString() : "", numerictype)}
                                    // value={NumericFormatConversion(assetDetails.gold || 0)}
                                    className='input-border-none max-md:text-lg  bg-transparent w-full md:max-w-[90%] font-semibold'
                                    disabled={true}
                                />
                            </p>
                        </div>
                        <RangeInput
                            className='opacity-45 progress w-full' name="alternative" value={assetDetails.gold || 0}
                            min="0"
                            max="10000000"
                            disabled={true}
                            style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${(assetDetails.gold || 0) / 10000000 * 100}%, #676767 ${(assetDetails.gold || 0) / 10000000 * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                    </div>
                    <input type="text"
                        data-tooltip-id='ror'
                        value={`${assetDetails.gold_ror ? assetDetails.gold_ror : 0} %`}
                        // autoFocus
                        name='alternative_ror'
                        onChange={handleInputChange}
                        className={`${isDisabled.gold_ror && 'opacity-45'} opacity-45 w-[70px]   text-desk-light-blue-2 font-semibold font-Work_Sans input-border-none leading-4 px-4 py-2 md:py-2 rounded-2xl absolute md:static top-0 end-0`}
                        style={{ background: "rgb(62,62,62)" }}
                        disabled
                    />

                </div>
            </>
        )
    }
    
    const DetailedViewRender = () => {
        return (
            <div className='flex flex-col gap-3'>
                {/*-------------------------------------------- equity -------------------------------------------- */}
                <div className='flex w-full justify-between gap-3 items-baseline'>
                    <div className='flex-grow'>
                        <div className='flex flex-wrap justify-between items-center text-grey-3'>
                            <div className='flex gap-1' data-tooltip-id='equity'>
                                <span><img className='text-slate-200' src={Premium} alt="premium_icon" /></span>
                                <p className='whatyouOwn-text'>{"Equity"}
                                    <span className='block md:hidden absolute h-[9px] w-[9px] bg-aqua rounded-full start-[-15px] top-1/2 transform translate-y-[-50%]'></span>
                                </p>
                            </div>
                            <p className='whatyouown-input'>
                                <span><CurrencyFinder /></span>
                                <input type="text"
                                    min={0}
                                    name='equity_amount'
                                    value={changeNumbertoComma(assetDetails.equity_amount.toString() || "", numerictype)}
                                    // value={NumericFormatConversion(assetDetails.equity_amount)}
                                    className=' input-border-none  bg-transparent max-w-[75%] py-1 font-semibold'
                                    onChange={handleInputChange} />
                            </p>
                        </div>
                        <RangeInput
                            className='progress w-full'
                            name="equity_amount"
                            value={assetDetails.equity_amount || 0}
                            min="0"
                            max="10000000"
                            style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(assetDetails.equity_amount || 0) / 10000000 * 100}%, #676767 ${(assetDetails.equity_amount || 0) / 10000000 * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                    </div>
                    <div className='flex items-center gap-1'  data-tooltip-id='ror'>
                        <input type="text"
                            value={`${assetDetails.equity_ror ? assetDetails.equity_ror : 0} %`}
                           
                            // autoFocus
                            onChange={handleInputChange}
                            name='equity_ror'
                            className={`${isDisabled.equity_ror && 'opacity-45'} text-lg w-[70px] border border-desk-light-blue-2 text-desk-light-blue-2 font-semibold font-Work_Sans input-border-none leading-4 px-4 py-2 md:py-2 rounded-2xl absolute md:static top-0 end-0 `}
                            style={{ background: "rgba(220, 220, 220, 0.1)" }}
                            disabled
                        />
                          <IoLockClosed size={'1.4em'} color='#B5B5B5' />
                    </div>
                </div>

                {/* --------------------------------------------bonds--------------------------------------------  */}
                <div className='flex w-full justify-between gap-3 items-baseline'>
                    <div className='flex-grow'>
                        <div className='flex flex-wrap justify-between items-center text-grey-3'>
                            <div className='flex gap-1' data-tooltip-id='bonds'>
                                <span><img className='text-slate-200' src={Premium} alt="premium_icon" /></span>
                                <p className='whatyouOwn-text'>{"Bond"}
                                    <span className='block md:hidden absolute h-[9px] w-[9px] bg-aqua rounded-full start-[-15px] top-1/2 transform translate-y-[-50%]'></span>
                                </p>
                            </div>
                            <p className='whatyouown-input'>
                                <span><CurrencyFinder /></span>
                                <input
                                    type="text"
                                    min={0}
                                    name="bond_amount"
                                    onChange={handleInputChange}
                                    value={changeNumbertoComma(assetDetails.bond_amount.toString() || "", numerictype)}
                                    // value={NumericFormatConversion(assetDetails.bond_amount)}
                                    className='input-border-none bg-transparent max-w-[75%]  font-semibold' />
                            </p>
                        </div>
                        <RangeInput
                            className='progress w-full'
                            name="bond_amount"
                            value={assetDetails.bond_amount || 0}
                            min="0"
                            max="10000000"
                            style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(assetDetails.bond_amount || 0) / 10000000 * 100}%, #676767 ${(assetDetails.bond_amount || 0) / 10000000 * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                    </div>
                    <div className='flex items-center gap-1' data-tooltip-id='ror'>
                        <input type="text"
                            value={`${assetDetails.bond_ror ? assetDetails.bond_ror : 0} %`}
                         
                            // autoFocus
                            onChange={handleInputChange}
                            name='bonds_ror'
                            className={`${isDisabled.bond_ror && 'opacity-45'} w-[70px] text-lg border border-desk-light-blue-2 text-desk-light-blue-2 font-semibold font-Work_Sans input-border-none leading-4 px-4 py-2 md:py-2 rounded-2xl absolute md:static top-0 end-0`}
                            style={{ background: "rgba(220, 220, 220, 0.1)" }}
                            disabled
                        />
                          <IoLockClosed size={'1.4em'} color='#B5B5B5' />
                    </div>
                </div>

                {/*-------------------------------------------- cash -------------------------------------------- */}
                <div className='flex w-full justify-between gap-3 items-baseline'>
                    <div className='flex-grow'>
                        <div className='flex flex-wrap justify-between items-center text-grey-3'>
                            <div className='flex gap-1' data-tooltip-id='cash'>
                                <span><img className='text-slate-200' src={Premium} alt="premium_icon" /></span>
                                <p className='whatyouOwn-text'>{"Cash"}
                                    <span className='block md:hidden absolute h-[9px] w-[9px] bg-aqua rounded-full start-[-15px] top-1/2 transform translate-y-[-50%]'></span>
                                </p>
                            </div>
                            <p className='whatyouown-input'>
                                <span><CurrencyFinder /></span>
                                <input type="text"
                                    name='cash_amount'
                                    onChange={handleInputChange}
                                    value={changeNumbertoComma(assetDetails.cash_amount.toString() || "", numerictype)}
                                    // value={NumericFormatConversion(assetDetails.cash_amount)}
                                    className='input-border-none  bg-transparent w-full md:max-w-[75%] font-semibold'
                                // disabled={true}
                                />
                            </p>
                        </div>
                        <RangeInput
                            className='progress w-full' name="cash_amount" value={assetDetails.cash_amount || 0}
                            min="0"
                            max="10000000"
                            style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(assetDetails.cash_amount || 0) / 10000000 * 100}%, #676767 ${(assetDetails.cash_amount || 0) / 10000000 * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                    </div>
                    <div className='flex items-center gap-1' data-tooltip-id='ror'>
                        <input type="text" 
                            value={`${assetDetails.cash_ror ? assetDetails.cash_ror : 0} %`}
                            // autoFocus
                            name='cash_ror'
                            onChange={handleInputChange}
                            className={`${isDisabled.cash_ror && 'opacity-45'} w-[70px] text-lg  border border-desk-light-blue-2 text-desk-light-blue-2 font-semibold font-Work_Sans input-border-none leading-4 px-4 py-2 md:py-2 rounded-2xl absolute md:static top-0 end-0`}
                            style={{ background: "rgba(220, 220, 220, 0.1)" }}
                            disabled
                        />
                        <IoLockClosed size={'1.4em'} color='#B5B5B5' />
                    </div>
                </div>


                {/*-------------------------------------------- real Estate -------------------------------------------- */}
                <div className='flex w-full justify-between gap-3 items-baseline relative'>
                    <div className='flex-grow'>
                        <div className='flex flex-wrap justify-between items-center text-grey-3'>
                            <div className='flex gap-1' data-tooltip-id='realEstate'>
                                <span className='text-slate-200' ><img src={Premium} alt="premium" /></span>
                                <p className='opacity-45 whatyouOwn-text'>{"Real Estate"}
                                    <span className='block md:hidden absolute h-[9px] w-[9px] bg-aqua rounded-full start-[-15px] top-1/2 transform translate-y-[-50%]'></span>
                                </p>
                            </div>
                            <p className='opacity-45 whatyouown-input'>
                                <span><CurrencyFinder /></span>
                                <div className='flex items-center' data-tooltip-id='upgradeL2'>
                                    <input type="text"
                                        name='real_estate'
                                        onChange={handleInputChange}
                                        value={changeNumbertoComma(assetDetails?.real_estate?.toString() || "", numerictype)}
                                        // value={NumericFormatConversion(assetDetails.real_estate || 0)}
                                        className='input-border-none  bg-transparent w-full md:max-w-[75%] font-semibold'
                                        disabled={true}
                                    />
                                   <IoLockClosed size={'1.4em'} color='#B5B5B5' />
                                </div>
                            </p>
                        </div>
                        <RangeInput
                            className='opacity-45 progress w-full' name="real_estate" value={assetDetails.real_estate || 0}
                            min="0"
                            max="10000000"
                            disabled={true}
                            style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(assetDetails.real_estate || 0) / 10000000 * 100}%, #676767 ${(assetDetails.real_estate || 0) / 10000000 * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                    </div>
                    <div className='flex items-center gap-1' data-tooltip-id='upgradeL2'>
                        <input type="text"
                            value={`${assetDetails.real_estate_ror ? assetDetails.real_estate_ror : 0} %`}
                            // autoFocus
                            name='real_estate_ror'
                            onChange={handleInputChange}
                            className={`${isDisabled.real_estate_ror && 'opacity-45'} text-lg opacity-45 w-[70px]  border border-desk-light-blue-2 text-desk-light-blue-2 font-semibold font-Work_Sans input-border-none leading-4 px-4 py-2 md:py-2 rounded-2xl absolute md:static top-0 end-0`}
                            style={{ background: "rgba(220, 220, 220, 0.1)" }}
                            disabled
                        />
                        <IoLockClosed size={'1.4em'} color='#B5B5B5' />
                    </div>
                </div>

                {/*-------------------------------------------- gold-------------------------------------------- */}
                <div className='flex w-full justify-between gap-3 items-baseline relative'>
                    <div className='flex-grow'>
                        <div className='flex flex-wrap justify-between items-center text-grey-3'>
                            <div className='flex gap-1' data-tooltip-id='gold'>
                                <span><img className='text-slate-200' src={Premium} alt="premium_icon" /></span>
                                <p className='opacity-45 whatyouOwn-text'>{"Gold"}
                                    <span className='block md:hidden absolute h-[9px] w-[9px] bg-aqua rounded-full start-[-15px] top-1/2 transform translate-y-[-50%]'></span>
                                </p>
                            </div>
                            <p className='opacity-45 whatyouown-input'>
                                <span><CurrencyFinder /></span>
                                <div className='flex items-center gap-1' data-tooltip-id='upgradeL2'>
                                    <input type="text"
                                        name='gold'
                                        onChange={handleInputChange}
                                        value={changeNumbertoComma(assetDetails.gold ? assetDetails.gold.toString() : "", numerictype)}
                                        // value={NumericFormatConversion(assetDetails.gold || 0)}
                                        className='input-border-none  bg-transparent w-full md:max-w-[75%] font-semibold'
                                        disabled={true}
                                    />
                                     <IoLockClosed size={'1.4em'} color='#B5B5B5' />
                                </div>
                            </p>
                        </div>
                        <RangeInput
                            className='opacity-45 progress w-full' name="gold" value={assetDetails.gold || 0}
                            min="0"
                            max="10000000"
                            disabled={true}
                            style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(assetDetails.gold || 0) / 10000000 * 100}%, #676767 ${(assetDetails.gold || 0) / 10000000 * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                    </div>
                    <div className='flex items-center gap-1' data-tooltip-id='upgradeL2'>
                        <input type="text"
                            value={`${assetDetails.gold_ror ? assetDetails.gold_ror : 0} %`}
                            // autoFocus
                            name='gold_ror'
                            onChange={handleInputChange}
                            className={`${isDisabled.gold_ror && 'opacity-45'} text-lg opacity-45 w-[70px]  border border-desk-light-blue-2 text-desk-light-blue-2 font-semibold font-Work_Sans input-border-none leading-4 px-4 py-2 md:py-2 rounded-2xl absolute md:static top-0 end-0`}
                            style={{ background: "rgba(220, 220, 220, 0.1)" }}
                            disabled
                        />
                      <IoLockClosed size={'1.4em'} color='#B5B5B5' />
                    </div>

                </div>

                  {/*-------------------------------------------- alternatives-------------------------------------------- */}
                  <div className='flex w-full justify-between gap-3 items-baseline relative'>
                    <div className='flex-grow'>
                        <div className='flex flex-wrap justify-between items-center text-grey-3'>
                            <div className='flex gap-1' data-tooltip-id='alternatives'>
                                <span><img className='text-slate-200' src={Premium} alt="premium_icon" /></span>
                                <p className='opacity-45 whatyouOwn-text'>{"alternative"}
                                    <span className='block md:hidden absolute h-[9px] w-[9px] bg-aqua rounded-full start-[-15px] top-1/2 transform translate-y-[-50%]'></span>
                                </p>
                            </div>
                            <p className='opacity-45 whatyouown-input'>
                                <span><CurrencyFinder /></span>
                                <div className='flex items-center gap-1'>
                                    <input type="text"
                                        name='alternative'
                                        data-tooltip-id='upgradeL2'
                                        onChange={handleInputChange}
                                        value={changeNumbertoComma(assetDetails.gold ? assetDetails.gold.toString() : "", numerictype)}
                                        // value={NumericFormatConversion(assetDetails.gold || 0)}
                                        className='input-border-none  bg-transparent w-full md:max-w-[75%] font-semibold'
                                        disabled={true}
                                    />
                                    <IoLockClosed size={'1.4em'} color='#B5B5B5' />
                                </div>
                            </p>
                        </div>
                        <RangeInput
                            className='opacity-45 progress w-full' name="alternative" value={assetDetails.gold || 0}
                            min="0"
                            max="10000000"
                            disabled={true}
                            style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(assetDetails.gold || 0) / 10000000 * 100}%, #676767 ${(assetDetails.gold || 0) / 10000000 * 100}%, #676767 100%)` }}
                            onChange={handleInputChange} />
                    </div>
                    <div className='flex items-center gap-1'>
                        <div className='flex items-center gap-1' data-tooltip-id='upgradeL2'>
                            <input type="text"
                                value={`${assetDetails.gold_ror ? assetDetails.gold_ror : 0} %`}
                                // autoFocus
                                name='alternative_ror'
                                onChange={handleInputChange}
                                className={`${isDisabled.gold_ror && 'opacity-45'} text-lg opacity-45 w-[70px]  border border-desk-light-blue-2 text-desk-light-blue-2 font-semibold font-Work_Sans input-border-none leading-4 px-4 py-2 md:py-2 rounded-2xl absolute md:static top-0 end-0`}
                                style={{ background: "rgba(220, 220, 220, 0.1)" }}
                                disabled
                            />
                            <IoLockClosed size={'1.4em'} color='#B5B5B5' />
                        </div>

                    </div>

                </div>
            </div>
        )
    }

    const AssetInvestmentMessage=({type, LabelMessage,percentMessage})=>{
        console.log(percentMessage);
      return Boolean(LabelMessage)?(
          <ul className='list-disc p-2 text-left'>
              {LabelMessage.map(list => (
                  <li key={list}>{list}</li>
              ))}
          </ul>
      ):(
        <div className='w-52 text-left'>
            {percentMessage}
        </div>
      )
    }

    const tooltipArray = [
        {
            id: 1,
            tooltipId: 'equity',
            message: <AssetInvestmentMessage type={'equity'} LabelMessage={["Stocks", "Equity Funds", "ESOPs", "etc."]}/>
        },{
            id: 2,
            tooltipId: 'bonds',
            message:  <AssetInvestmentMessage type={'bonds'} LabelMessage={["Pension Accounts", "Interest earning Deposits", "Debt Funds", " etc."]}/>
        },{
            id: 3,
            tooltipId: 'cash',
            message:  <AssetInvestmentMessage type={'cash'}  LabelMessage={["Bank Accounts", "Liquid funds", "Cash in Hand", "etc."]}/>
        },{
            id: 4,
            tooltipId: 'realEstate',
            message:  <AssetInvestmentMessage type={'realEstate'}  LabelMessage={[" Plots", "commercial", "Residential (Other than own house)"]}/>
        },{
            id: 5,
            tooltipId: 'gold',
            message:  <AssetInvestmentMessage type={'gold'}  LabelMessage={["Physical gold", "coins", "Gold bonds"]}/>
        },
        {
            id: 6,
            tooltipId: 'alternatives',
            message:  <AssetInvestmentMessage type={'alternatives'}  LabelMessage={[" Private Equity", "StartUp Investments", "Alternate Lending, etc"]}/>
        },
        {
            id: 7,
            tooltipId: 'ror',
            message:  <AssetInvestmentMessage type={'ror'}  percentMessage={"Let’s work with these rates for now.You can change them later!"}/>
        },
        {
            id: 8,
            tooltipId: 'upgradeL2',
            message:  <AssetInvestmentMessage type={'upgradeL2'}  percentMessage={"Upgrade to Level 2"}/>
        },
    ]

    return (
        <MoneyCard subheading={`${isMobile ? `What You`:''}`}  heading={ `${isMobile ? 'OWN' :"What You OWN"}`} Icon={Networth_icon} amount={changeNumbertoComma(allData?.lead_invested_value_data?.total_invested_value, numerictype)} style={{ background: "#B4DAF6" }}>
            <div className={`py-8 px-14 max-md:px-11 lg:pt-[22rem] md:pt-[15rem]  max-md:pt-[27rem] flex flex-col lg:gap-6 max-md:gap-0 justify-center  h-60 scrollbar-hide overflow-y-auto ${isMobile && 'border-2 rounded-b-xl border-solid shadow-2xl border-aqua'}`}>
                {/* <RowInputs inputName={"cash"} /> */}
                {/* cash  */}
                {/* {allData?.lead_invested_value_data?.is_lumsum == false ?
                    <DetailedViewRender/>
                    :
                   <LumpsumRender/>
                } */}
                 {isMobile?DetailedMobileViewRender():DetailedViewRender()}
                 {tooltipArray?.map((tip) => (
                    <div key={tip?.tooltipId}>
                        <Tooltip 
                            id={tip?.tooltipId} 
                            backgroundColor={'#232E41'} 
                            message={tip?.message}
                            opacity={1}
                            position='top'
                        />  
                    </div>
                 ))}
                 {/* <Tooltip id={'ror'} backgroundColor={'#3C566E '} message="Upgrade to Next Level" position='top'/>   */}
                 {/* <Tooltip id={'assetsInfo'} backgroundColor={'#3C566E '} message="real estate" position='top'/>   */}
                {/* <RowInputs inputName={"Real Estate"} />
                <RowInputs inputName={"Gold"} /> */}
            </div>
        </MoneyCard>
    )
}

export default WhatYouOwn


// useEffect(() =>{
    //     console.log('here vali');
    //     let temp = {...allData?.lead_invested_value_data}; 
    //     let updatedConverted = [...allData?.lead_invested_value_data?.investmentdata]
       
    //     let investmentdata = updatedConverted.map((asset) => {
    //         if((assetDetails?.equity_amount <= 0) && (assetDetails?.bond_amount <= 0) && (assetDetails?.cash_amount <= 0)){  
    //             return {...asset, cash_amount: NumericBaseFormatConversion(temp['total_invested_value'])}
    //         }
    //         return asset;
    //     });
    //     const assetsUpdated = {...temp, investmentdata}
    //     dispatch(all_level_1_data({ lead_invested_value_data: assetsUpdated }))
    // },[]);


      // useEffect(()=>{
    //     let temp = {...allData?.lead_invested_value_data}; 
    //     let updatedConverted = [...allData?.lead_invested_value_data?.investmentdata]

    //     let  assetDetails = {
    //         equity_amount: updatedConverted[0]?.equity_amount || 0,
    //         bond_amount: updatedConverted[1]?.bond_amount || 0,
    //         cash_amount: updatedConverted[2]?.cash_amount || 0,
    //     }
       
    //     const newAssets =  updatedConverted.map((assets) =>{
    //         if((assetDetails?.equity_amount <= 0) && (assetDetails?.bond_amount <= 0) && (assetDetails?.cash_amount <= 0)){
    //             if(assets['cash_amount'] <= 0){
    //                 return {...assets, cash_amount: NumericBaseFormatConversion(temp['total_invested_value'])}
    //             }else{
    //                 return assets;  
    //             }
    //         }else{
    //             if(assets['equity_amount']){
    //                 return {...assets, equity_amount: NumericBaseFormatConversion(assets['equity_amount'])}
    //             }else if(assets['bond_amount']){
    //                 return {...assets, bond_amount: NumericBaseFormatConversion(assets['bond_amount'])}
    //             }else if(assets['cash_amount']){
    //                 return {...assets, cash_amount: NumericBaseFormatConversion(assets['cash_amount'])}
    //             }else {
    //                 return assets;
    //             }
    //         }
            
    //     });

    //     const TotalInvested = ()=>{
    //         if(!updatedConverted[0]['equity_amount'] && !updatedConverted[1]['bond_amount'] && !updatedConverted[2]['cash_amount']){
    //             return  temp['total_invested_value']
    //         }else{
    //             return  parseFloat(NumericBaseFormatConversion(updatedConverted[0]['equity_amount'])) + parseFloat(NumericBaseFormatConversion(updatedConverted[1]['bond_amount'])) + parseFloat(NumericBaseFormatConversion(updatedConverted[2]['cash_amount']))
    //         }
    //     }

    //     temp['total_invested_value'] = TotalInvested();
    //     const assetsUpdated = {...temp, investmentdata: newAssets}
    //     dispatch(all_level_1_data({ lead_invested_value_data: assetsUpdated }))

    // },[numerictype]);
