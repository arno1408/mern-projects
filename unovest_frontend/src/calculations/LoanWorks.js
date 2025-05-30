
// --------------- loanWork stable Code------------------
export function newLoanWorks(loanList) {
   
    const balanceMonthsInYear = 12 - (new Date().getMonth() + 1); //returns the month (from 0 to 11) of a date
    const currentYear = new Date().getFullYear();

    if (loanList?.length > 0) {
        const loanDetails = loanList?.flatMap((loan) => {
            const { loan_name, start_year, emi_amount, outstanding_balance,end_year } = loan;
            let loanName = loan_name;
            let startYear = start_year;
            let emiAmount = emi_amount;
            let endYear = end_year;
            let outstandingBalance = outstanding_balance;

            const interest = loan.interest/100;
            let loanOutstanding = outstandingBalance;
            const emi = emiAmount;

            const loanYears = endYear - startYear + 1;

            if (loanYears > 0 && loanOutstanding > 0) {
                return Array.from({ length: loanYears }, (_, counter) => {
                    const year = startYear + counter;
                    const loanPayments = (year === currentYear) ? emi * balanceMonthsInYear : emi * 12;
                    const interestAmount = (year === currentYear) ? loanOutstanding * interest * (balanceMonthsInYear / 12) : loanOutstanding * interest;
                    const principal = loanPayments - interestAmount;
                    loanOutstanding -= principal;
                    // loanOutstanding = Math.round(loanOutstanding - principal);

                    if (loanOutstanding > 0) {
                        return {
                            loan_name: loanName,
                            year,
                            emi_amount: emi,
                            loan_Payments: loanPayments,
                            outstanding_balance: Math.round(loanOutstanding),
                            interest
                        };
                    } else {
                        const finalPayments = loanOutstanding + (principal * (1 + interest));
                        loanOutstanding = 0;
                        return {
                            loan_name: loanName,
                            year,
                            emi_amount: emi,
                            loan_Payments: finalPayments,
                            outstanding_balance: Math.round(loanOutstanding),
                            interest
                        };
                    }
                });
            } else {
                return [];
            }
        });
      
        const filterLoanList = loanDetails.filter((loan)=>loan!==null)
        return filterLoanList
    }
}

    //-------- code commented to to restrict the function from removing car start loan year--------//
    //-------- code to be added above filter loan list---------------// 
    // const newloanlist = loanDetails.map((loan, index) => {
    //     if (loanDetails[index - 1]?.outstanding_balance === 0) {
    //         return null
    //     }
    //     return loan;
    // })

     // --------------- sample data for loan------------------
    // const loanList = [
    //     { loanName: 'Car Loan', emiAmount: 627, startYear: 2023, endYear: 2030, interest: 10 / 100, outstandingBalance: 100000 },
    //     { loanName: 'Home Loan', emiAmount: 93724.90920347767, startYear: 2023, endYear: 2043, interest: 8.5 / 100, outstandingBalance: 10800000 }
    // ];