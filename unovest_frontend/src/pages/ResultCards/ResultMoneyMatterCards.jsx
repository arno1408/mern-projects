import React from 'react'
import { NumericSummaryConversion } from '../../numericalFormatConversion/NumericFormatConversion'
import { convertToIndianNumberingSystem } from '../../calculations/Index'
import { CurrencyFinder, changeNumbertoComma, formatNumberInCrores } from '../../Variable'
import ResultCards from '../../components/ResultCards'
import Progress_meter from '../../components/Progress-meter/Progress_meter'
import RoundedBtn from '../../components/RoundedBtn'
import Filter_btn from '../../components/Filter_btn'
import MyPowerActivateInfo from '../../popup/MyPowerActivateInfo'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { lock, money } from '../../assets/Icons'

const ResultMoneyMatterCards = ({moneyPathIndex,setRevealData,ActivateMyPowerPopUp,isMobile, showFinacialeModal, setShowFinacialeModal }) => {
    const navigate = useNavigate();

    let financialDetails = useSelector((state) => state?.financialFreedomData)
    const financialFreedom = financialDetails?.financialfreedom;
    const numerictype = useSelector(state => state?.statistical_Data?.numerical_format);
    let result_chart_data = useSelector((state) => state?.level_1_data?.result_chart_data)


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

    //------open modal (Activate my power through Filter)---------// 
    const handleOpenModal = () => {
        // setShowFinacialeModal(true); 
    };

      //------close modal---------// 
      const handleCloseModal = () => {
        setShowFinacialeModal(false);
    };

       //------get values through callback when card flip---------// 
       const fetchRevealData=(data)=>{
        if(data){
            setRevealData(data)
        }
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
    <div className={` level1-card`}>
    <div className={`level1-card-contain ${(moneyPathIndex == 2 || moneyPathIndex == 0) && 'opacity-45'}`}>
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
    <div className="flex-[1] flex flex-col  justify-between gap-3 max-w-[25rem]  md:m-auto  md:mt-5">
        <div className={`flex items-center gap-3 ${(moneyPathIndex == 2 || moneyPathIndex == 0) && 'opacity-45'}`}>
            <img src={money} alt="money matter logo w-7" />
            <h4 className="money_matter">Money Matters</h4>
        </div>

        {isMobile === false && (
            <div className={`flex-1 flex items-center justify-center md:py-4 rounded-[30px]  max-md:hidden card-shadow ${(moneyPathIndex == 2 || moneyPathIndex == 1 || moneyPathIndex == 0) && 'opacity-45'}`}
                style={{ backgroundImage: 'radial-gradient(1323.55% 390.21% at 116.51% 142.46%, #9891AD 0%, #538096 22.18%, #3C566E 37.68%, #131529 94.3%)', }}
            // onClick={() => setPercentatge(pre => pre + 1)}
            >
                <Progress_meter percent={Math.round(financialFreedom?.firestatus)} moneyPathIndex={moneyPathIndex} />

            </div>
        )}

        <div className={`flex gap-3 justify-center items-center ${(moneyPathIndex == 0||moneyPathIndex == 1) && 'opacity-45'}`}>
            <RoundedBtn label={'Show All Insights'}
                onClick={() => { navigate('insides') }}
                className={`${(moneyPathIndex == 2) && 'opacity-45'}`}
            />
            <Filter_btn path={'result'} onClick={() => handleOpenModal()} moneyPathIndex={moneyPathIndex} />
            {showFinacialeModal && <MyPowerActivateInfo ActivateMyPowerPopUp={ActivateMyPowerPopUp} onClose={() => handleCloseModal()} />}

        </div>
    </div>
</div>
  )
}

export default ResultMoneyMatterCards
