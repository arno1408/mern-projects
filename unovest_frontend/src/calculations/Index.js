export const lumpsumAmtTotalIncome = (salary, business, interest, rents, otherSources) => {
    return salary + business + interest + rents + otherSources;
}


export const totalOutflows = (preRetirementExpenses, postRetirementExpenses, loanRepayment, goalOutFlows) => {
    return preRetirementExpenses + postRetirementExpenses + loanRepayment + goalOutFlows
}

export const cashFlowShortfallOrSurplus = (income, totalOutflows) => {
    return income - totalOutflows;
}

export const savingRate = (income, preRetirementExpenses, postRetirementExpenses, loanRepayment) => {
    return (income - (preRetirementExpenses + postRetirementExpenses + loanRepayment)) / income;
}

export const goalOutflow = (goals, yeargap) => {
    return goals * (1 + (goals * 0.08)) ** yeargap;
}

export const weightage = (currentNetWorth, amt) => {
    return currentNetWorth / amt * 100;
}

// growthrate is taken by input /////////////////////////////////////////////////
export const closingAssets = (openAsset, growthrate, cashFlowShortfallOrSurplus) => {
    return openAsset * (1 + growthrate) + cashFlowShortfallOrSurplus;
}


export const networth = () => {
    let assets = [
        { name: 'Equity', amount: 3500000, return: 0.11, weightage: 0.7 },
        { name: 'Bonds', amount: 1000000, return: 0.06, weightage: 0.2 },
        { name: 'Real Estate', amount: 0, return: 0.08, weightage: 0 },
        { name: 'Alternatives', amount: 0, return: 0.1, weightage: 0 },
        { name: 'Gold', amount: 0, return: 0.07, weightage: 0 },
        { name: 'Cash', amount: 500000, return: 0.04, weightage: 0.1 }
    ]

    let totalAssetsAmt = 0;
    let totalwReturnAvg = 0;
    var totalLiabilities = 0;
    var initialNetworth = 0;
    var assetAllocationChoice = ""
    assets.forEach((asset) => {
        if (asset.amount != null && asset.amount > 0 && asset.amount != undefined) {
            totalAssetsAmt = totalAssetsAmt + asset.amount;
            totalwReturnAvg = totalwReturnAvg + (asset.return * asset.weightage);
        }
    })

    // add weightage and weighted return of the asset when asset allocation choice is current portfolio based in Networth and add to the array
    var weight = 0;
    var wReturn = 0;

    assets.forEach((asset) => {
        var assetreturn = asset.return;
        if (asset.amount != null && asset.amount > 0 && asset.amount != undefined) {
            weight = (asset.amount / totalAssetsAmt) * 100;
            wReturn = weight * assetreturn;
        } else {
            weight;
            wReturn;
        }
        asset["weight"] = weight;
        asset["wReturn"] = wReturn;
    })

    initialNetworth = totalAssetsAmt - totalLiabilities;
    let obj = {
        initialNetworth: initialNetworth,
        totalwReturnAvg: totalwReturnAvg,
        totalAssetsAmt: totalAssetsAmt,
        totalLiabilities: totalLiabilities,
        assetAllocationChoice: assetAllocationChoice
    }
    return obj;
}

export const loanWorks = () => {
    const liabilities = [
        { loanName: 'Car Loan', emiAmt: 0, startYear: 2023, endYear: 2027, interest: 0.08, loanOutStandingBal: 0 },
        { loanName: 'Home Loan', emiAmt: 98473.95579255935, startYear: 2024, endYear: 2039, interest: 0.085, loanOutStandingBal: 10000000 }
    ]

    var loanDetails = []; // Declare a new array
    var totalYears = 0; // The total rows required for goalDetails range

    // use the loans input to calculate year wise loan repayments and outstanding balances and store them in a table 
    let balanceMonthsInYear = 12 - new Date().getMonth(); //to ascertain how many more months loan is paid in current year
    let currentYear = new Date().getFullYear(); //get current year 


    liabilities.forEach((row) => {
        var loanYears = row.endYear - row.startYear + 1;
        var loanOutstanding = row.loanOutStandingBal;
        var emi = row.emiAmt;
        var interestRate = row.interest;
        if (loanYears != "NULL" && loanYears > 0 && loanOutstanding > 0) {
            for (var counter = 1; counter <= loanYears; counter = counter + 1) {
                let loanPayments = emi * 12; // multiply by 12 for future years
                let interest = loanOutstanding * interestRate;
                let year = row.startYear + counter - 1; //there must be a better way to do this?

                if (year == currentYear) {
                    loanPayments = emi * balanceMonthsInYear;  // multiply by balance months for the current year
                    interest = loanOutstanding * interestRate * (balanceMonthsInYear / 12);
                } else {
                    loanPayments;
                    interest;
                }

                let principal = loanPayments - interest;

                loanOutstanding = loanOutstanding - principal; //(- prepayments, to be done later)

                //to account for final year of loan payments
                if (loanOutstanding > 0) {
                    loanPayments;
                } else {
                    loanPayments = loanOutstanding + (principal * (1 + interestRate)); //balance loan in last year is paid off and loan becomes 0
                    loanOutstanding = 0;
                }

                let loanName = row.loanName + " " + counter;

                // add all above data to a new object and add it to loanDetails row[0] is loanName, 1 is EMI / repayment, 5 is loan outstanding, 4 is interest interestRate
                var newLoan = { loanName, year, emi, loanPayments, loanOutstanding, interestRate }
                loanDetails.push(newLoan);
            }
            totalYears += loanYears; // to calculate total no. of rows to write in the Loan Details sheet 
        }
    })
    return loanDetails;
}

export const goalWork = () => {
    let data = [
        { goalName: 'Graduation', goalDesc: 'Y', goalStartYear: 2036, goalEndYear: 4, costPerYear: 1500000, inflation: 0.1 },
        { goalName: 'Post Graduation', goalDesc: 'Y', goalStartYear: 2025, goalEndYear: '', costPerYear: '', inflation: 0.5 },
        { goalName: 'Graduation', goalDesc: 'SW', goalStartYear: 2028, goalEndYear: '', costPerYear: '', inflation: 0.5 },
        { goalName: 'Post Graduation', goalDesc: 'SW', goalStartYear: 2046, goalEndYear: '', costPerYear: '', inflation: 0.5 },
        { goalName: 'Refurbishing', goalDesc: 'Self', goalStartYear: 2029, goalEndYear: '', costPerYear: '', inflation: 0.5 },
        { goalName: 'Home', goalDesc: 'Self', goalStartYear: 2024, goalEndYear: 1, costPerYear: 5000000, inflation: 0.5 },
        { goalName: 'Wedding', goalDesc: 'Y', goalStartYear: 2045, goalEndYear: 1, costPerYear: 2500000, inflation: 0.5 },
        { goalName: 'Car', goalDesc: 'Self', goalStartYear: 2030, goalEndYear: 1, costPerYear: 3000000, inflation: 0.5 },
        { goalName: 'Travel', goalDesc: 'Self', goalStartYear: 2030, goalEndYear: '', costPerYear: '', inflation: 0.5 }
    ]

    var goalDetails = []; // Declare a new array
    var totalYears = 0; // The total rows required for goalDetails range

    // calculate future cost of each goal per year in which money is required and insert in the array
    data.forEach((row) => {
        var goalYears = row.goalEndYear;
        // Conditional to ignore error when goalYears is empty 
        if (goalYears != "NULL" && goalYears > 0 && goalYears != undefined) {
            for (var counter = 1; counter <= goalYears; counter = counter + 1) {
                let goalCostNow = row.costPerYear; //current cost for the goal 
                let goalInflation = row.inflation; //inflation value for the goal 
                var endYear = row.goalStartYear + 1;
                var startYear = endYear - 1; //there must be a better way to do this?
                var exp = startYear - new Date().getFullYear(); //the power factor / exponent to calculate the future cost

                var futureCost = Math.round(goalCostNow * (Math.pow(1 + goalInflation, exp)), 2);
                var goalName = row.goalName + " " + counter;


                // add all above data to a new object and add it to goalDetails 
                var newGoal = {
                    goalName: goalName,
                    goalDesc: row.goalDesc,
                    startYear: startYear,
                    endYear: endYear,
                    goalCostNow: goalCostNow,
                    futureCost: futureCost
                };
                goalDetails.push(newGoal);
            }
            totalYears += goalYears;// to calculate total no. of rows to write in the Goal Details sheet 
        }
    })
    if (goalDetails.length >= 1) {
        return goalDetails;    //the array with the values
    } else {
        return null //if someone adds no goals
    }
}


export function customRound(value) {
    // Check if the decimal part is greater than or equal to 0.5
    if (value % 1 >= 0.5) {
        // Round up to 6
        return Math.ceil(value);
    } else {
        // Round down to 5
        return Math.floor(value);
    }
}


    export const convertToIndianNumberingSystem = (amount) => {
        if (isNaN(amount) || amount < 0) {
            return "Invalid input";
        }

        const crore = Math.floor(amount / 10000000);
        amount %= 10000000;

        const lakh = Math.floor(amount / 100000);
        amount %= 100000;

        const thousand = Math.floor(amount / 1000);
        amount %= 1000;

        const result = [];

        if (crore > 0) {
            result.push({ amt:crore, str: "Cr." });
        }

        if (lakh > 0) {
            result.push({ amt:lakh, str: "Lakhs" });
        }

        if (thousand > 0) {
            result.push({ amt:thousand, str: "Thousands" });
        }

        if (amount > 0) {
            result.push({ amt:amount, str: "Units" });
        }

        return result;
    }

// Example usage
// let amount = 40000000;
// console.log(convertToIndianNumberingSystem(amount)); // Output: 4 crore
