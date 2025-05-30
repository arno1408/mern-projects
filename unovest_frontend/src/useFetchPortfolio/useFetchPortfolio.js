import { useEffect, useState } from "react";
import { goalWorks } from "../calculations/GoalWork";
import { newLoanWorks } from "../calculations/LoanWorks";
import { networth } from "../calculations/Networth";
import { cashFlowDetails } from "../calculations/CashFlowDetails";
import { financialFreedom } from "../calculations/FinancialFreedom";
import { useDispatch, useSelector } from "react-redux";
import { all_level_1_data } from "../redux/slices/Level_1_all_data";

//---------------------created custom hook for dynamically change the financial freedom parameters------------//
const useFetchPortfolio = (...dependencies) => {

    const [goalDetails,setGoalDetails] =  useState({
        getGoalWork: null,
        getLoanWork: null,
        getCashFlow: null,
        getNetworth: null,
        getFinancialFreedom: null
    });
    const dispatch = useDispatch();
    let allData = useSelector((state) => state?.level_1_data);
    let assetData = allData?.lead_invested_value_data?.investmentdata
    const updatedAssets = assetData?.map(ele =>{
        return {
            // weightage:(ele[Object.keys(ele)[0]] / networth(assetData, loanData).totalAssets) * 100,
            asset_name: Object.keys(ele)[0] == 'equity_amount'? 'equity': Object.keys(ele)[0] == 'bond_amount'? 'bonds':'cash', 
            rate_of_return: +ele[Object.keys(ele)[1]], 
            asset_amount: +ele[Object.keys(ele)[0]]
        }
    })
    
    useEffect(()=>{
        let goalData = allData?.user_goal_data;
        let currentAge = allData?.profile_data?.current_age;
        let livingAge = allData?.profile_data?.living_age;
        let avgInflation = allData?.expenses_data?.average_inflation;
        let loanData = allData?.loan_data;
        let assetData = allData?.lead_invested_value_data?.investmentdata
        let otherInputs = {
            currentAge: currentAge,
            retirementAge: allData?.profile_data?.work_till_age,
            livingAge: livingAge,
            currentIncome: allData?.lead_annual_income_data?.total_annual_income,
            incomeGrowthRate: allData?.lead_annual_income_data?.average_growth_rate,
            currentExpense: allData?.expenses_data?.yearly_expenses?allData?.expenses_data?.yearly_expenses: (Number(allData?.expenses_data?.fixed_expenses_per_year))+(Number(allData?.expenses_data?.variable_expenses_per_year)),
            inflation: allData?.expenses_data?.average_inflation,
            equityRate: allData?.lead_invested_value_data?.investmentdata?.find(ele => ele.equity_ror >= 0).equity_ror,
            bondRate: allData?.lead_invested_value_data?.investmentdata?.find(ele => ele.bonds_ror >= 0).bonds_ror,
            cashRate: allData?.lead_invested_value_data?.investmentdata?.find(ele => ele.cash_ror >= 0).cash_ror,
            post_retirement_expense_reduce_by: allData?.post_retirement_data?.reduse_expenses_by,
            withdrawal_rate: allData?.post_retirement_data?.withdrawal_rate || 4,
            useWithdrawalRate: 'No',
            post_retirement_inflation: allData?.expenses_data?.average_inflation
        }
        
        let goalFetched = goalWorks(goalData,currentAge,livingAge,avgInflation)
        let loanFetched = newLoanWorks(loanData)
       
        let networthFetched = networth(updatedAssets,loanData)
        let cashflowFetched = cashFlowDetails(loanFetched,updatedAssets,goalFetched,otherInputs,updatedAssets,loanData);
        let financialFreedomFetched = financialFreedom(cashFlowDetails(loanFetched,assetData,goalFetched,otherInputs,updatedAssets,loanData));
      
        setGoalDetails({
            ...goalDetails,
            goalFetched,
            loanFetched,
            networthFetched,
            cashflowFetched,
            financialFreedomFetched
        });

        let fetchedData = { 
            goalFetched,
            loanFetched,
            networthFetched,
            cashflowFetched,
            financialFreedomFetched
          }

        dispatch(all_level_1_data({ result_chart_data: fetchedData }));

    },dependencies);
 
    return {result_chart_data: goalDetails}
}

export default useFetchPortfolio

