import React from 'react'
import Progress_meter from '../../components/Progress-meter/Progress_meter'
import RoundedBtn from '../../components/RoundedBtn'
import Filter_btn from '../../components/Filter_btn'
import { NumericSummaryConversion } from '../../numericalFormatConversion/NumericFormatConversion'
import { formatNumberInCrores } from '../../Variable'
import { convertToIndianNumberingSystem } from '../../calculations/Index'
import { useSelector } from 'react-redux'
import ResultCards from '../../components/ResultCards'

const ResultMoneyMatterCardsMobile = ({isMobile,moneyPathIndex, setRevealData, ActivateMyPowerPopUp, viewInsightHandler}) => {

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

    const handleOpenModal = () => {
        // setShowFinacialeModal(true); 
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
        }
    ]

  return (
      <div className={`md:px-10  md:hidden p-2`}>
          <div className={` flex flex-col gap-4 lg:gap-2 max-md:text-center ${(moneyPathIndex == 2 || moneyPathIndex == 0) && 'opacity-45'}`}>
              {resultCardDetails.map(list => {
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
                          />
                      </div>
                  )
              })}
          </div>
          <div className='md:px-10 mt-9 '>
              <div className="flex-[1] flex flex-col  justify-between gap-3 max-w-[25rem]  md:m-auto  mt-5 max-md:m-auto">
                  {isMobile && (
                      <div className={`flex-1 flex items-center justify-center rounded-[15px] md:rounded-[30px] card-shadow  relative md:p-0 py-3 px-9 ${(moneyPathIndex == 2 || moneyPathIndex == 1 || moneyPathIndex == 0) && 'opacity-45'}`}
                          style={{ backgroundImage: 'linear-gradient(180deg, rgba(154, 154, 154, 0.20) 0.49%, rgba(154, 154, 154, 0.10) 99.66%)', }}
                      // onClick={() => setPercentatge(pre => pre + 1)}
                      >
                          <Progress_meter percent={Math.round(financialFreedom?.firestatus)} />

                      </div>
                  )}
                  <div id='myPowerbtn' className={`flex flex-col md:flex-row gap-3 justify-center items-center mb-10 ${(moneyPathIndex == 1 || moneyPathIndex == 0) && 'opacity-45'}`}>
                      <RoundedBtn label={'View myInsights'}
                          onClick={() => viewInsightHandler()}
                          className={`${(moneyPathIndex == 2) && 'opacity-45'}`}
                      />

                      <Filter_btn path={'result'} reveal onClick={() => ActivateMyPowerPopUp()} moneyPathIndex={moneyPathIndex} />
                  </div>
              </div>
          </div>

      </div>
  )
}

export default ResultMoneyMatterCardsMobile
