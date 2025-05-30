import { useSelector } from "react-redux"
import { NumericUnit, changeNumbertoComma, formatNumberWithCommas } from "../Variable"
import { lock } from "../assets/Icons"
import { CurrencyData } from "../constants"
import FinancialFreedomCard from "./FinancialFreedomCard"
import Insights_icon from "./my-power/sidebar-icons/Insights_icon"
import Tooltip from "./tooltip/Tooltip"
import { NumericFormatConversion } from "../numericalFormatConversion/NumericFormatConversion"
import { FaDollarSign, FaIndianRupeeSign } from "react-icons/fa6"


const Insides_cards = ({ data }) => {
    const allmodels = useSelector(state => state?.Card_inputs);
    const level_1_data = useSelector(state => state?.level_1_data);
    const numerictype = useSelector(state => state?.statistical_Data?.numerical_format)
    let result_chart_data = useSelector((state) => state?.level_1_data?.result_chart_data)

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

    let result = null;
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
        result = newResult;
    } else {
        result = data;
    }
    

    return (
        <div>
            <div className="flex items-center justify-center gap-3 lg:mb-[23px] md:mb-4">
                <span className="hidden md:block">
                    <Insights_icon stroke="#B7C3D8" />
                </span>
                <p className="insides-heading">Insights</p>
            </div>


            <div className=' flex gap-x-5 lg:gap-x-7 gap-y-6 flex-wrap justify-center'>
                <FinancialFreedomCard style={{ background: "#B4DAF6" }}
                    heading={"Enough Money for all goals?"}>
                    <div className='flex flex-col md:gap-3'>
                        <p className={`${result?.financialfreedom?.enough_money_for_all_goals? 'text-emerald-300':'text-orange'} textFontextrabold`}>{result?.financialfreedom?.enough_money_for_all_goals?"YES":"NO"}</p>
                        <div className='flex gap-[33px] justify-around'>
                            <div>
                                <p className="finacialCardHeading pt-3 md:pt-0">Plan Till Age</p>
                                <p className="finacialCardSubHeading">{result?.cashflowdetail?.livingAge}</p>
                            </div>
                            <div>
                                <p className="finacialCardHeading leading-[18.48px] md:leading-snug">Money Runs <br /> out @ Age</p>
                                <p className="finacialCardSubHeading">{result?.financialfreedom?.fundsExhaustAtAge}</p>
                            </div>
                        </div>
                    </div>
                </FinancialFreedomCard>
                <FinancialFreedomCard style={{ background: "#A0D3F8" }}
                    heading={"Current Portfolio"}>
                    <div className='flex flex-col md:gap-3'>
                        <p className='currencyfinder'><CurrencyFinder/> {changeNumbertoComma(Math.round(result?.financialfreedom?.currentNetworth),'',numerictype)} <NumericUnit numerictype={numerictype}/></p>
                        <div className='flex gap-[33px] justify-around'>
                            <div>
                                <p className="finacialCardHeading">Current Age</p>
                                <p className="finacialCardSubHeading">{result?.cashflowdetail?.currentAge}</p>
                            </div>
                            <div>
                                <p className="finacialCardHeading leading-[18.48px]">Work Till Age</p>
                                <p className="finacialCardSubHeading">{result?.cashflowdetail?.retirementAge}</p>
                            </div>
                        </div>
                    </div>
                </FinancialFreedomCard>
                <FinancialFreedomCard style={{ background: "#A1FBF6" }}
                    heading={"FIRE AMOUNT REQUIRED TODAY"}>
                    <div className='flex flex-col md:gap-3'>
                        <p className='currencyfinder'><CurrencyFinder/> {changeNumbertoComma(Math.round(result?.financialfreedom?.fireAmount),numerictype)} <NumericUnit numerictype={numerictype}/></p>
                        <div className='flex gap-[33px] justify-around'>
                            <div>
                                <p className="finacialCardHeading">FIRE Status completed</p>
                                <p className="finacialCardSubHeading">{Math.round(result?.financialfreedom?.firestatus?.toFixed(0))}%</p>
                            </div>
                        </div>
                    </div>
                </FinancialFreedomCard>
                <FinancialFreedomCard style={{ background: "#B0C3F5" }}
                    heading={"Portfolio at Retirement"}>
                    <div className='flex flex-col md:gap-3'>
                        <p className='currencyfinder'><CurrencyFinder/> {changeNumbertoComma(Math.round(result?.financialfreedom?.retireSum),numerictype)}  <NumericUnit numerictype={numerictype}/></p>
                        <div className='flex gap-[33px] justify-around'>
                            <div>
                                <p className="finacialCardHeading">Today’s Value</p>
                                <p className="finacialCardSubHeading flex items-center justify-center"><CurrencyFinder/> {changeNumbertoComma(Math.round(result?.financialfreedom?.presentValueAtRetire),numerictype)}  <NumericUnit numerictype={numerictype}/></p>
                            </div>
                        </div>
                    </div>
                </FinancialFreedomCard>
                <FinancialFreedomCard style={{ background: "#CAECFF" }}
                    heading={"Likely inheritance"}>
                    <div className='flex flex-col md:gap-3'>
                        <p className={`${result?.financialfreedom?.inherit>0? 'text-emerald-300':'text-orange'} textFontextrabold`}>{result?.financialfreedom?.inherit>0?'YES':'NO'}</p>
                        <div className='flex gap-[33px] justify-around'>
                            <div>
                                <p className="finacialCardHeading">{`Portfolio @ Age ${result?.cashflowdetail?.livingAge}`} </p>
                            </div>
                        </div>
                        <p className="finacialCardHeading flex items-center justify-center"><img data-tooltip-id="lock" src={lock} alt="" /></p>
                    </div>
                    <Tooltip 
                    id={'lock'}
                    backgroundColor={'#232E41 '}
                    message="Upgrade to Next Level"
                    opacity={1}
                    />
                </FinancialFreedomCard>
                <FinancialFreedomCard style={{ background: "#B4DAF6" }}
                    heading={"LIFE INSURANCE REQUIRED"}>
                    <div className=''>
                        <p className='currencyfinder p-1'><CurrencyFinder/>{level_1_data?.profile_data?.any_financial_dependents == 'true'? changeNumbertoComma(Math.round(result?.financialfreedom?.insuranceRequired),numerictype): 0}  <NumericUnit numerictype={numerictype}/></p>
                        <div className='flex items-center gap-[33px] justify-around'>
                            <div>
                                <p className="finacialCardHeading">To fulfill all goals & expenses</p>
                            </div>
                        </div>
                    </div>
                </FinancialFreedomCard>
            </div>
        </div>
    )
}

export default Insides_cards
