import { cashFlowDetails } from "./CashFlowDetails";

export function financialFreedom(cashflow) {
    // const data = cashFlowDetails();
    const data = cashflow;
    // const [cashFlowData, inflation, growthRate, totalYears, retirementAge, livingAge, ffData, currentAge, data.inflation2] = data;
    const currentNetworth = data?.cashFlowDetails[0]?.open_networth;
    const intialAssets =  data?.cashFlowDetails[0]?.open_assets    ;
    const income =  data?.cashFlowDetails[0]?.income;
    const expensePreRetirement =  data?.cashFlowDetails[0]?.expensePreRetirement;
    const expensePostRetirement =  data?.cashFlowDetails[0]?.expensePostRetirement;
    const loanRepayments =  data?.cashFlowDetails[0]?.loanRepayments;
    const cashOutflows = [];
    const portfolio = [];
    const financial_freedom_array = [];
    data.cashFlowDetails.forEach((row, index) => {
        cashOutflows.push(row.totalOutflow);
        portfolio.push(row.closingAssets);
    });

    let fireAmount = 0;
    let present_value_sum_array = [];
    let diffData = [];
    var arr = [];
    //loop for getting total sum_of_present_value values every year for future years
    for (let count = 0; count < data.totalYears; count++) {
        // remove first total outflow value of the array as we need pv for future years
        cashOutflows.shift();

        let sum_of_present_value = cashOutflows.reduce((sum, outflow, i) => sum + outflow / Math.pow(1 + data.portfolio_return, i + 1), 0);
    
        present_value_sum_array.push(sum_of_present_value);
        const diff = portfolio[count] - sum_of_present_value;
        diffData.push(diff);

        const age = data.cashFlowDetails[count].age;

        if (diff > 0) {
            financial_freedom_array.push(age);
        }
      
    }
    // THE BIG QUESTIONS ANSWERED

    // FIRE amount required today? -->Another way to determine FIRE Amount is to discount pre and post retire expenses with their respective inflatoin rates and then add total goal amounts (which in any csae is current value)

    fireAmount = present_value_sum_array[0];

    // Already Financially Free?
    const retireNow = portfolio[0] >= fireAmount ? "YES" : "NO";

    // Age of financial freedom?
    const financial_freedom_age = financial_freedom_array.length > 0 ? financial_freedom_array[0] : "?";

    // Till what age do the funds last?
    const fundsExhaustAtAge = data.financial_freedom_data.length > 0 ? data.financial_freedom_data[0] : "NEVER";

    // Life insurance cover required
    const insurance_required = diffData[0] < 0 ? Math.abs(diffData[0]) : 0;

    // Will I leave an inheritance?
    const inherit = portfolio[data.totalYears - 1];
    const present_value_inherit = inherit / Math.pow(1 + data.inflation, data.totalYears - 1);

    // portfolio at retirement age
    const retire_sum = portfolio[data.retirementAge - data.currentAge];
    const present_value_at_retire = retire_sum / Math.pow(1 + data.inflation, data.retirementAge - data.currentAge);

    const outputs = {
        retireNow,              //wrong
        financial_freedom_age, ///wrong
        fireAmount,           //wrong
        fundsExhaustAtAge,
        inherit,
        present_value_inherit,
        retire_sum,
        present_value_at_retire,
        insurance_required, ///-----
        currentNetworth,
        portfolio_return: data.portfolio_return,
        intialAssets : intialAssets,

        firestatus : Math.round(intialAssets * 100 / fireAmount, 2),
        savingsToIncome: Math.round((income - (expensePreRetirement+expensePostRetirement+loanRepayments))*100/income, 2),
        emiTOIncome: Math.round(loanRepayments*100/income, 2),
        enough_money_for_all_goals: inherit > 0,
    };

    if (retireNow == "NO" && financial_freedom_age > 0) {
        console.log("You are likely to be financially free in the age range " + (outputs.financial_freedom_age - 2) + " - " + (outputs.financial_freedom_age + 5) + ". You have completed " + Math.round((currentNetworth / fireAmount) * 100, 0) + "% of your financial freedom journey.")
    }
    return outputs;
};