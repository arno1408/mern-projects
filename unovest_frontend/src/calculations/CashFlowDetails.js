import { goalWorks } from "./GoalWork";
import { newLoanWorks } from "./LoanWorks";
import { networth } from "./Networth";

export function cashFlowDetails(loanList, assets, allgoals, otherinputs,assetListInput,loanListInput) {

    const currentAge = +otherinputs?.currentAge; // current age - profile_data
    const retirementAge = otherinputs?.retirementAge; //work till age -profile_data
    const livingAge =  otherinputs?.livingAge;//living age - profile_data
    const totalYears = livingAge - currentAge + 1; // Total no?. of rows required in the cashFlowDetails range, which is, life expectancy - current age

    const currentIncome =  otherinputs?.currentIncome; // total annual income
    const incomeGrowthRate =  otherinputs?.incomeGrowthRate / 100; //average_growth_rate
    const currentExpense = otherinputs?.currentExpense; //total_invested_value
    const inflation =  otherinputs?.inflation / 100;//average_inflation

    const equityRate = otherinputs?.equityRate / 100; //equity_amount
    const bondRate = otherinputs?.bondRate / 100;  //bond_amount
    const cashRate = otherinputs?.cashRate / 100;  //cash_amount

    const post_retirement_expense_reduce_by = otherinputs?.post_retirement_expense_reduce_by / 100 //reduse_expenses_by
    const use_withdrawal_rate = otherinputs?.useWithdrawalRate //is_withdrawal_rate
    const withdrawal_rate = otherinputs?.withdrawal_rate / 100 //withdrawal_rate
    const post_retirement_inflation = otherinputs?.post_retirement_inflation / 100 //post retirement inflation


    const retirementYear = new Date().getFullYear() + (retirementAge - currentAge);
    const livingYear = new Date().getFullYear() + totalYears - 1;

    //calculate netwoth values
    let networth_values = networth(assetListInput, loanListInput); // call Initial Networth and Weighted Return values from Networth function
    console.log(networth_values,"values");
    let portfolio_return = networth_values.totalwReturn; // assign portfolio_return, also the default return 
    let open_networth = networth_values.initialNetworth; // assign initial networth to a var
    let open_assets = networth_values.totalAssets;
    let assetAllocationChoice = networth_values.assetAllocationChoice;

    let cashFlowDetails = []; // Declare a new output array
    let financial_freedom_data = []; //for returning financial freedom age values array to FF function along with the main output 

    //post retirement constraints
    const expenseAtRetirement = currentExpense * Math.pow(1 + inflation, (retirementAge - currentAge));
    let expensePostRetirement=0;
    let networthAtRetirement=0;
    const retirementExpenseLessBy = post_retirement_expense_reduce_by;
    
    const useWithdrawalRate = use_withdrawal_rate;
    const withdrawalRate = withdrawal_rate;
    const postRetireInflation = post_retirement_inflation;

    // let goalDetails = goalWorks(allgoals); //call the goals array here and used later for calculating goal outlfows per year
    // let loanDetails = newLoanWorks(loanList); // call the loans array here and used later for calculating loan payments and outstandings per year
    let loanDetails = loanList; // call the loans array here and used later for calculating loan payments and outstandings per year
    let goalDetails = allgoals; // call the loans array here and used later for calculating loan payments and outstandings per year
    //loop to calculate cash flow detail output for each year and store in a row object
    let income = null;
    let expensePreRetirement = null
    for (let counter = 0; counter < totalYears; counter++) {
        let age = currentAge + counter;
        let year = new Date().getFullYear() + counter;

        //calculate pre retirement income and expenses
        income = (year <= retirementYear) ? Math.round(currentIncome * Math.pow((1 + incomeGrowthRate), counter), 2) : 0;
   
        expensePreRetirement = year <= retirementYear ? Math.round((currentExpense * Math.pow((1 + inflation), counter)), 2) : 0;

        //calculate post retirement expenses considering use of reduction or withdrawal rate based on portfolio at retirement   
        if (year > retirementYear && year <= livingYear) {
            if (useWithdrawalRate == "Yes") {
                expensePostRetirement = networthAtRetirement * withdrawalRate * Math.pow((1 + postRetireInflation), counter - retirementAge + currentAge);
            } else if (useWithdrawalRate == "No") {
                expensePostRetirement = (1 - retirementExpenseLessBy) * (expenseAtRetirement * Math.pow((1 + postRetireInflation), counter - retirementAge + currentAge));
            } else {
                expensePostRetirement = 0;
            }
        } else {
            expensePostRetirement = 0;
        }
      
        // add yearly loan payments to output and calculate loan outstandings for each year
        let loanRepayments = 0; // initialise the array to store values
        let loanOutstanding = 0; // initialise the array to store values
        // calculate total payments and loan outstandings in the year by looping through loanDetails 
    
        if (loanDetails) {
            loanDetails.forEach((loan) => {
                const emiYear = loan.year; // year in which EMI is paid
                const loanOutflow = loan.loan_Payments; // total EMIs paid  
                const loanBalance = loan.outstanding_balance; // outstanding loan balance at the end of year     

                if (year == emiYear) {
                    loanRepayments += loanOutflow;
                    loanOutstanding += loanBalance;
                }
            });
        }
3
        // add goal outflows to output,,,this can be handled in goalWorks function and save the loop repetition here.
        let goalOutflow = 0; // initialise the array to store values
        let assetsAdded = 0;
        if (goalDetails) {
            goalDetails.forEach((goal) => {
                let goalYear = goal.start_year;
                let goalFutureCost = goal.future_cost;                ;
                let assetIn = goal.asset_value;
                if (year == goalYear) {
                    goalOutflow += goalFutureCost;
                    assetsAdded += assetIn; //calculated but not yet adjusted in asset values as it may use an unproductive asset for growth; have to figure out 
                }
            });
        }
      
        // sum of total outflows in a year
        const totalOutflow = expensePreRetirement + expensePostRetirement + loanRepayments + goalOutflow;

        // calculate cashflow shortfall or surplus for the year
        const cashShortOrSurPlus = income - totalOutflow;

        // calculate savings rate for the. year only if there is an income
        const savingsRate = income > 0 && income > cashShortOrSurPlus ? Math.round((((income - (expensePreRetirement + expensePostRetirement + loanRepayments)) / income) * 100), 2) : 0;

        //------------------asset allocation code for level two-----------------------------// 
        // if (assetAllocationChoice == "A") {
        //     //portfolio_return = Math.min(inflation + 0.005,portfolio_return); //Lower of inflation + 0.5% or actual weighted portfolio return
        //     portfolio_return = (0.2 * equityRate) + (0.8 * bondRate); // 20% equity and rest bonds assuming some comes through NPS/PF and MFs
        // } else if (assetAllocationChoice == "B") {
        //     let equityAllocation = (100 - age) / 100;
        //     portfolio_return = (equityAllocation * equityRate) + ((1 - equityAllocation) * bondRate);
        // } else if (assetAllocationChoice == "C") {
        //     portfolio_return = ((0.6 * equityRate) + (0.4 * bondRate));
        // } else if (assetAllocationChoice == "D") {
        //     portfolio_return;
        // };


        // Assets - closing and opening - calculations, networth function called at the beginning of the CashFlowDetails function to avoid repetition;       
        let closing_assets = open_assets * (1 + portfolio_return) + cashShortOrSurPlus;
   
        let closeing_Networth = closing_assets - loanOutstanding;

        // to not write negative portfolio values // IF FUNDS ARE ENDING EARLIER, THEN DONT DO CALCULATIONS FOR THE FUTURE YEARS AND STOP
        if (closing_assets > 0) {
            closing_assets;
        } else {
            closing_assets = 0;
            financial_freedom_data.push(age); // add to financial_freedom_data array for calculating when funds exhaust 
        };

        // portfolio at retirement to be used for post retirement expenses at withdrawal rate
        if(age === retirementAge) {
            networthAtRetirement = closeing_Networth
        }

        // let's deal with the final outputs 
        var newCashFlow = {
            year,
            age,
            income,
            expensePreRetirement,
            expensePostRetirement,
            loanRepayments,
            goalOutflow,
            totalOutflow: Math.round(totalOutflow),
            cashShortOrSurPlus,
            savingsRate,
            open_assets,
            closingAssets:closing_assets,
            open_networth,
            loanOutstanding,
            closeing_Networth,
            networthAtRetirement
        } //store all outputs in a new row object

        if (goalDetails !== null) {
            for (let item of goalDetails) {
                if (item['start_year'] === year) {
                    //closing_assets > 0
                    if (closing_assets > 0) {
                        newCashFlow['isGoalAvaiableInThisYear'] = true;
                        newCashFlow['isGoalAchived'] = true;
                        newCashFlow['goalName'] = item['goal_name'];
                        newCashFlow['goalFutureCost'] = item['future_cost'];
                    } else {
                        newCashFlow['isGoalAvaiableInThisYear'] = true;
                        newCashFlow['isGoalAchived'] = false;
                        newCashFlow['goalName'] = item['goal_name'];
                        newCashFlow['goalFutureCost'] = item['future_cost'];
                    }
                    break;
                } else {
                    newCashFlow['isGoalAvaiableInThisYear'] = false;
                    newCashFlow['isGoalAchived'] = null;
                    newCashFlow['goalName'] = null;
                    newCashFlow['goalFutureCost'] = null;
                }
            }
        }
 
        cashFlowDetails.push(newCashFlow); //add the row to the Cash Flow details array

        // Other networth operations
        open_networth = closeing_Networth; // assigns last year's networth as next year opening 
        open_assets = closing_assets;

    } //Top FOR loop ends here

    return { 
        cashFlowDetails, 
        inflation, 
        portfolio_return, 
        totalYears, 
        retirementAge, 
        livingAge, 
        financial_freedom_data, 
        currentAge, 
        postRetireInflation 
    }
};