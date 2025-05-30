

//  --------------- Networth stable Code------------------
export function networth(assets, loanList) {

    const assetAllocationChoice = "D"
    // let's find sum of assets & liabilities
    let totalAssets = 0;
    let totalLiabilities = 0;
    let equity_amount = 0;
    let cash_amount = 0;

    if (assets?.length > 0) {
        assets.forEach(asset => {
            if(asset['equity_amount'] > 0 || asset['bond_amount'] > 0|| asset['bond_amount'] > 0){
                if(asset['equity_amount'] != null && asset['equity_amount'] > 0) {
                    totalAssets += asset['equity_amount'];
                } 
                if(asset['bond_amount'] != null && asset['bond_amount'] > 0){
                    totalAssets += asset['bond_amount'];
                } 
                if(asset['cash_amount'] != null && asset['cash_amount'] > 0) {
                    totalAssets += asset['cash_amount'];
                }else{
                    totalAssets
                }
            }else{
                if(asset.asset_amount != null && asset.asset_amount > 0) {
                    totalAssets += asset.asset_amount;
                }
            }
           
        });
    }
    // console.log(totalAssets,'totals');

    if (loanList?.length > 0) {
        loanList.forEach(loan => {
            if (loan.outstanding_balance != null && loan.outstanding_balance > 0) {
                totalLiabilities += loan.outstanding_balance;
            }
        });
    //  console.log(totalLiabilities,'aargs');
    }
  
    const initialNetworth = totalAssets - totalLiabilities;
    // console.log(initialNetworth,'aargs')
    // add weightage and weighted return of the asset when asset allocation choice is current portfolio based in Networth and add to the array
    let weight = 0;
    let totalwReturn = 0;

    if (assets?.length > 0) {
        assets.forEach(function (asset) {
            const assetReturn = asset.rate_of_return? asset.rate_of_return :asset['equity_ror'] ||asset['bonds_ror']||asset['cash_ror'];
            if(asset['equity_amount'] > 0 || asset['bond_amount'] > 0|| asset['bond_amount'] > 0){
                if (asset['equity_amount'] != null && asset['equity_amount'] > 0) {
                    equity_amount = asset['equity_amount']
                    weight = (asset['equity_amount'] / totalAssets) * 100; //as per user provided current asset allocation
                    totalwReturn += weight * assetReturn;
                } if (asset['bond_amount'] != null && asset['bond_amount'] > 0) {
                    weight = (asset['bond_amount'] / totalAssets) * 100; //as per user provided current asset allocation
                    totalwReturn += weight * assetReturn;
                }if (asset['cash_amount'] != null && asset['cash_amount'] > 0) {
                    cash_amount = asset['cash_amount']
                    weight = (asset['bond_amount'] / totalAssets) * 100; //as per user provided current asset allocation
                    totalwReturn += weight * assetReturn;
                } else {
                    weight;
                    totalwReturn;
                }
            }else{
                if(asset.asset_amount != null && asset.asset_amount > 0) {
                    weight = (asset.asset_amount / totalAssets) * 100;
                    totalwReturn += weight * assetReturn;
                }
            }
           
        });
        
    }
    let equityToAssets = 0;
    let cashToAssets = 0;

    if (totalAssets > 0) {
        equityToAssets = (equity_amount * 100 / totalAssets);
    }
    
    if (totalAssets > 0) {
        cashToAssets = (cash_amount * 100 / totalAssets);
    } 

    //Storing in a var so as to pass values via return, which needs a single variable
    const networthVals = {
        initialNetworth,
        totalwReturn: (totalwReturn / 100)/100,
        totalAssets,
        totalLiabilities,
        assetAllocationChoice,
        equityToAssets,
        cashToAssets,
    }
    // console.log(networthVals,"aargs");

    return networthVals;

};