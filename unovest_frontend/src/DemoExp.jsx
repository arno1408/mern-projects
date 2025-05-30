import React, { useEffect, useState } from 'react'
import { newLoanWorks } from './calculations/LoanWorks';
import { networth } from './calculations/Networth';
import { goalWorks } from './calculations/GoalWork';
import { cashFlowDetails } from './calculations/CashFlowDetails';
import { financialFreedom } from './calculations/FinancialFreedom';
import { customRound } from './calculations/Index';
import {otherDetails,loanListInput,assetsListInput, loanDetails1, assetDetails1, goalDetails1 } from './calculations/sampleDataForCalculation';
import { formatNumberWithCommas } from './Variable';

const DemoExp = () => {

    // loans ----------------------------------------------------------------------------------------->
    const [allloansvalues, setallloanValues] = useState([]);
    const [loanValues, setloanValues] = useState({});
    const [loanarr, setloanarr] = useState([]);
    const [loansInput, setLoanInput] = useState([]);


    // assets ----------------------------------------------------------------------------------------->
    const [allassetsvalues, setallassetsValues] = useState([]);
    const [assetsvalues, setassetsvalues] = useState({});
    const [assetsarr, setassetsarr] = useState([]);


    // goals ----------------------------------------------------------------------------------------->
    const [goalsvalues, setgoalsvalues] = useState({});
    const [allgoalsValues, setallgoalsValues] = useState([]);
    const [goalArr, setgoalArr] = useState([]);

    const [otherinputs, setotherinputs] = useState({})

    const [FinancialFreedomData, setFinancialFreedomData] = useState({});
    const [cashflowDetails, setcashflowDetails] = useState([]);

    useEffect(() => {
        let inputLoanArray =  loansInput?.filter(ele => ele?.loan_name);
        //---> for taking the values through input fields 
        let ff = financialFreedom(cashFlowDetails(allloansvalues, allassetsvalues, allgoalsValues, otherinputs,assetsarr,inputLoanArray))
        //---> for taking the values through saved array (constant data for cashflow details)
        // let ff = financialFreedom(cashFlowDetails(loanDetails1, assetDetails1, goalDetails1, otherDetails,assetsListInput,loanListInput))
        setFinancialFreedomData(ff)
        //---> for taking the values through input fields 
        setcashflowDetails(cashFlowDetails(allloansvalues, allassetsvalues, allgoalsValues, otherinputs,assetsarr,inputLoanArray).cashFlowDetails);
        //---> for taking the values through saved array (constant data for cashflow details)
        // setcashflowDetails(cashFlowDetails(loanDetails1, assetDetails1, goalDetails1, otherDetails,assetsListInput,loanListInput).cashFlowDetails);
    }, [allloansvalues, allassetsvalues, goalArr, otherinputs]);

    const handleInputsLoan = (e) => {
        let obj = { ...loanValues };
        obj.startYear = 2024;
        if (e.target.name == "loanName") {
            obj[e.target.name] = e.target.value
            setloanValues(obj);
        }
        else {
            obj[e.target.name] = +e.target.value
            setloanValues(obj);
        }
    }


    const saveloans = () => {
        let arr = [...allloansvalues, loanValues];
        let newarr = arr.map((ele) => {
            return {
                start_year: ele.startYear,
                loan_name: ele.loanName,
                outstanding_balance: ele.outstandingBalance,
                emi_amount: ele.emiAmount,
                interest: ele.interest,
                end_year: ele.endYear
            }
        })
        setLoanInput((prev) => ([...prev,...newarr]))
        setloanarr((prev) =>[...prev, ...newLoanWorks(newarr)])
        setallloanValues((prev) =>[...prev, ...newLoanWorks(newarr)]);
        setloanValues({});
    }


    const handleInputsAssets = (e) => {
        let obj = { ...assetsvalues };
        if (e.target.name == "weightage") {
            obj[e.target.name] = +e.target.value
            setassetsvalues(obj);
        } else if (e.target.name == "asset_name") {
            obj[e.target.name] = e.target.value
            setassetsvalues(obj);
        } else if (e.target.name == "rate_of_return") {
            obj[e.target.name] = +e.target.value
            setassetsvalues(obj);
        }
        else {
            obj[e.target.name] = +e.target.value
            setassetsvalues(obj);
        }
    }


    const Saveassets = () => {
        let arr = [...allassetsvalues, assetsvalues];
        let newarr = arr.map((ele) => {
            return {
                weightage: (ele.asset_amount / networth(arr, allloansvalues).totalAssets) * 100,
                asset_name: ele.asset_name,
                rate_of_return: + ele.rate_of_return,
                asset_amount: +ele.asset_amount,
            }
        })
        setallassetsValues(newarr);
        setassetsarr(newarr)
    }


    const handleGoalsInputs = (e) => {
        let obj = { ...goalsvalues };
        obj[e.target.name] = e.target.value;
        setgoalsvalues(obj)
    }

    const SaveGoals = () => {
        let arr = [...allgoalsValues, goalsvalues];
        let newarr = arr.map((ele) => {
            return {
                user_goal_name: ele.goal_name,
                goal_description: ele.goal_desc,
                purchase_year: +ele.goal_start_year,
                course_duration: +ele.goal_end_year,
                cost_per_year: +ele.cost_per_year,
                inflation: 9,
                recuuring_frequency: 0,
                include_assets: "NO",
                totalvalue_of_assets: null
            }
        })
        console.log(newarr,"goalList")
        setallgoalsValues((prev) =>[...prev,...goalWorks(newarr,23,90,9)]);
        setgoalArr((prev) =>[...prev,...goalWorks(newarr,23,90,9)])
    }

    const handleOtherInputs = (e) => {
        let obj = { ...otherinputs };
        obj[e.target.name] = +e.target.value;
        setotherinputs(obj)
    }

    return (
        <div className='bg-black overflow-x-scroll'>
            <div className='flex justify-between'>
                <div className=''>
                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Price
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                                type="text"
                                name="loanName"
                                id="price"
                                value={loanValues?.loanName ? loanValues?.loanName : ""}
                                onChange={handleInputsLoan}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={"loan name"}
                            />
                            <input
                                type="text"
                                name="outstandingBalance"
                                id="price"
                                value={loanValues?.outstandingBalance ? loanValues?.outstandingBalance : ""}
                                onChange={handleInputsLoan}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={"outstandingBalance"}
                            />
                            <input
                                type="text"
                                name="emiAmount"
                                id="price"
                                value={loanValues?.emiAmount ? loanValues?.emiAmount : ""}
                                onChange={handleInputsLoan}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={"emiAmount"}
                            />
                            <input
                                type="number"
                                name="interest"
                                id="price"
                                value={loanValues?.interest ? loanValues?.interest : ""}
                                onChange={handleInputsLoan}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={"interest"}
                            />
                            <input
                                type="text"
                                name="endYear"
                                id="price"
                                value={loanValues?.endYear ? loanValues?.endYear : ""}
                                onChange={handleInputsLoan}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={"endYear"}
                            />
                            <button className='text-white bg-red-400 w-full' onClick={saveloans}>saveloans</button>
                        </div>
                    </div>
                </div>
                <div>
                    <table className="table-auto border">
                        <thead>
                            <tr>
                                <th className='border p-2 text-white'>loanName</th>
                                <th className='border p-2 text-white'>startYear</th>
                                <th className='border p-2 text-white'>emi</th>
                                <th className='border p-2 text-white'>loanPayment</th>
                                <th className='border p-2 text-white'>outstandingBalance</th>
                                <th className='border p-2 text-white'>interest</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loanarr && loanarr.map((loan, index) => (
                                <tr key={index} className='border'>
                                    <td className='border p-2 text-white'>{loan.loan_name}</td>
                                    <td className='border p-2 text-white'>{loan.year}</td>
                                    <td className='border p-2 text-white'>{loan.emi_amount}</td>
                                    <td className='border p-2 text-white'>{customRound(loan.loan_Payments)}</td>
                                    <td className='border p-2 text-white'>{customRound(loan.outstanding_balance)}</td>
                                    <td className='border p-2 text-white'>{loan.interest * 100}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <br /><br />

            {/*---------------------------------------------- assets ---------------------------------------------- */}
            <div className='flex justify-between'>
                <div className=''>
                    <div>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                                type="text"
                                name="asset_name"
                                id="price"
                                value={assetsvalues?.asset_name ? assetsvalues?.asset_name : ""}
                                onChange={handleInputsAssets}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={"Asstname"}
                            />
                            <input
                                type="number"
                                name="asset_amount"
                                id="price"
                                value={assetsvalues?.asset_amount ? assetsvalues?.asset_amount : ""}
                                onChange={handleInputsAssets}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={"asset_amount"}
                            />
                            <input
                                type="text"
                                name="rate_of_return"
                                id="price"
                                value={assetsvalues?.rate_of_return ? assetsvalues?.rate_of_return : ""}
                                onChange={handleInputsAssets}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={"rate_of_return"}
                            />
                            <button className='text-white bg-red-400 w-full' onClick={Saveassets}>Saveassets</button>
                        </div>
                    </div>
                </div>
                <div>
                    <table className="table-auto border">
                        <thead>
                            <tr>
                                <th className='border p-2 text-white'>Assets Name</th>
                                <th className='border p-2 text-white'>Assets Amount</th>
                                <th className='border p-2 text-white'>Assets Rate of return</th>
                                <th className='border p-2 text-white'>Assets Weightage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assetsarr.length > 0 ?
                                assetsarr.map((asset, index) => (
                                    <tr key={index} className='border'>
                                        <td className='border p-2 text-white'>{asset.asset_name}</td>
                                        <td className='border p-2 text-white'>{asset.asset_amount}</td>
                                        <td className='border p-2 text-white'>{asset.rate_of_return}%</td>
                                        <td className='border p-2 text-white'>{asset.weightage} %</td>
                                    </tr>
                                )) : null}
                        </tbody>
                    </table>
                </div>
            </div>



            {/*---------------------------------------------- Goals ---------------------------------------------- */}
            <div className='flex justify-between'>
                <div className=''>
                    <div>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                                type="text"
                                name="goal_name"
                                id="price"
                                value={goalsvalues?.goal_name ? goalsvalues?.goal_name : ""}
                                onChange={handleGoalsInputs}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={"goal_name"}
                            />
                            <input
                                type="text"
                                name="cost_per_year"
                                id="price"
                                value={goalsvalues?.cost_per_year ? goalsvalues?.cost_per_year : ""}

                                onChange={handleGoalsInputs}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={"cost_per_year"}
                            />
                            <input
                                type="text"
                                name="goal_start_year"
                                id="price"
                                value={goalsvalues?.goal_start_year ? goalsvalues?.goal_start_year : ""}
                                onChange={handleGoalsInputs}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={"goal_start_year"}
                            />
                            <input
                                type="text"
                                name="goal_end_year"
                                id="price"
                                value={goalsvalues?.goal_end_year ? goalsvalues?.goal_end_year : ""}
                                onChange={handleGoalsInputs}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={"duration"}
                            />
                            <button className='text-white bg-red-400 w-full' onClick={SaveGoals}>SaveGoals</button>
                        </div>
                    </div>
                </div>
                <div>
                    <table className="table-auto border">
                        <thead>
                            <tr>
                                <th className='border p-2 text-white'>goalName</th>
                                <th className='border p-2 text-white'>goalDescription</th>
                                <th className='border p-2 text-white'>startYear</th>
                                <th className='border p-2 text-white'>endYear</th>
                                <th className='border p-2 text-white'>currentCost</th>
                                <th className='border p-2 text-white'>futureCost</th>
                                <th className='border p-2 text-white'>assetValue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {goalArr && goalArr.map((goal, index) => (
                                <tr key={index} className='border'>
                                    <td className='border p-2 text-white'>{goal.goal_name}</td>
                                    <td className='border p-2 text-white'>{goal.goal_description}</td>
                                    <td className='border p-2 text-white'>{goal.start_year}</td>
                                    <td className='border p-2 text-white'>{goal.end_year}</td>
                                    <td className='border p-2 text-white'>{goal.goal_cost_now}</td>
                                    <td className='border p-2 text-white'>{goal.future_cost}</td>
                                    <td className='border p-2 text-white'>{goal.asset_value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <h1>other inputs</h1>
            <div className='w-80'>
                <div className='text-slate-200 bg-slate-500'>currentAge</div>
                <input
                    type="text"
                    name="currentAge"
                    id="price"
                    value={otherinputs?.currentAge ? otherinputs?.currentAge : null}
                    onChange={handleOtherInputs}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={"currentAge"}
                />
                 <div className='text-slate-200 bg-slate-500'>retirementAge</div>
                <input
                    type="text"
                    name="retirementAge"
                    id="price"
                    value={otherinputs?.retirementAge ? otherinputs?.retirementAge : null}
                    onChange={handleOtherInputs}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={"retirementAge"}
                />
                   <div className='text-slate-200 bg-slate-500'>livingAge</div>
                <input
                    type="text"
                    name="livingAge"
                    id="price"
                    value={otherinputs?.livingAge ? otherinputs?.livingAge : null}
                    onChange={handleOtherInputs}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={"livingAge"}
                />
                <div className='text-slate-200 bg-slate-500'>currentIncome</div>
                <input
                    type="text"
                    name="currentIncome"
                    id="price"
                    value={otherinputs?.currentIncome ? otherinputs?.currentIncome : null}
                    onChange={handleOtherInputs}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={"currentIncome"}
                />
                <div className='text-slate-200 bg-slate-500'>incomeGrowthRate</div>
                <input
                    type="text"
                    name="incomeGrowthRate"
                    id="price"
                    value={otherinputs?.incomeGrowthRate ? otherinputs?.incomeGrowthRate : null}
                    onChange={handleOtherInputs}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={"incomeGrowthRate"}
                />
                 <div className='text-slate-200 bg-slate-500'>currentExpense</div>
                <input
                    type="text"
                    name="currentExpense"
                    id="price"
                    value={otherinputs?.currentExpense ? otherinputs?.currentExpense : null}
                    onChange={handleOtherInputs}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={"currentExpense"}
                />
                  <div className='text-slate-200 bg-slate-500'>inflation</div>
                <input
                    type="text"
                    name="inflation"
                    id="price"
                    value={otherinputs?.inflation ? otherinputs?.inflation : null}
                    onChange={handleOtherInputs}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={"inflation"}
                />
                    <div className='text-slate-200 bg-slate-500'>bondRate</div>
                <input
                    type="text"
                    name="bondRate"
                    id="price"
                    value={otherinputs?.bondRate ? otherinputs?.bondRate : null}
                    onChange={handleOtherInputs}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={"bondRate"}
                />
                 <div className='text-slate-200 bg-slate-500'>equityRate</div>
                <input
                    type="text"
                    name="equityRate"
                    id="price"
                    value={otherinputs?.equityRate ? otherinputs?.equityRate : null}
                    onChange={handleOtherInputs}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={"equityRate"}
                />
                  <div className='text-slate-200 bg-slate-500'>post_retirement_inflation</div>
                <input
                    type="text"
                    name="post_retirement_inflation"
                    id="price"
                    value={otherinputs?.post_retirement_inflation ? otherinputs?.post_retirement_inflation : null}
                    onChange={handleOtherInputs}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={"post_retirement_inflation"}
                />
                     <div className='text-slate-200 bg-slate-500'>withdrawal_rate</div>
                <input
                    type="text"
                    name="withdrawal_rate"
                    id="price"
                    value={otherinputs?.withdrawal_rate ? otherinputs?.withdrawal_rate : null}
                    onChange={handleOtherInputs}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={"withdrawal_rate"}
                />
                    <div className='text-slate-200 bg-slate-500'>post_retirement_expense_reduce_by</div>
                <input
                    type="text"
                    name="post_retirement_expense_reduce_by"
                    id="price"
                    value={otherinputs?.post_retirement_expense_reduce_by ? otherinputs?.post_retirement_expense_reduce_by : null}
                    onChange={handleOtherInputs}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={"post_retirement_expense_reduce_by"}
                />
            </div>

            {/*----------------------------------------------cashFlowDetails----------------------------------------------*/}
            <div>
                <table className="table-auto border">
                    <thead>
                        <tr>
                            <th className='border p-2 text-white'>Year </th>
                            <th className='border p-2 text-white'>Age</th>
                            <th className='border p-2 text-white'>Income</th>
                            <th className='border p-2 text-white'>expensePreRetirement</th>
                            <th className='border p-2 text-white'>expensePostRetirement</th>
                            <th className='border p-2 text-white'>Loan Repayment</th>
                            <th className='border p-2 text-white'>GoalOutFlow</th>
                            <th className='border p-2 text-white'>totalOutflow</th>
                            <th className='border p-2 text-white'>cashShortOrSurPlus</th>
                            <th className='border p-2 text-white'>savingsRate</th>
                            <th className='border p-2 text-white'>open_assets</th>
                            <th className='border p-2 text-white'>Portfolio Value(closing_assets)</th>
                            <th className='border p-2 text-white'>open_networth</th>
                            <th className='border p-2 text-white'>loanOutstanding</th>
                            <th className='border p-2 text-white'>closeing_Networth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cashflowDetails.length > 0
                            ? cashflowDetails.map((data, index) => {
                                return (
                                    <tr key={index} className='border'>
                                        <td className='border p-2 text-white'>{data.year}</td>
                                        <td className='border p-2 text-white'>{data.age}</td>
                                        <td className='border p-2 text-white'>{formatNumberWithCommas(data.income)}</td>
                                        <td className='border p-2 text-white'>{formatNumberWithCommas(customRound(data.expensePreRetirement))}</td>
                                        <td className='border p-2 text-white'>{formatNumberWithCommas(customRound(data.expensePostRetirement))}</td>
                                        <td className='border p-2 text-white'>{formatNumberWithCommas(customRound(data.loanRepayments))}</td>
                                        <td className='border p-2 text-white'>{formatNumberWithCommas(customRound(data.goalOutflow))}</td>
                                        <td className='border p-2 text-white'>{formatNumberWithCommas(customRound(data.totalOutflow))}</td>
                                        <td className='border p-2 text-white'>{formatNumberWithCommas(customRound(data.cashShortOrSurPlus))}</td>
                                        <td className='border p-2 text-white'>{formatNumberWithCommas(customRound(data.savingsRate))}</td>
                                        <td className='border p-2 text-white'>{formatNumberWithCommas(customRound(data.open_assets))}</td>
                                        <td className='border p-2 text-white'>{formatNumberWithCommas(customRound(data.closingAssets))}</td>
                                        <td className='border p-2 text-white'>{formatNumberWithCommas(customRound(data.open_networth))}</td>
                                        <td className='border p-2 text-white'>{formatNumberWithCommas(customRound(data.loanOutstanding))}</td>
                                        <td className='border p-2 text-white'>{formatNumberWithCommas(customRound(data.closeing_Networth))}</td>
                                    </tr>
                                )
                            }) : null}
                    </tbody>
                </table>
            </div>

            {/* ----------------------------------------------financial freedom ----------------------------------------------*/}
            <div className='mt-12'>
                <h1 className='text-white text-4xl text-center'>Financial Freedom </h1>
                <table className='table text-white'>
                    <tr className='border'>
                        <th className='border p-1'>Financially Freedom already</th>
                        <th className='border p-1'>Financially Freedom at age</th>
                        <th className='border p-1'>FIRE Amount</th>
                        <th className='border p-1'>Funds exhaust at age</th>
                        <th className='border p-1'>Inheritance</th>
                        <th className='border p-1'>Inheritance present value</th>
                        <th className='border p-1'>Networth at Retirement</th>
                        <th className='border p-1'>PV of networth at retirement</th>
                        <th className='border p-1'>insurance_required</th>
                        <th className='border p-1'>portfolio value</th>
                        {/* portfolio value and currentNetworth is same */}
                        {/* <th className='border p-1'>currentNetworth</th> */}
                        <th className='border p-1'>portfolio_return</th>
                    </tr>
                    <tr className='border'>
                        <th className='border p-1'>{FinancialFreedomData?.retireNow ? FinancialFreedomData?.retireNow : "-----"}</th>
                        <th className='border p-1'>{FinancialFreedomData?.financial_freedom_age ? FinancialFreedomData?.financial_freedom_age : "-----"}</th>
                        <th className='border p-1'>{Math.round(FinancialFreedomData?.fireAmount) ? Math.round(FinancialFreedomData?.fireAmount) : "-----"}</th>
                        <th className='border p-1'>{FinancialFreedomData?.fundsExhaustAtAge ? FinancialFreedomData?.fundsExhaustAtAge : "-----"}</th>
                        <th className='border p-1'>{Math.round(FinancialFreedomData?.inherit) ? Math.round(FinancialFreedomData?.inherit) : "-----"}</th>
                        <th className='border p-1'>{Math.round(FinancialFreedomData?.present_value_inherit) ? Math.round(FinancialFreedomData?.present_value_inherit) : "-----"}</th>
                        <th className='border p-1'>{Math.round(FinancialFreedomData?.retire_sum) ? Math.round(FinancialFreedomData?.retire_sum) : "-----"}</th>
                        <th className='border p-1'>{Math.round(FinancialFreedomData?.present_value_at_retire) ? Math.round(FinancialFreedomData?.present_value_at_retire) : "-----"}</th>
                        <th className='border p-1'>{Math.round(FinancialFreedomData?.insurance_required) ? Math.round(FinancialFreedomData?.insurance_required) : "-----"}</th>
                        <th className='border p-1'>{Math.round(FinancialFreedomData?.currentNetworth) ? Math.round(FinancialFreedomData?.currentNetworth) : "-----"}</th>
                        <th className='border p-1'>{FinancialFreedomData?.portfolio_return ? FinancialFreedomData?.portfolio_return * 100 : "-----"}%</th>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default DemoExp
// {
//     "retireNow": "NO",
//     "financial_freedom_age": 51,
//     "fireAmount": 94344578.02965699,
//     "fundsExhaustAtAge": "NEVER",
//     "inherit": 2148202329.9188595,
//     "present_value_inherit": 98883758.16403124,
//     "retire_sum": 280652889.02940905,
//     "present_value_at_retire": 129996590.61057577,
//     "insurance_required": 443280.2126823962,
//     "currentNetworth": 70180001,
//     "portfolio_return": 0.09
// }

    //--------------------------------------sample data for testing the loan-----------------------------------------------
    // const loanList = [
    //     { loanName: 'Car Loan', emiAmount: 672, startYear: 2023, endYear: 2026, interest: 0.08, outstandingBalance: 20000 },
    //     { loanName: 'Home Loan', emiAmount: 93724.90920347767, startYear: 2023, endYear: 2043, interest: 0.085, outstandingBalance: 10800000 }
    // ];

    // let assets = [
    //     { asset_name: 'Equity', asset_amount: 46000000, rate_of_return: 11 / 100, weightage: 50 / 100 },
    //     { asset_name: 'Bonds', asset_amount: 18500000, rate_of_return: 6 / 100, weightage: 42 / 100 },
    //     { asset_name: 'Real Estate', asset_amount: 14500000, rate_of_return: 8 / 100, weightage: 0 / 100 },
    //     { asset_name: 'Alternatives', asset_amount: 0, rate_of_return: 1 / 100, weightage: 0 / 100 },
    //     { asset_name: 'Gold', asset_amount: 1, rate_of_return: 7 / 100, weightage: 0 / 100 },
    //     { asset_name: 'Cash', asset_amount: 2000000, rate_of_return: 4 / 100, weightage: 7.1 / 100 }]

        //--------------------------------------sample data for testing the goal-----------------------------------------------
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