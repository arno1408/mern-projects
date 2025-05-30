

//--------------- goalWork stable Code------------------// 
export function goalWorks(goalsData,current_Age,living_Age,avg_inflation) {

    const livingAge = living_Age
    const currentAge = current_Age
    const goalDetails = []; // Declare a new array

    // calculate future cost of each goal per year in which money is required and insert in the array
    goalsData?.forEach(goal => {
        // for recurring frequency of goals where it recurs after every no. of years
        const goalFrequency = goal.recuuring_frequency ? goal.recuuring_frequency : 0;

        // this should be done as long as the start year is below the living Age Year or the age limit defined by user
        let goalLimit = goalFrequency >= 1 ? Math.round((livingAge - currentAge) / goalFrequency, 0) : 1;

        let nextStartYear = goal.purchase_year;
        while (goalLimit > 0) {

            let goalYears = goal.course_duration;
            // Conditional to ignore empty or invalid goalYears
            if (goalYears != null && goalYears > 0) {

                for (let counter = 1; counter <= goalYears; counter++) {
                    const goalCostNow = goal.cost_per_year; //current cost for the goal
                    const goalInflation = avg_inflation/100; //inflation value for the goal

                    let endYear = goalFrequency >= 1 ? nextStartYear + counter : goal.purchase_year + counter;
                    let startYear = endYear - 1;

                    let exp = startYear - new Date().getFullYear(); //the power factor / exponent to calculate the future cost
                    const futureCost = Math.round(goalCostNow * (Math.pow(1 + goalInflation, exp)), 2);
                    const goalName = goal.user_goal_name;

                    // to include an asset back to portfolio since it is just a change of category; also allows adjustment of networth against loans
                    const isAsset = goal.include_assets;
                    const assetValue = isAsset === "Yes" ? goal.totalvalue_of_assets : 0;

                    // add all above data to a new object and add it to goalDetails
                    let obj = {
                        goal_name: goalName,
                        goal_description: goal.goal_description,
                        start_year: startYear,
                        end_year: endYear,
                        goal_cost_now: goalCostNow,
                        future_cost: futureCost,
                        asset_value: 0 //need to change this Ankush
                    }
                    const newGoal = [obj];
                    goalDetails.push(obj);

                    // if a goal has a recurring frequency >0, the goal should loop with new startYear;
                    nextStartYear = goalFrequency >= 1 ? startYear + (counter * goalFrequency) : startYear;
                }
            }
            goalLimit -= 1; //decrement goalLimit

        }
    });

    // Calculate the total number of rows to write in the Goal Details sheet
    const totalYears = goalDetails.length;

    if (totalYears >= 1) {
        return goalDetails;
    } else {
        return []
    }
};

    //------------------sample Date for goal-----------------//
    // let goalsData = [
    //     { "goal_name": "Graduation", "goal_desc": "Y", "goal_start_year": 2030, "goal_end_year": 4, "cost_per_year": 100000, "inflation": 0.08, "recuuring_frequency": 0, "include_assets": "NO", totalvalue_of_assets: null },
    //     { "goal_name": "Graduation", "goal_desc": "Y", "goal_start_year": 2036, "goal_end_year": null, "cost_per_year": null, "inflation": 0.08, "recuuring_frequency": 0, "include_assets": "NO", totalvalue_of_assets: null },
    //     { "goal_name": "Graduation", "goal_desc": "SW", "goal_start_year": 2042, "goal_end_year": null, "cost_per_year": null, "inflation": 0.08, "recuuring_frequency": 0, "include_assets": "NO", totalvalue_of_assets: null },
    //     { "goal_name": "Post Graduation", "goal_desc": "SW", "goal_start_year": 2028, "goal_end_year": null, "cost_per_year": null, "inflation": 0.08, "recuuring_frequency": 0, "include_assets": "NO", totalvalue_of_assets: null },
    //     { "goal_name": "Home Upgrade", "goal_desc": "Self", "goal_start_year": 2025, "goal_end_year": 1, "cost_per_year": 1000000, "inflation": 0.08, "recuuring_frequency": 0, "include_assets": "NO", totalvalue_of_assets: null },
    //     { "goal_name": "HOme +", "goal_desc": "Self", "goal_start_year": 2025, "goal_end_year": 1, "cost_per_year": 10000000, "inflation": 0.08, "recuuring_frequency": 0, "include_assets": "NO", totalvalue_of_assets: null },
    //     { "goal_name": "Wedding", "goal_desc": "Y", "goal_start_year": 2030, "goal_end_year": 1, "cost_per_year": 3000000, "inflation": 0.08, "recuuring_frequency": 0, "include_assets": "NO", totalvalue_of_assets: null },
    //     { "goal_name": "Car", "goal_desc": "Self", "goal_start_year": 2028, "goal_end_year": 1, "cost_per_year": 3000000, "inflation": 0.01, "recuuring_frequency": 0, "include_assets": "NO", totalvalue_of_assets: null },
    //     { "goal_name": "INtll Travel", "goal_desc": "Self", "goal_start_year": 2027, "goal_end_year": null, "cost_per_year": null, "inflation": 0.08, "recuuring_frequency": 0, "include_assets": "NO", totalvalue_of_assets: null }
    // ]