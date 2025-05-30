import React, { useEffect, useRef, useState } from 'react'
import RangePickerCards from '../../components/rangepickers/RangePickerCards'
import RangeInput from '../../components/rangepickers/RangeInput'
import MoneyCard from '../../components/rangepickers/MoneyCard';
import { RiEdit2Line } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux'
import Level_1_all_data, { all_level_1_data } from '../../redux/slices/Level_1_all_data';
import { newLoanWorks } from '../../calculations/LoanWorks';
import { FaPlus } from "react-icons/fa6";
import { deleteData, getData, getallmodelsfields, saveDetails, updateDetails } from '../destop_L1/server';
import { RegexNumberWithCommas, changeNumbertoComma, formatNumberWithCommas } from '../../Variable';
import { CurrencyData } from '../../constants';
import Notifier from '../../components/notifierModal/Notifier';
import { ToastContainer, toast } from 'react-toastify';
import useFetchPortfolio from '../../useFetchPortfolio/useFetchPortfolio';
import { all_financial_freedom_data } from '../../redux/slices/FinancialFreedomData';
import Networth_icon from '../../components/my-power/sidebar-icons/Networth_icon';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";
import DeleteConfirmation from '../../components/notifierModal/DeleteConfirmation';
import { MdOutlineArrowBackIos } from 'react-icons/md';


const WhatYouOwe = () => {
    const dispatch = useDispatch();
    let allData = useSelector((state) => state?.level_1_data)
    let loanData = useSelector((state) => state?.level_1_data?.loan_Data)
    const isdeleteConfirmation = useSelector((state) =>state?.Card_inputs?.deleteConfirmation);
    const allmodels = useSelector((state) =>state?.Card_inputs);
    
    const [formVisible, setformVisible] = useState(false);
    useEffect(() => {
          if (window.innerWidth < 768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
      }, []);
    let totalOutstanding = allData?.loan_data?.reduce((acc,list) => {
        const sum = Number(acc) + Number(list.outstanding_balance); 
        const finalSum = sum < 10 ? (Number(acc) + Number(list.outstanding_balance)).toFixed(2):Number(acc) + Number(list.outstanding_balance)
        return finalSum;   
     },0)

    const [inputs, setinputs] = useState({
        "loan_name": "",
        "outstanding_balance": 0,
        "emi_amount": 0,
        "start_year": new Date().getUTCFullYear(),
        "end_year": 0,
        "interest": 0,
    });
    const [loan, setloan] = useState({});
    const [index, setindex] = useState(0);
    const [section, setsection] = useState(3);
    const [mobilesection, setMobilesection] = useState(3);
    const [isMobile, setIsMobile] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] =  useState(false);
    const [deleteIndex, setDeleteIndex] =  useState({});
    const numerictype = useSelector(state => state?.statistical_Data?.numerical_format)

    // const userdetails = JSON.parse(localStorage.getItem('userdetails'));
    // const numerictype = userdetails?.user_data?.numerical_format || 'lakhs';

    const {result_chart_data} = useFetchPortfolio(allData?.loan_Data)
    
    useEffect(() => {
          if (window.innerWidth < 768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
      }, [window.innerWidth]); 
    // console.log(result_chart_data,'result');

    const handleChangeInputs = (e) => {
        let temp = { ...loan }
        if (e.target.name == "loan_name") {
            temp[e.target.name] = e.target.value;
            temp['isEdit_loan'] = true;
            setloan(temp);
            let arr = [...allData?.loan_data]
            const index = arr.indexOf(loan)
            arr[index] = temp
            dispatch(all_level_1_data({ loan_data: arr }))
        }else if (e.target.name === 'interest') {
            // Allow floating point numbers
            if (/^\d*\.?\d*$/.test(e.target.value)) {
                if(e.target.value.includes('.')){
                    temp[e.target.name] = e.target.value
                }else{
                    temp[e.target.name] = +e.target.value
                }
            }
            temp['isEdit_loan'] = true;
            setloan(temp);
        } else if (e.target.name === 'end_year') {
            // Allow floating point numbers
            if (/^\d{0,4}$/.test(e.target.value)) {
                temp[e.target.name] = +e.target.value;
            }
            temp['isEdit_loan'] = true;
            setloan(temp);
        } else {
              temp[e.target.name] = +e.target.value.replace(/,/g, '')
                temp['isEdit_loan'] = true;
                setloan(temp);
                let arr = [...allData?.loan_data]
                const index = arr.indexOf(loan)
                arr[index] = temp
                dispatch(all_level_1_data({ loan_data: arr }))
        }
    }

    const handleEdit = (obj) => {
        setloan(obj)
        // setformVisible(1)
        setsection(1)
        let new_obj = { ...obj };
        // new_obj.outstanding_balance = obj.outstanding_balance
        // new_obj.emi_amount = obj.emi_amount
        // new_obj.end_year = obj.end_year
        // setinputs(new_obj);

        // let arr = [...allData?.loan_data]
        // const newindex = arr.indexOf(obj)
        // setindex(newindex)
    }

    useEffect(() => {
        if(allData?.loan_data?.length <= 0){
            setsection(2);
        }
    }, [allData?.loan_data]);

    useEffect(() => {
        // getGoalCalculations();
    }, []);

    // for updated loan calculations
    const getGoalCalculations=async()=>{
       await saveDetails("goalcalculation", {}, (success) => {
            console.log(success,'success goal');
            // dispatch(all_level_1_data({ 
            //     result_chart_data:{
            //         ...result_chart_data, 
            //             cashflowFetched:{
            //                 ...result_chart_data.cashflowFetched, 
            //                     cashFlowDetails: success.data.message.cashflowdetail.cashFlowDetails
            //             } 
            //     },
            //     loanData: success.data.message.loans_data,
            //    }));
            dispatch(all_financial_freedom_data(success.data.message))
        }, (error) => {
            console.log(error)
            // dispatch(all_financial_freedom_data({}))
        })
    }

    const getLoanData=async()=>{
       await getData("user-all-data", (success) => {
            if (success.data.code === 200) {
                console.log(success.data,'message');
                dispatch(all_level_1_data(success.data.message))
                setTimeout(() => {
                    getGoalCalculations();
                }, 1000);
                // dispatch(all_level_1_data(success.data.message))
            }
        }, (err) => {
            console.log(err);
        })
    }

    // const showform = () => {
    //     // setformVisible(1)
    //     setsection(1)
    // }

    const handleSingleInput = (e) => {
        let newinput = { ...inputs }
        if(e.target.name === 'outstanding_balance' ){
            newinput[e.target.name] = +e.target.value.replace(/,/g,'')
            setinputs(newinput)
        }else 
        if(e.target.name === 'emi_amount'){
            newinput[e.target.name] = +e.target.value.replace(/,/g, '')
            setinputs(newinput)
        }else 
        if(e.target.name === 'end_year'){
            if (/^\d{0,4}$/.test(e.target.value)) {
                newinput[e.target.name] = e.target.value;
                setinputs(newinput)
            }
        }else if (e.target.name === 'interest') {
            // Allow floating point numbers
            if (/^\d*\.?\d*$/.test(e.target.value)) {
                if(e.target.value.includes('.')){
                    newinput[e.target.name] = e.target.value
                }else{
                    newinput[e.target.name] = +e.target.value
                }
            }
            setinputs(newinput);

            // if (/^\d*\.?\d*$/.test(e.target.value)) {
            //     newinput[e.target.name] = e.target.value;
            //     console.log(e.target.value,'here');
            //     setinputs(newinput)
            // }
        }
        else{
            newinput[e.target.name] = e.target.value
            setinputs(newinput)
        }
        
       
    }

    
    const addNew = () => {
        if ((inputs?.hasOwnProperty("loan_name") && inputs["loan_name"] !== "") &&
            (inputs?.hasOwnProperty("outstanding_balance") && inputs["outstanding_balance"] !== "") &&
            (inputs?.hasOwnProperty("end_year") && inputs["end_year"] !== "") &&
            (inputs?.hasOwnProperty("emi_amount") && +inputs["emi_amount"] !== 0)) {
            if (Number(inputs?.end_year) >= new Date().getFullYear()) {
                if (Number(inputs?.emi_amount) < Number(inputs?.outstanding_balance)) {
                    let obj = { ...inputs }
                    obj.start_year = new Date().getFullYear();
                    obj.emi_amount = +inputs.emi_amount;
                    obj.end_year = +inputs.end_year;
                    obj.interest = +inputs.interest;
                    obj.outstanding_balance = +inputs.outstanding_balance;
                    obj.login_form_number = 3
                    saveDetails("loan", obj, (success) => {
                        if (success.data.code === 200) {
                            console.log(allData.loan_Data,'loan');
                            let loanData = allData?.loan_data? allData?.loan_data: []
                            let arr = [...loanData, { ...inputs, id: success.data.message.id }]
                            console.log(arr,'arries');
                            toast.success(success.data.status_message)
                            dispatch(all_level_1_data({ loan_data: arr }))
                            getLoanData();
                            // setTimeout(() => {
                            //     getGoalCalculations();
                            // }, 2000);
                            // arr.push(inputs)
                           
                            // handleNextClick(3);
                            setsection(3)
                            setinputs({ loan_name: "", outstanding_balance: "", end_year: "", emi_amount: "", interest: "" });
                        }
                    }, (error) => {
                        console.log(error)
                    })

                } else {
                    toast.warn("EMI amount could not be greater than outstanding balance");
                }
            } else {
                toast.warn("End year could not be less than current year");
            }
        } else {
            toast.warn("Please fill all the fields");
        }
  
    }



    const deleteLoan = (loan, index) => {
        // dispatch(updateCradInputs({deleteConfirmation: true, loan: loan, index:index}))
        // deleteHandler(loan, index)

        if (loan) {
            deleteData("loan", loan.id, (success) => {
                if (success.data.code === 200) {
                    toast.success(success.data.status_message)
                    const newdata = [...allData?.loan_data];
                    const updatedDelete = newdata.filter(list => list.id !== loan.id)
                    dispatch(all_level_1_data({ loan_data: updatedDelete }))
                    getLoanData();
                    // setTimeout(() => {
                    //     getGoalCalculations();
                    // }, 2000);
                }

            }, (error) => {
                console.log(error)
            })
            // dispatch(updateCradInputs({deleteConfirmation: false}))
        }
    }


    const updateLoan = () => {
        if((loan.hasOwnProperty('loan_name') && loan['loan_name'] !== '')
        && (loan.hasOwnProperty('outstanding_balance') && loan['outstanding_balance'] !== 0)
        && (loan.hasOwnProperty('emi_amount') && loan['emi_amount'] !== 0)
        && (loan.hasOwnProperty('interest') && loan['interest'] !== 0)
        && (loan.hasOwnProperty('end_year') && loan['end_year'] !== 0)
        ){
            if(loan['end_year'] > new Date().getFullYear()){
                if(loan['interest'] < 100){
                    if (Number(loan?.emi_amount) < Number(loan?.outstanding_balance)){
                        updateDetails(loan.id, "loan", loan, (success) => {
                            if (success.data.code === 200) {
                                toast(success.data.status_message)
                                // handleNextClick(3);
                                getLoanData();
                            
                                setsection(3)
                                setloan({ loan_name: "", outstanding_balance: "", end_year: "", emi_amount: "", interest: "" });
                            }
                        }, (error) => {
                            console.log(error)
                        })
                    }else{
                        toast.warn('EMI amount could not be greater than outstanding balance');
                    }
                }else{
                    toast.warn('Interest should be less than 100');
                }
            }else{
                toast.warn('EMI end year should not be less than present year');
            }
        }else{
            toast.warn('Please fill all the input fields')
        }
    }

    const CurrencyFinder=()=>{
        // const userdetails = JSON.parse(localStorage.getItem('userdetails'));
        // const numerictype = userdetails?.user_data?.numerical_format || 'lakhs';
        if(numerictype == 'millions'){
            return <FaDollarSign />;
        } else if(allmodels?.preferred_currency){
          const selectedCurrency = CurrencyData?.find(currency => currency.currencyIndex == allmodels?.preferred_currency).symbol
          return selectedCurrency;
        } else{
            return <FaIndianRupeeSign />;
          }
      }

      const confirmationText = "Are you sure you want to delete"

      
    const cancelHandler = () => {
        setDeleteConfirmation(false);
        // dispatch(updateCradInputs({ deleteConfirmation: false }))
    }

    const deleteHandler=()=>{
           //    clickDelete(goal, goal?.id)
        deleteLoan(deleteIndex, deleteIndex?.id)
        setDeleteConfirmation(false);
    }

    const WhatYouOwnDesktopView =()=>{
        return(
            section == 1 ? //---------------for update loans------------------------//
            <MoneyCard isBack={true} onbackClick={() => setsection(3)} heading={"What You OWE"} Icon={Networth_icon} amount={changeNumbertoComma(totalOutstanding || 0,numerictype) } addbtn={true} style={{ backgroundColor: "#B4DAF6" }} clickBtn={() => setsection(2)}>
                <div className='px-8 py-6 md:p-12 flex flex-col gap-2 max-h-[320px] overflow-y-auto overflow-x-hidden'>
                    <div className='md:mx-10 flex flex-col gap-8 md:gap-5'>
                        {/* <div className='flex justify-between gap-6 '>
                            <button className='text-4xl bg-transparent' onClick={back}><IoIosArrowDropleftCircle color='#B5B5B5' /></button>
                            <p className='text-xl px-4 flex-1 text-center py-1 rounded-2xl border-desk-light-blue-2 text-desk-light-blue-2' style={{ background: 'rgba(220, 220, 220, 0.10)' }}>{loan.loan_name}</p>
                            <button className='text-4xl' onClick={next}><IoIosArrowDroprightCircle color='#B5B5B5' /></button>
                        </div> */}
                        {/* outstanding balance  */}
                        {/* <RowInputs inputName={"Outstanding Balance"} /> */}

                        <div className='flex items-center justify-between'>
                            <p className="text-grey-3 text-base font-normal font-['Montserrat'] leading-[18.48px]">What is this Loan for</p>
                            {/* <button className='text-desk-light-blue-2'><RiDeleteBin6Line /></button> */}
                        </div>

                        <div className='flex bg-grey-4 py-2 px-4 border border-slate-400 rounded-2xl input-border-none' style={{ background: "#DCDCDC1A" }}>
                            <textarea placeholder='Eg- Car Loan' className='bg-transparent text-blue-200 text-xl font-medium font-["Montserrat"] w-full input-border-none' name="loan_name" rows={1} cols="30" value={loan?.loan_name} onChange={handleChangeInputs}></textarea>
                        </div>

                        <div className='flex flex-wrap items-center justify-between'>
                            <div className='max-w-[102px] text-left'>
                                <p className='text-grey-3'>{"Outstanding Balance"}</p>
                            </div>
                            <div className='flex ml-auto items-center bg-grey-4 w-[159px] py-[6.5px] border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal font-Work_Sans text-xs input-border-none' style={{ background: "#DCDCDC1A" }}>
                                <span className='text-lg me-1'><CurrencyFinder /></span>
                                <input type="text"
                                    autoFocus
                                    onChange={handleChangeInputs}
                                    name='outstanding_balance'
                                    // value={changeNumbertoComma(loan?.outstanding_balance ? formatNumberWithCommas(loan?.outstanding_balance.toString()) : "")}
                                    value={changeNumbertoComma(loan?.outstanding_balance? loan?.outstanding_balance.toString() : '')}
                                    className={`max-w-[110px] font-semibold font-Work_Sans input-border-none bg-transparent text-xl`}
                                />
                            </div>
                            <div className="flex-grow basis-full">
                                <RangeInput className='progress  w-full' name="outstanding_balance" value={isNaN(loan?.outstanding_balance) == false? loan?.outstanding_balance: 0} min="0" max="100000000" style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(loan?.outstanding_balance || 0) / 100000000 * 100}%, #676767 ${(loan?.outstanding_balance || 0) / 100000000 * 100}%, #676767 100%)` }} onChange={handleChangeInputs} />
                                {/* <input type="range"  className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleChangeInputs(e)} /> */}
                            </div>
                        </div>

                        {/* EMI Amount */}
                        <div className='flex flex-wrap items-center justify-between'>
                            <div className='max-w-[102px] text-left'>
                                <p className='text-grey-3'>{"EMI Amount"}</p>
                            </div>
                            <div className='flex ml-auto items-center w-[149px] bg-grey-4 py-[6.5px] border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal font-Work_Sans text-xs input-border-none' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                <span className='text-lg me-1'><CurrencyFinder /></span>
                                <input type="text"
                                    autoFocus
                                    name='emi_amount'
                                    onChange={handleChangeInputs}
                                    value={changeNumbertoComma(loan?.emi_amount ? loan?.emi_amount.toString() : "")}
                                    // value={NumericFormatConversion(loan?.emi_amount )}
                                    className={`max-w-[110px] md:max-w-[100px] font-semibold font-Work_Sans input-border-none bg-transparent text-xl leading-3`}
                                />
                            </div>
                            <div className="flex-grow w-full">
                                <RangeInput className='progress w-full' name="emi_amount" value={isNaN(loan?.emi_amount) == false?loan?.emi_amount:0} min="0" max="1000000" style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(loan?.emi_amount || 0) / 1000000 * 100}%, #676767 ${(loan?.emi_amount || 0) / 1000000 * 100}%, #676767 100%)` }} onChange={handleChangeInputs} />
                            </div>
                        </div>

                        {/* loan interest rate */}
                        <div className='flex flex-wrap md:flex-nowrap items-center justify-between md:gap-6'>
                            <div className='max-w-[102px] order-1 text-left'>
                                <p className='text-grey-3'>{"Loan Interest Rate"}</p>
                            </div>

                            <div className="flex-grow order-3 md:order-2">
                                <RangeInput className='progress w-full' name="interest" value={loan?.interest} min="0" max="100" step={0.1} style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${loan?.interest || 0}%, #676767 ${loan?.interest || 0}%, #676767 100%)` }} onChange={handleChangeInputs} />
                            </div>

                            <div className='flex items-center bg-grey-4 w-[80px] py-[6.5px] border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal font-Work_Sans text-xs input-border-none order-2 md:order-3' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                <input type="text"
                                    autoFocus
                                    onChange={handleChangeInputs}
                                    value={loan?.interest}
                                    name='interest'
                                    max={100}
                                    maxLength={4}
                                    className={`text-center max-w-[127px] md:max-w-[45px] font-semibold font-Work_Sans input-border-none bg-transparent text-xl leading-3`}
                                />
                                <span className='text-lg'>%</span>
                            </div>
                        </div>

                        {/* EMI Ends in year */}
                        <div className='flex flex-wrap items-center justify-between'>
                            <div className='max-w-[144px] text-left'>
                                <p className='text-grey-3'>{"EMI Ends in year"}</p>
                            </div>

                            <div className='flex items-center bg-grey-4 w-20 py-2 border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-medium font-Work_Sans text-lg input-border-none' style={{ background: "#DCDCDC1A" }}>
                                <input type="text"
                                    autoFocus
                                    onChange={handleChangeInputs}
                                    value={loan?.end_year}
                                    name='end_year'
                                    max={100}
                                    maxLength={4}
                                    className={`w-full text-center font-semibold font-Work_Sans input-border-none bg-transparent text-xl leading-3`}
                                />
                            </div>
                        </div>

                        <button className='px-4 py-2 bg-blue-200 rounded-2xl ext-cyan-950 text-base font-bold font-["Montserrat"] leading-[21.12px] w-max mx-auto' onClick={updateLoan}>Update & View All</button>
                    </div>
                </div>
            </MoneyCard>
            :
            section == 2 ?
                <MoneyCard isBack={true} onbackClick={() => setsection(3)} Icon={Networth_icon} hideinput={"hidden md:block"} heading={"What You OWE"} subheading={""}  addbtn={true} style={{ background: "#B4DAF6" }} clickBtn={() => setsection(2)}>
                    <div className='p-12 flex flex-col gap-2 max-h-[270px] lg:overflow-y-auto max-md:px-6 max-md:pt-9'>
                        {/* first  */}
                        <div className='flex flex-col gap-11 max-md:px-10  items-center'>
                            <div className="w-[316px] text-center lg:text-gray-200 max-md:text-[#B5B5B5] text-lg max-md:w-40 max-md:text-sm max-md:italic font-bold max-md:font-normal font-['Montserrat'] leading-snug">Add some Loans & plan your life ahead</div>
                            <div className="w-[200px] h-[46px] p-3 bg-blue-200 rounded-[15px] shadow justify-start items-center gap-4 inline-flex">
                                <button className="grow shrink basis-0 self-stretch text-center text-cyan-950 text-lg font-semibold font-['Montserrat'] leading-snug" onClick={() => setsection(4)}>Add a Loan</button>
                            </div>

                        </div>
                    </div>
                </MoneyCard> :
                section == 3 ?
                    <MoneyCard Icon={Networth_icon} hideinput={"hidden md:block"} heading={"What You OWE"} subheading={""} amount={changeNumbertoComma(totalOutstanding|| 0,numerictype)} addbtn={true} style={{ background: "#B4DAF6" }} clickBtn={() => setsection(2)}>
                        <div className='p-12 flex flex-col gap-2 max-h-[314px] overflow-y-auto scrollbar-hide'>
                            {allData?.loan_data ?
                                allData?.loan_data.map((loan, index) => (
                                    <div key={loan?.id} className='w-full flex justify-between ps-5 pe-4 py-3 rounded-[20px]' style={{ boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.25)", background: "rgba(236, 236, 236, 0.20)" }}>
                                        <p className='text-grey-2 text-lg font-medium'>{loan.loan_name}</p>
                                        <div className='flex gap-4'>
                                            <button className='text-desk-light-blue-2 scale-125' onClick={() => handleEdit(loan)}><RiEdit2Line /></button>
                                            <button className='text-desk-light-blue-2 scale-125' onClick={() => {
                                                    setDeleteConfirmation(true);
                                                    setDeleteIndex(loan);
                                                    // deleteLoan(loan, index);
                                            }}><RiDeleteBin6Line /></button>
                                        </div>
                                    </div>
                                )):(
                                    <div className='p-12 flex flex-col gap-2 max-h-[270px] lg:overflow-y-auto max-md:px-6 max-md:pt-9 scrollbar-hide'>
                                    {/* first  */}
                                    <div className='flex flex-col gap-11 max-md:px-10  items-center'>
                                        <div className="w-[316px] text-center lg:text-gray-200 max-md:text-[#B5B5B5] text-lg max-md:w-40 max-md:text-sm max-md:italic font-bold max-md:font-normal font-['Montserrat'] leading-snug">Add some Loans & plan your life ahead</div>
                                        <div className="w-[200px] h-[46px] p-3 bg-blue-200 rounded-[15px] shadow justify-start items-center gap-4 inline-flex">
                                            <button className="grow shrink basis-0 self-stretch text-center text-cyan-950 text-lg font-semibold font-['Montserrat'] leading-snug" onClick={() => setsection(4)}>Add a Loan</button>
                                        </div>
            
                                    </div>
                                </div>
                                )}
                        </div>
                    </MoneyCard> :
                    section == 4 ? //----------------for adding loan------------------//
                        <MoneyCard isBack={true} onbackClick={() => setsection(3)} Icon={Networth_icon} heading={"What You OWE"} amount={changeNumbertoComma(totalOutstanding || 0,numerictype)} addbtn={true} style={{ backgroundColor: "#B4DAF6" }} clickBtn={() => setsection(2)}>
                            <div className='px-8 py-6 md:p-12 flex flex-col gap-2 max-h-[320px] overflow-y-auto overflow-x-hidden'>
                                <div className='md:mx-10 flex flex-col gap-8 md:gap-5'>
                                    <div className='flex items-center justify-between'>
                                        <p className="text-zinc-400 text-base font-normal font-['Montserrat'] leading-[18.48px]">What is this Loan for</p>
                                    </div>
                                    <div className='flex bg-grey-4 py-2 px-4 border border-slate-400 rounded-2xl input-border-none' style={{ background: "#DCDCDC1A" }}>
                                        <textarea placeholder='Eg- Car Loan' className='bg-transparent text-blue-200 text-xl font-medium font-["Montserrat"] w-full input-border-none' name="loan_name" rows={1} cols="30" value={inputs?.loan_name} onChange={handleSingleInput}></textarea>
                                    </div>
                                    <div className='flex flex-wrap items-center justify-between'>
                                        <div className='max-w-[102px] md:max-w-auto'>
                                            <p className='text-grey-3 text-left'>{"Outstanding Balance"}</p>
                                        </div>
                                        <div className='flex ml-auto items-center bg-grey-4 min-w-48 py-[6.5px] border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal font-Work_Sans text-xs input-border-none' style={{ background: "#DCDCDC1A" }}>
                                            <span className='me-2 text-lg'><CurrencyFinder /></span>
                                            <input type="text"
                                                autoFocus
                                                onChange={handleSingleInput}
                                                name='outstanding_balance'
                                                value={changeNumbertoComma(inputs?.outstanding_balance? inputs?.outstanding_balance.toString(): '')}
                                                // value={NumericFormatConversion(inputs?.outstanding_balance)}
                                                className={`max-w-[110px] font-semibold font-Work_Sans input-border-none bg-transparent text-xl`}
                                            />
                                        </div>
                                        <div className="flex-grow basis-full">
                                            <RangeInput className='progress  w-full' name="outstanding_balance"
                                                value={+inputs?.outstanding_balance || 0} min="0" max="10000000"
                                                style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(Number(inputs?.outstanding_balance) || 0) / 10000000 * 100}%, #676767 ${(inputs?.outstanding_balance || 0) / 10000000 * 100}%)` }}
                                                onChange={handleSingleInput} />
                                        </div>
                                    </div>
                                    {/* EMI Amount */}
                                    <div className='flex flex-wrap items-center justify-between'>
                                        <div className=''>
                                            <p className='text-grey-3'>{"EMI Amount"}</p>
                                        </div>
                                        <div className='flex ml-auto items-center bg-grey-4 py-[8px] border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal font-Work_Sans text-xs input-border-none' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                            <span className='me-2 text-lg'><CurrencyFinder /></span>
                                            <input type="text"
                                                autoFocus
                                                name='emi_amount'
                                                onChange={handleSingleInput}
                                                value={changeNumbertoComma(inputs?.emi_amount? inputs?.emi_amount.toString(): '')}
                                                // value={NumericFormatConversion(inputs?.emi_amount)}
                                                className={`max-w-[127px] md:max-w-[147px] font-semibold font-Work_Sans input-border-none bg-transparent text-xl leading-3`}
                                            />
                                        </div>
                                        <div className="flex-grow w-full">
                                            <RangeInput className='progress w-full' name="emi_amount"
                                                value={+inputs?.emi_amount || 0} min="0" max="1000000"
                                                style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(Number(inputs?.emi_amount) || 0) / 1000000 * 100}%, #676767 ${(Number(inputs?.emi_amount) || 0) / 1000000 * 100}%)` }}
                                                onChange={handleSingleInput} />

                                        </div>
                                    </div>

                                    {/* loan interest rate */}
                                    <div className='flex flex-wrap md:flex-nowrap items-center justify-between md:gap-6'>
                                        <div className='max-w-[70%] md:max-w-[80px] order-1 text-left'>
                                            <p className='text-grey-3'>{"Loan Interest Rate"}</p>
                                        </div>

                                        <div className="flex-grow order-3 md:order-2">
                                            <RangeInput className='progress w-full' name="interest" value={inputs?.interest} min="0" max="100" step={0.1} style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${inputs?.interest || 0}%, #676767 ${inputs?.interest || 0}%, #676767 100%)` }} onChange={handleSingleInput} />
                                        </div>

                                        <div className='flex items-center bg-grey-4 w-[85px] py-[8px] border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal font-Work_Sans text-xs input-border-none order-2 md:order-3' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                            <input type="text"
                                                autoFocus
                                                onChange={handleSingleInput}
                                                value={inputs?.interest}
                                                name='interest'
                                                className={`max-w-[127px] text-center md:max-w-[50px] font-semibold font-Work_Sans input-border-none bg-transparent text-xl leading-3`}
                                                maxLength={4}
                                            />
                                            <span className='text-slate-200 text-lg'>%</span>
                                        </div>
                                    </div>

                                    {/* EMI Ends in year */}
                                    <div className='flex flex-wrap items-center justify-between'>
                                        <div className='min-w-[144px]'>
                                            <p className='text-grey-3'>{"EMI Ends in year"}</p>
                                        </div>

                                        <div className='flex items-center text-center bg-grey-4 w-[85px] py-[8px] border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal font-Work_Sans text-xs input-border-none' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                            <input type="text"
                                                autoFocus
                                                onChange={handleSingleInput}
                                                value={inputs?.end_year}
                                                name='end_year'
                                                className={`w-full text-center font-semibold font-Work_Sans input-border-none bg-transparent text-xl leading-3`}
                                                maxLength={4}
                                            />
                                        </div>
                                    </div>

                                    <button className='px-6 py-3 bg-blue-200 text-slate-700 rounded-2xl ext-cyan-950 text-lg font-bold font-["Montserrat"] leading-[21.12px] w-max mx-auto' onClick={addNew}>Add & View All</button>
                                </div>
                            </div>
                        </MoneyCard> : null
        
        )
    }
    
    const WhatYouOwnMobileView =()=>{
        return(
            section == 1 ? //---------------for update loans------------------------//
            <MoneyCard isBack={true} onbackClick={() => setsection(3)} subheading={`${isMobile ? 'What You':''}`}  heading={ `${isMobile ? 'OWE' :"What You OWE"}`} Icon={Networth_icon}  addbtn={true} style={{ backgroundColor: "#B4DAF6" }} clickBtn={() => setsection(2)}>
                <div className='px-8 py-6 md:p-12 flex flex-col gap-2 max-h-[320px] overflow-y-auto overflow-x-hidden scrollbar-hide border-2 rounded-b-3xl border-solid shadow-2xl border-desk-light-blue-2'>
                    <div className='md:mx-10 flex flex-col gap-8 md:gap-5'>
                        {/* <div className='flex justify-between gap-6 '>
                            <button className='text-4xl bg-transparent' onClick={back}><IoIosArrowDropleftCircle color='#B5B5B5' /></button>
                            <p className='text-xl px-4 flex-1 text-center py-1 rounded-2xl border-desk-light-blue-2 text-desk-light-blue-2' style={{ background: 'rgba(220, 220, 220, 0.10)' }}>{loan.loan_name}</p>
                            <button className='text-4xl' onClick={next}><IoIosArrowDroprightCircle color='#B5B5B5' /></button>
                        </div> */}
                        {/* outstanding balance  */}
                        {/* <RowInputs inputName={"Outstanding Balance"} /> */}
                        <div className='flex flex-col gap-2 items-start'>
                            <div className='flex items-center justify-between'>
                                <p className="text-zinc-400 text-sm font-normal font-['Montserrat'] leading-[18.48px]">What is this Loan for</p>
                                {/* <button className='text-desk-light-blue-2'><RiDeleteBin6Line /></button> */}
                            </div>

                            <div className='flex bg-grey-4 py-2 px-4 border border-slate-400 rounded-2xl input-border-none' style={{ background: "#DCDCDC1A" }}>
                                <textarea placeholder='Eg- Car Loan' className='bg-transparent text-blue-200 text-base font-semibold font-["Montserrat"] w-full input-border-none' name="loan_name" rows={1} cols="30" value={loan?.loan_name} onChange={handleChangeInputs}></textarea>
                            </div>
                        </div>

                        <div className='flex flex-wrap items-center justify-between'>
                                <div className='flex'>
                                    <div className='max-w-[102px] max-md:max-w-auto '>
                                        <p className='text-grey-3 font-medium text-sm'>{"Outstanding Balance"}</p>
                                    </div>
                                    <div className='flex ml-auto items-center bg-grey-4 font-Work_Sans py-1 border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal text-xs input-border-none' style={{ background: "#DCDCDC1A" }}>
                                        <span className='text-lg'><CurrencyFinder /></span>
                                        <input type="text"
                                            autoFocus
                                            onChange={handleChangeInputs}
                                            name='outstanding_balance'
                                            // value={changeNumbertoComma(loan?.outstanding_balance ? formatNumberWithCommas(loan?.outstanding_balance.toString()) : "")}
                                            value={changeNumbertoComma(loan?.outstanding_balance? loan?.outstanding_balance.toString(): '')}
                                            className={`max-w-[127px] max-md:max-w-[100px] font-medium  input-border-none bg-transparent text-lg leading-3`}
                                        />
                                    </div>
                                </div>
                            <div className="flex-grow basis-full">
                                <RangeInput className='progress  w-full' name="outstanding_balance" value={isNaN(loan?.outstanding_balance) == false?loan?.outstanding_balance: 0} min="0" max="100000000" style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(loan?.outstanding_balance || 0) / 100000000 * 100}%, #676767 ${(loan?.outstanding_balance || 0) / 100000000 * 100}%, #676767 100%)` }} onChange={handleChangeInputs} />
                                {/* <input type="range"  className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleChangeInputs(e)} /> */}
                            </div>
                        </div>

                        {/* EMI Amount */}
                        <div className='flex flex-wrap items-center justify-between'>
                                <div className='flex items-center justify-between w-full'>
                                    <div className=''>
                                        <p className='text-grey-3 font-medium text-sm'>{"EMI Amount"}</p>
                                    </div>
                                    <div className='flex ml-auto items-center bg-grey-4 font-Work_Sans py-1 border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal text-xs input-border-none' style={{ background: "#DCDCDC1A" }}>
                                        <span className='text-lg me-1'><CurrencyFinder /></span>
                                        <input type="text"
                                            autoFocus
                                            name='emi_amount'
                                            onChange={handleChangeInputs}
                                            // value={changeNumbertoComma(loan?.emi_amount ? loan?.emi_amount.toString() : "")}
                                            value={changeNumbertoComma(loan?.emi_amount) || ''}
                                            className={`max-w-[127px] max-md:max-w-[100px] font-medium  input-border-none bg-transparent text-lg leading-3`}
                                        />
                                    </div>
                                </div>
                            <div className="flex-grow w-full">
                                <RangeInput className='progress w-full' name="emi_amount" value={loan?.emi_amount} min="0" max="1000000" style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(loan?.emi_amount || 0) / 1000000 * 100}%, #676767 ${(loan?.emi_amount || 0) / 1000000 * 100}%, #676767 100%)` }} onChange={handleChangeInputs} />
                            </div>
                        </div>

                        {/* loan interest rate */}
                        <div className='flex flex-wrap md:flex-nowrap items-center justify-between md:gap-6'>
                            <div className='max-w-[70%] md:max-w-[65px] order-1'>
                                <p className='text-grey-3 font-medium text-sm'>{"Loan Interest Rate"}</p>
                            </div>

                            <div className="flex-grow order-3 md:order-2">
                                <RangeInput className='progress w-full' name="interest" value={loan?.interest} min="0" max="100" step={0.1} style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${loan?.interest || 0}%, #676767 ${loan?.interest || 0}%, #676767 100%)` }} onChange={handleChangeInputs} />
                            </div>

                            <div className='flex items-center bg-grey-4 w-[80px] py-[6.5px] border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal font-Work_Sans text-xs input-border-none order-2 md:order-3' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                <input type="text"
                                    autoFocus
                                    onChange={handleChangeInputs}
                                    value={loan?.interest}
                                    name='interest'
                                    max={100}
                                    maxLength={4}
                                    className={`text-center max-w-[127px] max-md:max-w-[45px] font-normal font-Work_Sans input-border-none bg-transparent text-lg leading-3`}
                                />
                                <span className='text-lg'>%</span>
                            </div>
                        </div>

                        {/* EMI Ends in year */}
                        <div className='flex flex-wrap items-center justify-between'>
                            <div className='min-w-[144px]'>
                                <p className='text-grey-3 font-medium text-sm'>{"EMI Ends in year"}</p>
                            </div>

                            <div className='flex items-center bg-grey-4 w-[60px] py-[8px] border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal font-Work_Sans text-xs input-border-none' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                <input type="text"
                                    autoFocus
                                    onChange={handleChangeInputs}
                                    value={loan?.end_year}
                                    name='end_year'
                                    maxLength={4}
                                    className={`w-full font-normal font-Work_Sans input-border-none bg-transparent text-lg leading-3`}
                                />
                            </div>
                        </div>

                        <button className='px-4 py-2 bg-blue-200 rounded-2xl ext-cyan-950 text-base font-bold font-["Montserrat"] leading-[21.12px] w-max mx-auto' onClick={updateLoan}>Update & View All</button>
                    </div>
                </div>
            </MoneyCard>
            :
            section == 2 ?
                <MoneyCard isBack={true} onbackClick={() => setsection(3)} Icon={Networth_icon} hideinput={"hidden md:block"} subheading={`${isMobile ? 'What You':''}`}  heading={ `${isMobile ? 'OWE' :"What You OWE"}`} amount={changeNumbertoComma(totalOutstanding || 0,numerictype)} addbtn={true} style={{ background: "#B4DAF6" }} clickBtn={() => setsection(2)}>
                    <div className={`p-12 flex flex-col justify-center gap-2 min-h-[314px] max-h-[314px] lg:overflow-y-auto max-md:px-6 max-md:pt-9 border-2 rounded-b-3xl border-solid shadow-2xl border-desk-light-blue-2`}>
                        {/* first  */}
                        <div className='flex flex-col gap-11 max-md:px-10 items-center'>
                            <div className="w-[316px] text-center lg:text-gray-200 max-md:text-[#B5B5B5] text-lg max-md:w-40 max-md:text-sm max-md:italic font-bold max-md:font-normal font-['Montserrat'] leading-snug">Add some Loans & plan your life ahead</div>
                            <div className="w-[200px] h-[46px] p-3 bg-transparent rounded-[15px] shadow justify-start items-center gap-4 inline-flex">
                                <button className="grow shrink basis-0 flex items-center justify-between px-4 py-3 text-center text-blue-200 border-2 border-blue-200 rounded-2xl p-2 text-lg font-semibold font-['Montserrat'] leading-snug" onClick={() => setsection(4)}>
                                    <span>Add a Loan</span> <span><FaPlus/></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </MoneyCard> :
                section == 3 ?
                    <MoneyCard subheading={`${isMobile ? `What You`:''}`}  heading={ `${isMobile ? 'OWE' :"What You OWE"}`} Icon={Networth_icon} hideinput={"hidden md:block"} amount={changeNumbertoComma(totalOutstanding || 0,numerictype)} addbtn={true} style={{ background: "#B4DAF6" }} clickBtn={() => setsection(2)}>
                        <div className='p-6 flex flex-col gap-2 min-h-[314px] max-h-[314px] overflow-y-auto min-w-72 border-2 rounded-b-3xl border-solid shadow-2xl border-desk-light-blue-2'>
                           
                            {allData?.loan_data?.length > 0  && allData?.loan_data ?
                                    <>
                                        <div>
                                            <button onClick={() => setsection(2)} className='text-desk-light-blue-2 border-2 border-desk-light-blue-2 flex items-center justify-between bg-tranparent rounded-2xl py-3 px-2 min-w-60'>
                                                <span className='ms-6 font-bold'>Add A Loan</span> <span className='me-2'><FaPlus /></span>
                                            </button>
                                        </div>
                                   { allData?.loan_data.map((loan, index) => (
                                        <div key={loan?.id} className='w-full flex justify-between ps-5 pe-4 py-3 rounded-[20px]' style={{ boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.25)", background: "rgba(236, 236, 236, 0.20)" }}>
                                            <p className='text-grey-2'>{loan.loan_name}</p>
                                            <div className='flex gap-2'>
                                                <button className='text-desk-light-blue-2' onClick={() => handleEdit(loan)}><RiEdit2Line /></button>
                                                <button className='text-desk-light-blue-2' onClick={() => {
                                                      setDeleteConfirmation(true);
                                                      setDeleteIndex(loan);
                                                    //   deleteLoan(loan, index)
                                                } }><RiDeleteBin6Line /></button>
                                            </div>
                                        </div>
                                ))}
                                    </>
                                :(
                                        <div className='flex flex-col gap-11 max-md:px-10 items-center'>
                                            <div className="w-[316px] text-center lg:text-gray-200 max-md:text-[#B5B5B5] text-lg max-md:w-40 max-md:text-sm max-md:italic font-bold max-md:font-normal font-['Montserrat'] leading-snug">Add some Loans & plan your life ahead</div>
                                            <div className="w-[200px] h-[46px] p-3 bg-transparent rounded-[15px] shadow justify-start items-center gap-4 inline-flex">
                                                <button className="grow shrink basis-0 flex items-center justify-between px-4 py-3 text-center text-blue-200 border-2 border-blue-200 rounded-2xl p-2 text-lg font-semibold font-['Montserrat'] leading-snug" onClick={() => setsection(4)}>
                                                    <span>Add a Loan</span> <span><FaPlus /></span>
                                                </button>
                                            </div>

                                        </div>
                                )}
                        </div>
                    </MoneyCard> :
                    section == 4 ? //----------------for adding loan------------------//
                        <MoneyCard subheading={`${isMobile ? `What You`:''}`}  heading={ `${isMobile ? 'OWE' :"What You OWE"}`} Icon={Networth_icon} amount={changeNumbertoComma(totalOutstanding || 0,numerictype)} addbtn={true} style={{ backgroundColor: "#B4DAF6" }} clickBtn={() => setsection(2)}>
                            <div className='px-8 py-6 md:p-12 flex flex-col gap-2 max-h-[320px] overflow-y-auto overflow-x-hidden'>
                                <div onClick={() =>setsection(3)} className='text-desk-light-blue-2 flex items-center text-sm py-2 gap-1'><span className='scale-125'><MdOutlineArrowBackIos/></span>View All</div>
                                <div className='md:mx-10 flex flex-col gap-8 md:gap-5'>
                                        <div className='flex flex-col gap-2 items-start'>
                                            <div className='flex items-center justify-between'>
                                                <p className="text-zinc-400 text-sm font-normal font-['Montserrat'] leading-[18.48px]">What is this Loan for</p>
                                            </div>
                                            <div className='flex bg-grey-4 py-2 px-4 border border-slate-400 rounded-2xl input-border-none' style={{ background: "#DCDCDC1A" }}>
                                                <textarea autoFocus placeholder='Eg- Car Loan' className='bg-transparent text-blue-200 text-xl font-medium font-["Montserrat"] w-full input-border-none' name="loan_name" rows={1} cols="30" value={inputs?.loan_name} onChange={handleSingleInput}></textarea>
                                            </div>

                                        </div>
                                    <div className='flex flex-wrap items-center justify-between'>
                                            <div className='flex'>
                                                <div className='max-w-[102px] md:max-w-auto'>
                                                    <p className='text-grey-3 font-medium text-sm'>{"Outstanding Balance"}</p>
                                                </div>
                                                <div className='flex ml-auto items-center bg-grey-4 font-Work_Sans py-1 border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal text-xs input-border-none' style={{ background: "#DCDCDC1A" }}>
                                                    <span className='text-lg'><CurrencyFinder /></span>
                                                    <input type="text"
                                                        onChange={handleSingleInput}
                                                        name='outstanding_balance'
                                                        value={changeNumbertoComma(inputs?.outstanding_balance? inputs?.outstanding_balance.toString(): '')}
                                                        // value={NumericFormatConversion(inputs?.outstanding_balance)}
                                                        className={`max-w-[127px] max-md:max-w-[100px] font-medium  input-border-none bg-transparent text-lg leading-3`}
                                                    />
                                                </div>
                                            </div>
                                        <div className="flex-grow basis-full">
                                            <RangeInput className='progress  w-full' name="outstanding_balance"
                                                value={+inputs?.outstanding_balance} min="0" max="10000000"
                                                style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(Number(inputs?.outstanding_balance) || 0) / 10000000 * 100}%, #676767 ${(inputs?.outstanding_balance || 0) / 10000000 * 100}%)` }}
                                                onChange={handleSingleInput} />
                                        </div>
                                    </div>
                                    {/* EMI Amount */}
                                    <div className='flex flex-wrap items-center justify-between'>
                                            <div className='flex items-center w-full'>
                                                <div className='max-w-[102px] max-md:max-w-auto '>
                                                    <p className='text-grey-3 font-medium text-sm'>{"EMI Amount"}</p>
                                                </div>
                                                <div className='flex ml-auto items-center bg-grey-4 font-Work_Sans py-1 border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal text-xs input-border-none' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                                    <span className='text-lg'><CurrencyFinder /></span>
                                                    <input type="text"
                                                        name='emi_amount'
                                                        onChange={handleSingleInput}
                                                        value={changeNumbertoComma(inputs?.emi_amount.toString())}
                                                        // value={NumericFormatConversion(inputs?.emi_amount)}
                                                        className={`max-w-[127px] max-md:max-w-[100px] font-medium  input-border-none bg-transparent text-lg leading-3`}
                                                    />
                                                </div>
                                            </div>
                                        <div className="flex-grow w-full">
                                            <RangeInput className='progress w-full' name="emi_amount"
                                                value={+inputs?.emi_amount} min="0" max="1000000"
                                                style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${(Number(inputs?.emi_amount) || 0) / 1000000 * 100}%, #676767 ${(Number(inputs?.emi_amount) || 0) / 1000000 * 100}%)` }}
                                                onChange={handleSingleInput} />

                                        </div>
                                    </div>

                                    {/* loan interest rate */}
                                    <div className='flex flex-wrap md:flex-nowrap items-center justify-between md:gap-6'>
                                        <div className='max-w-[70%] md:max-w-[80px] order-1'>
                                            <p className='text-grey-3 font-medium text-sm'>{"Loan Interest Rate"}</p>
                                        </div>

                                        <div className="flex-grow order-3 md:order-2">
                                            <RangeInput className='progress w-full' name="interest" value={inputs?.interest} min="0" max="100" step={0.1} style={{ background: `linear-gradient(to right, #b4daf6 0%, #b4daf6 ${inputs?.interest || 0}%, #676767 ${inputs?.interest || 0}%, #676767 100%)` }} onChange={handleSingleInput} />
                                        </div>

                                        <div className='flex items-center bg-grey-4 w-[80px] py-[6.5px] border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal font-Work_Sans text-xs input-border-none order-2 md:order-3' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                            <input type="text"
                                                onChange={handleSingleInput}
                                                value={inputs?.interest}
                                                name='interest'
                                                className={`text-center max-w-[127px] max-md:max-w-[45px] font-normal font-Work_Sans input-border-none bg-transparent text-lg leading-3`}
                                                maxLength={4}
                                                min={0}
                                                max={100}
                                            />
                                            <span className='text-lg'>%</span>
                                        </div>
                                    </div>

                                    {/* EMI Ends in year */}
                                    <div className='flex flex-wrap items-center justify-between'>
                                        <div className='min-w-[144px]'>
                                            <p className='text-grey-3 font-medium text-sm'>{"EMI Ends in year"}</p>
                                        </div>

                                        <div className='flex items-center bg-grey-4 w-[60px] py-[8px] border text-desk-light-blue-2 border-desk-light-blue-2 px-2 rounded-2xl font-normal font-Work_Sans text-xs input-border-none' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                            <input type="text"
                                                onChange={handleSingleInput}
                                                value={inputs?.end_year}
                                                name='end_year'
                                                className={`w-full font-normal font-Work_Sans input-border-none bg-transparent text-lg leading-3`}
                                                maxLength={4}
                                            />
                                        </div>
                                    </div>

                                    <button className='px-4 py-2 bg-blue-200 rounded-2xl ext-cyan-950 text-base font-bold font-["Montserrat"] leading-[21.12px] w-max mx-auto' onClick={addNew}>Add & View All</button>
                                </div>
                            </div>
                        </MoneyCard> : null
        
        )
    }
  
    return (
        <>
              {isMobile? WhatYouOwnMobileView():WhatYouOwnDesktopView()}
              {deleteConfirmation && <DeleteConfirmation containerClass={'bg-sky-200'} rightButtonClass='text-sky-200' text={confirmationText} open={deleteConfirmation} toggleModal={cancelHandler} handlerCancel={cancelHandler} actionHandler={deleteHandler} property_name={`${deleteIndex.loan_name}`}/>}
              <ToastContainer hideProgressBar toastStyle={{background:"#b4daf6",width:isMobile?'80vw':'100%', color:"#0F3A4D", fontFamily:"Montserrat"}}/>
        </>
    )
}

export default WhatYouOwe

  // useEffect(() => {
    //     const temp = [...allData?.loan_data];
    //     const updatedLoan = temp.map((loanList) => {
    //         return {...loanList, 
    //             outstanding_balance: NumericBaseFormatConversion(loanList.outstanding_balance),
    //             emi_amount: NumericBaseFormatConversion(loanList.emi_amount)
    //         }
           
    //    })
    //   dispatch(all_level_1_data({ loan_data: updatedLoan }));
    // }, [numerictype]);

// <MoneyCard heading={"What You OWE"} amount={'5,72,58,582'} addbtn={true}>
        //     <div className="px-12 pt-12 pb-[82px] flex flex-col gap-6 justify-center">
        //         <RowInputs inputName={"Salary"} />
        //         <RowInputs inputName={"Freelance / Business"} />
        //         <RowInputs inputName={"Rents"} />
        //     </div>
        // </MoneyCard>

// [
    //     {
    //         "id": 142,
    //         "created_date": "2024-03-07T10:31:59.684780Z",
    //         "last_updated_date": "2024-03-07T10:31:59.684806Z",
    //         "is_active": true,
    //         "loan_name": "Home Loan",
    //         "outstanding_balance": 12500000,
    //         "emi_amount": 262630,
    //         "start_year": 2024,
    //         "end_year": 2044,
    //         "interest": 8.3,
    //         "user_auth": 125
    //     },
    //     {
    //         "id": 143,
    //         "created_date": "2024-03-07T10:32:32.541868Z",
    //         "last_updated_date": "2024-03-07T10:32:32.541898Z",
    //         "is_active": true,
    //         "loan_name": "Car Loan",
    //         "outstanding_balance": 200000,
    //         "emi_amount": 9229,
    //         "start_year": 2024,
    //         "end_year": 2025,
    //         "interest": 10,
    //         "user_auth": 125
    //     }
    // ]
 // cancel notification cancel handler
    //  const cancelHandler=()=>{
    //     dispatch(updateCradInputs({deleteConfirmation: false}))
    // }

    // handled delete action here
    // const deleteHandler=()=>{
    //     console.log(allmodels,'data');
       
    //     if(allmodels?.loan && allmodels?.index){
    //             deleteData("loan", allmodels?.loan.id, (success) => {
    //                 if (success.data.code === 200) {
    //                     if( allData?.loan_data !== null ||  allData?.loan_data.length <=0){
    //                         setsection(2);
    //                     }
    //                     toast.success(success.data.status_message)
    //                     setTimeout(() => {
    //                         getGoalCalculations();
    //                     }, 2000);
    //                     const newdata = [...allData?.loan_data];
    //                     newdata.splice(allmodels?.index, 1);
    //                     dispatch(all_level_1_data({ loan_data: newdata }))
                       
    //                 }
    //             }, (error) => {
    //                 console.log(error)
    //             })  
          
    //         dispatch(updateCradInputs({deleteConfirmation: false}))
    //     }
        
    // }