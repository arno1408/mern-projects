import React, { Children, useState } from 'react'
import { useSelector } from 'react-redux';
import { NumericSummaryConversion } from '../../../../numericalFormatConversion/NumericFormatConversion';
import { CurrencyFinder, changeNumbertoComma, formatNumberInCrores } from '../../../../Variable';
import { convertToIndianNumberingSystem } from '../../../../calculations/Index';
import ResultCards from '../../../../components/ResultCards';
import { money, lock } from '../../../../assets/Icons';
import Progress_meter from '../../../../components/Progress-meter/Progress_meter';
import RoundedBtn from '../../../../components/RoundedBtn';
import Filter_btn from '../../../../components/Filter_btn'; 

const MoneyMatterSection = ({changeBottomSection, ChangeSection, backgroundImage, boderColor}) => {
    const [revealData, setRevealData] = useState(null);
    let financialDetails = useSelector((state) => state?.financialFreedomData)
    const financialFreedom = financialDetails?.financialfreedom;
    const numerictype = useSelector(state => state?.statistical_Data?.numerical_format);
    let result_chart_data = useSelector((state) => state?.level_1_data?.result_chart_data)
   
      
    const handleFilterClick = (list) => {
        changeBottomSection(list.id)
    }

    const fetchRevealData=(data)=>{
        if(data){
            setRevealData(data)
        }
    }

    let result = null;
    let subValues = null;
    if (result_chart_data) {
        const {cashflowFetched, financialFreedomFetched, goalFetched, loanFetched, networthFetched
        } = result_chart_data;
        const { retireNow, financial_freedom_age, fireAmount, fundsExhaustAtAge, inherit,
            present_value_inherit, retire_sum, present_value_at_retire, insurance_required
            , currentNetworth, portfolio_return, intialAssets, firestatus, savingsToIncome, emiTOIncome
            , enough_money_for_all_goals } = financialFreedomFetched;
        const newResult = {
            calculated_goals: goalFetched,
            calculated_loan: loanFetched,
            cashflowdetail: cashflowFetched,
            financialfreedom: {
                retireNow: retireNow,
                financialFreedomAge: financial_freedom_age,
                fireAmount: fireAmount,
                fundsExhaustAtAge: fundsExhaustAtAge,
                inherit:inherit,
                presentValueInherit: present_value_inherit,
                retireSum: retire_sum,
                presentValueAtRetire:present_value_at_retire,
                insuranceRequired: insurance_required,
                intialAssets: intialAssets,
                currentNetworth: currentNetworth,
                portfolioReturn: portfolio_return,
                firestatus,
                savingsToIncome,
                emiTOIncome,
                enough_money_for_all_goals
            },
            networth: networthFetched
        }
        result = newResult.financialfreedom;
        subValues = newResult;
    } else {
        result = financialFreedom;
        subValues = financialDetails;
    }


    const resultCardDetails = [
        {
            id: 1,
            revealId: 1,
            // className:'bg-[#a1fbf6]',
            style:{backgroundColor:'#a1fbf6'},
            label:'Enough Money for all goals?',
            value:result?.enough_money_for_all_goals?'YES!':'NO',
            subValue:"",
            revealStatus: true,
            fetchRevealData:fetchRevealData,
            summaryInformation:{
                subValueTitle:'Plan Till Age',
                subValue1:subValues?.cashflowdetail?.livingAge,
                subValueTitle2:(
                    <div className='flex items-center justify-center'>
                       Money Runs  <br/>
                       out @ Age 
                    </div>
                ),
                subValue2:subValues?.financialfreedom?.fundsExhaustAtAge,
                className: 'bg-slate-600 flex justify-between'
            }
        },
        {
            id: 2,
            revealId: 2,
            // className:'bg-[#bcfbe4]',
            style:{backgroundColor:'#bcfbe4'},
            label:'FIRE Amount Required Today',
            value:numerictype == 'millions'? NumericSummaryConversion(result?.fireAmount,'',numerictype)  :formatNumberInCrores(result?.fireAmount),
            subValue:numerictype == 'millions'? 'M' :convertToIndianNumberingSystem(result?.fireAmount)[0]?.str,
            revealStatus: true,
            fetchRevealData:fetchRevealData,
            summaryInformation:{
                subValueTitle:'FIRE Status completed',
                subValue1:`${subValues?.financialfreedom?.firestatus}%`,
                subValueTitle2:'',
                subValue2:'',
                className: 'bg-slate-600 flex justify-between'
            }
        },
        {
            id: 3,
            revealId: 3,
            // className:'bg-[#b4daf6]',
            style:{backgroundColor:'#b4daf6'},
            label:'Portfolio at Retirement',
            value:numerictype == 'millions'? NumericSummaryConversion(result?.retireSum,'',numerictype)  :formatNumberInCrores(result?.retireSum),
            subValue:numerictype == 'millions'? 'M' :convertToIndianNumberingSystem(result?.retireSum)[0]?.str,
            revealStatus: true,
            fetchRevealData:fetchRevealData,
            summaryInformation:{
                subValueTitle:'Today’s Value',
                subValue1: (
                    <div className='flex items-center justify-center'>
                        <CurrencyFinder />
                        {changeNumbertoComma(Math.round(subValues?.financialfreedom?.presentValueAtRetire), numerictype)}
                    </div>
                ),
                subValueTitle2:'',
                subValue2:'',
                className: 'bg-slate-600 flex justify-between'
            }
        },
        {
            id: 4,
            revealId: 4,
            // className:'bg-[#b0c3f5]',
            style:{backgroundColor:'#b0c3f5'},
            label:'Likely Inheritance',
            value:result?.inherit > 0?'YES':"NO",
            subValue:"",
            revealStatus: true,
            fetchRevealData:fetchRevealData,
            summaryInformation:{
                subValueTitle:`Portfolio @ Age ${subValues?.cashflowdetail?.livingAge}`,
                subValue1:(
                    <div className='flex items-center justify-center'>
                       <img data-tooltip-id="lock" src={lock} alt="" />
                    </div>
                ),
                subValueTitle2:'',
                subValue2:'',
                className: 'bg-slate-600 flex justify-between'
            }
        }
    ]

    return (
        <div className="MoneyMatterSection-container">
            <div className="MoneyMatterSection-subContainer">
            {resultCardDetails.map(list =>{
                return (  
                <div key={list.id}>
                    <ResultCards
                        revealId={list.revealId}
                        fetchRevealData={list.fetchRevealData}
                        className={list.className}
                        label={list.label}
                        style={list.style}
                        value={list.value}
                        subValue={list.subValue}
                        revealStatus={list.revealStatus}
                        summaryInformation={list.summaryInformation}
                    />
                </div>
            )})}
                
            </div>
            <div className="MoneyMatterSection-progressmeter">
                <div className='flex items-center gap-3 max-md:hidden'>
                    <img src={money} alt="money matter logo w-7" />
                    <h4 className="money_matter">Money Matters</h4>
                </div>
                <div className="ProgressMeter_Container card-shadow "
                    style={{ backgroundImage: backgroundImage, border: boderColor }}
                // onClick={() => setPercentatge(pre => pre + 1)}
                >
                    <Progress_meter percent={result?.firestatus && Math.round(result?.firestatus)} />
                </div>

                <div className="flex gap-3 justify-center items-center max-md:flex-col max-md:gap-2">
                    <RoundedBtn label={'Show All Insights'}
                        onClick={() => ChangeSection(3)}
                    />
                    <Filter_btn path={'myPower'} onHoverClick={handleFilterClick} />
                </div>
            </div>
        </div>
    )
}

export default MoneyMatterSection
