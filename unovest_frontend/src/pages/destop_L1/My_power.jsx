import { useDispatch, useSelector } from "react-redux";
import Filter_btn from "../../components/Filter_btn";
import Menubar from "../../components/Menubar"
import Progress_meter from "../../components/Progress-meter/Progress_meter";
import ResultCards from "../../components/ResultCards";
import Result_chart from "../../components/Result_chart"
import RoundedBtn from "../../components/RoundedBtn";
import My_power_sidebar from "../../components/my-power/My_power_sidebar";
import { lock, money } from "../../assets/Icons";
import PersonalAssumption from "../dashboardL1Cards/PersonalAssumption";
import Rates from "../dashboardL1Cards/Rates";
import MoneyIn from "../dashboardL1Cards/MoneyIn";
import MoneyOut from "../dashboardL1Cards/MoneyOut";
import WhatYouOwn from "../dashboardL1Cards/WhatYouOwn";
import WhatYouOwe from "../dashboardL1Cards/WhatYouOwe";
import MoneyToDoForYou from "../dashboardL1Cards/MoneyToDoForYou";
import { updateMy_powersidebar } from "../../redux/slices/My_powersidebar";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Insides_cards from "../../components/Insides_cards";
import MyPowerButton from "../../components/MyPowerButton";
import InsightesCharts from "../../components/resultinsightes/InsightesCharts";
import InsideLineChart from "../../components/linegraph/InsideLineChart";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useEffect, useState } from "react";
import { getData, getUserExpenseDetails, getallmodelsfields, saveDetails } from "./server";
import { all_level_1_data } from "../../redux/slices/Level_1_all_data";
import { updateCradInputs } from "../../redux/slices/Card_Inputs";
import { all_financial_freedom_data } from "../../redux/slices/FinancialFreedomData";
import { convertToIndianNumberingSystem } from "../../calculations/Index";
import { formatNumberInCrores, revealArray } from "../../Variable";
import { useNavigate } from "react-router-dom";
import MobileNavigation from "../../components/MobileNavigation";
import MoneyPathList from "../../components/my-power/MoneyPathList";
import Summit from '../../components/my-power/Summit';
import { NumericFormatConversion, NumericSummaryConversion } from "../../numericalFormatConversion/NumericFormatConversion";
import { whatifGraph } from "../../assets/images";
import Myrewards from "../account/components/myRewards/Myrewards";
import MoneyMatterSection from "../account/components/myPower/MoneyMatterSection";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let getRandomNetWorth = () => {
    return Math.floor(Math.random() * 10) + 1; // Generates random net worth between 1 and 10 crores as a number
}

export const PeopleData = [];
let cashflowData = null;
let age = 30;
while (age <= 70) {
    const netWorth = getRandomNetWorth();
    PeopleData.push({ age, netWorth });
    age += 5;
};

const My_power = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [backgroundImage, setBackgroundImage] = useState('');
    const [boderColor, setBorederColor] = useState('')
    const [isMobile, setIsMobile] = useState(false);

    const sidebar_top_list = useSelector(state => state?.My_powersidebar?.sidebar_top_list);
    const sidebar_bottom_list = useSelector(state => state?.My_powersidebar.sidebar_bottom_list);
    const sidebar_mobile_list =useSelector(state => state?.My_powersidebar.sidebar_mobile_list);
    const currentSection = useSelector(state => state?.My_powersidebar.currentSection);
  
    const userReferral = useSelector((state) => state?.Card_inputs?.refferal_user)
    const userNumericdetails = useSelector((state) => state?.Card_inputs)
    
    let financialDetails = useSelector((state) => state?.financialFreedomData)
    let financialCashFlowDetails = useSelector((state) => state?.financialFreedomData?.cashflowdetail?.cashFlowDetails)
    // const userDetails = JSON.parse(localStorage.getItem("userdetails"));
    const page_data = useSelector((state) => state.Page_Data);
    const financialGraph = financialCashFlowDetails?.filter((details) => details.age % 5 === 0)
    const financialFreedom = financialDetails?.financialfreedom;

    // console.log(financialDetails, result_chart_data, 'yes');
    // const numerictype = userDetails?.user_data?.numerical_format || 'lakhs';
    const numerictype = useSelector(state => state?.statistical_Data?.numerical_format)


    let ChangeSection = (number) => {
        dispatch(updateMy_powersidebar({ currentSection: number }));
    }

    let changeBottomSection = (number) => {
        if (isMobile) {
            let updatedBottomList = sidebar_mobile_list.map(selected => {
              if (selected.id === number) {
                return { ...selected, active: true };
              }
              return { ...selected, active: false };
            });
            dispatch(updateMy_powersidebar({ sidebar_mobile_list: updatedBottomList, currentSection: 2 }));
          } else {
            let updatedBottomList = sidebar_bottom_list.map(selected => {
              if (selected.id === number) {
                return { ...selected, active: true };
              }
              return { ...selected, active: false };
            });
            dispatch(updateMy_powersidebar({ sidebar_bottom_list: updatedBottomList, currentSection: 2 }));
          }
    }

    // let changeTopSection =(number)=>{
    //     let updatedTopList = sidebar_       
    // }

    const fetchUserRefferal = () => {
        getUserExpenseDetails("mynamecodecoin", success => {
            if (success.data.code === 200) {
                dispatch(updateCradInputs({ refferal_user: success.data.message,numerictype: numerictype }))
            }
        }, error => {
            console.log(error)
            // handleAlertClick('please Enter income','error')
        })
    }

    const getAllModels = () => {
        getallmodelsfields(resp => {
            if (resp.data.code === 200) {
                dispatch(all_level_1_data({ allModelsData: resp.data.message }))
            }
        }, error => {
            console.log(error)
            // handleAlertClick('please Enter income','error')
        })
    }

    useEffect(() => {
        getData("user-all-data", (success) => {
            if (success.data.code === 200) {
                dispatch(all_level_1_data(success.data.message))
            }
        }, (err) => {
            console.log(err);
        })
        getAllModels();
        fetchUserRefferal();
        getGoalCalculations();
        expiryCalculations();
        // ChangeSection(1);
    }, []);

    useEffect(() => {

        const setBackgroundBasedOnScreenSize = () => {
            if (window.innerWidth <768) {
                setIsMobile(true); 
                setBackgroundImage('linear-gradient(180deg, rgba(154, 154, 154, 0.20) 0.49%, rgba(154, 154, 154, 0.10) 99.66%)');
                setBorederColor('1px solid rgba(255, 81, 81, 1)')
            } else {
                setBackgroundImage('radial-gradient(1323.55% 390.21% at 116.51% 142.46%, #9891AD 0%, #538096 22.18%, #3C566E 37.68%, #131529 94.3%)');
                setBorederColor('null')
            }
        };
        setBackgroundBasedOnScreenSize();
       
        window.addEventListener('resize', setBackgroundBasedOnScreenSize);
        return () => {
            window.removeEventListener('resize', setBackgroundBasedOnScreenSize);
        };
    }, []);



    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    const getGoalCalculations = () => {
        saveDetails("goalcalculation", {}, (success) => {
            dispatch(all_financial_freedom_data(success.data.message))
        }, (error) => {
            console.log(error)
            // dispatch(all_financial_freedom_data({}))
        })
    }

    //-------------------------------myPower expiry calculations------------------------    
    const expiryCalculations = () => {
        // const userDetails = JSON.parse(localStorage.getItem("userdetails"));
        let expiryDate = new Date(page_data?.activate_my_power_expiry);
        let currentDate = new Date();

        //----------to set Insight section value when my power expires----------//
        const navigateToInside = () => {
            const updatedTopList = sidebar_top_list.map(list => list.id === 1 ? { ...list, active: true } : { ...list, active: false })
            dispatch(updateMy_powersidebar({ sidebar_top_list: updatedTopList, currentSection: 3 }));
            setTimeout(() =>{
                toast('myPower Validity has Expired! Please Add Some Coins');
            },1000)
        }

        // current date exceed expiry date 
        if (expiryDate > currentDate) {
            navigate('/level-1/quiz/result/insides/my-power/')
            const updatedTopList = sidebar_top_list.map(list => list.id === 0 ? { ...list, active: true } : { ...list, active: false })
            dispatch(updateMy_powersidebar({ sidebar_top_list: updatedTopList, currentSection: 1 }))
            // ChangeSection(3);
        }
        // current date less than expiry date 
        else if (expiryDate < currentDate) {
            if (page_data?.is_expired) {
                navigateToInside();
            }else{
                ChangeSection(1);
            }
        }
        // current date equals expiry date 
        else {
            if (page_data?.is_expired) {
                navigateToInside();
            }
            ChangeSection(1);
        }
    }

    let CardConatiner = ({ style = {}, children, className, updateData, disable }) => {
        return (
            <button className={`mt-5 flex-1 ${className}  bg-opacity-50 rounded-tr-3xl relative py-[43px] `} style={style}  >
                <div className="absolute flex gap-2 right-10 -top-4">
                    <div className="w-8 h-8 bg-gray-200 bg-opacity-80 rounded-full justify-center items-center flex cursor-pointer" onClick={updateData}>
                        <FaSave className="text-dark-blue" />
                    </div>
                    <div onClick={() => ChangeSection(1)} className="w-8 h-8 bg-gray-200 bg-opacity-80 rounded-full justify-center items-center flex cursor-pointer">
                        <RxCross2 size={20} className="text-dark-blue font-bold" />
                    </div>
                </div>
                <div className="max-w-[1288px] mx-auto h-full flex items-center">
                    {disable && <div className="bg-slate-800 opacity-35 absolute inset-0 z-10"></div>}
                    <div className='cardContainer-children'>
                        {children}
                    </div>
                </div>
            </button >
        )
    }


    let MyPowerSection = () => {
        const level_1_data = useSelector((state) => state.level_1_data)
        const incomeData = useSelector((state) => state.level_1_data.profile_data)

        const saveAssumption = () => {
            let assumptionObj = {};
            let userDetails = JSON.parse(localStorage.getItem('userdetails'));
            assumptionObj.current_age = parseInt(level_1_data?.profile_data?.current_age),
                assumptionObj.work_till_age = parseInt(level_1_data?.profile_data?.work_till_age),
                assumptionObj.living_age = parseInt(level_1_data?.profile_data?.living_age),
                assumptionObj.any_financial_dependents = level_1_data?.profile_data.financial_dependents == "true" ? true : false,
                assumptionObj.preferred_currency = level_1_data?.profile_data.preferred_currency;
            assumptionObj.user_auth = userDetails.user_data.id;

            let incomeObj = {};
            let expenseObj = {};
            let investedObj = {};
            incomeObj.average_growth_rate = parseInt(level_1_data?.lead_annual_income_data?.average_growth_rate);
            expenseObj.average_inflation = parseInt(level_1_data?.expenses_data?.average_inflation);
            investedObj.expected_average_annual_ror = parseInt(level_1_data?.lead_invested_value_data?.expected_average_annual_ror);

            if (level_1_data?.profile_data['isEdit_profile'] 
            || level_1_data?.lead_annual_income_data['isEdit_rate'] 
            || level_1_data?.expenses_data["isEdit_rate"] 
            || level_1_data?.lead_invested_value_data['isEdit_rate']) {
                if (assumptionObj.current_age < assumptionObj.work_till_age) {

                    saveDetails("profile", assumptionObj, (success) => {
                        if (success?.data?.code == 200) {
                            // navigate('/level-1/quiz')
                            toast.success(success.data.status_message)
                            let temp = { ...level_1_data?.profile_data };
                            temp['isEdit_profile'] = false;
                            dispatch(all_level_1_data({ profile_data: temp }))
                        }
                    }, (error) => {
                        // alert(error)
                        // toast.error("something went wrong")
                    })
                } else {
                    toast.warn("Work till age could not be less or same as current age")
                    // alert("Work till age could not be less or same as current age")
                }

                //----------------------income Data------------------------//
                if (incomeObj.average_growth_rate < 100 && incomeObj.average_growth_rate > 0) {
                    saveDetails("lead-annual-income", incomeObj, (success) => {
                        if (success.data.code === 200) {
                            toast.success(success.data.status_message);
                            // dispatch(all_level_1_data({ lead_annual_income_data: temp }))
                            let temp = { ...level_1_data?.lead_annual_income_data };
                            temp['isEdit_rate'] = false;
                            dispatch(all_level_1_data({ lead_annual_income_data: temp }))
                        } else {
                            toast.warn(success.data.message)
                            // alert(success.data.message)
                        }
                    }, (error) => {
                        console.log(error)
                        // toast.error("Something went wrong")
                    })
                } else {
                    toast.warn('Average growth rate should be greater than 0 or less than 100')
                }
                //----------------------expense Data------------------------//

                if (expenseObj.average_inflation < 100 && expenseObj.average_inflation > 0) {
                    saveDetails("expenses", expenseObj, (success) => {
                        if (success.data.code === 200) {
                            toast.success(success.data.status_message);
                            // dispatch(all_level_1_data({ lead_annual_income_data: temp }))
                            let temp = { ...level_1_data?.expenses_data };
                            temp['isEdit_rate'] = false;
                            dispatch(all_level_1_data({ expenses_data: temp }))
                        } else {
                            toast.warn(success.data.message)
                            // alert(success.data.message)
                        }
                    }, (error) => {
                        console.log(error)
                        // toast.error("something went wrong")
                    })
                } else {
                    toast.warn('Average_inflation should be greater than 0 or less than 100')
                }

                //----------------------investment Data------------------------//
                if (investedObj.expected_average_annual_ror < 100 && investedObj.expected_average_annual_ror > 0) {
                    saveDetails("lead-invested-value", investedObj, (success) => {
                        if (success.data.code === 200) {
                            toast.success(success.data.status_message);
                            // dispatch(all_level_1_data({ lead_annual_income_data: temp }))
                            let temp = { ...level_1_data?.lead_invested_value_data };
                            temp['isEdit_rate'] = false;
                            dispatch(all_level_1_data({ lead_invested_value_data: temp }))
                        } else {
                            toast.warn(success.data.message)
                            // alert(success.data.message)
                        }
                    }, (error) => {
                        console.log(error)
                        // toast.error("something went wrong")
                    })
                } else {
                    toast.warn('Profile rate should be greater than 0 or less than 100')
                }
            }else{
                toast.warn('Please update the fields to save the changes!')
            }
           
        }

        function isBlankObject(obj) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    return true; // The object has at least one own property
                } else {
                    return false;
                }
            }
        }

        const saveCashFlow = () => {
            if (level_1_data?.lead_annual_income_data['isEdit_income'] 
            || level_1_data?.expenses_data['isEdit_expense']
            ) {

                if (level_1_data?.lead_annual_income_data?.is_lumsum == true) {
                    let data = {};

                    if (level_1_data?.lead_annual_income_data?.total_annual_income > 0) {
                        // data.total_annual_income = parseInt(level_1_data?.lead_annual_income_data.total_annual_income)
                        data.salary = parseInt(level_1_data?.lead_annual_income_data.salary)
                        data.freelance = parseInt(level_1_data?.lead_annual_income_data.freelance)
                        data.rents = parseInt(level_1_data?.lead_annual_income_data.rents)
                        data.average_growth = parseInt(level_1_data?.lead_annual_income_data.average_growth_rate)

                        saveDetails("lead-annual-income", data, (success) => {
                            if (success.data.code === 200) {
                                let temp = { ...level_1_data?.lead_annual_income_data };
                                temp['isEdit_income'] = false;
                                dispatch(all_level_1_data({ lead_annual_income_data: temp }))
                                toast.success(success.data.status_message);
                                // dispatch(all_level_1_data({ lead_annual_income_data: temp }))
                            } else {
                               
                                toast.success(success.data.status_message);
                                // alert(success.data.message)
                            }
                        }, (error) => {
                            console.log(error)
                            // toast.error("something went wrong")
                        })
                    } else {
                        // alert("please Enter income")
                        toast.warn("Please enter income")
                    }
                } else {

                    if (isBlankObject(level_1_data?.lead_annual_income_data) && level_1_data?.lead_annual_income_data["salary"] >= 0 && level_1_data?.lead_annual_income_data["freelance"] >= 0 && level_1_data?.lead_annual_income_data["rents"] >= 0) {
                        let details = {};
                        details.salary = level_1_data?.lead_annual_income_data?.salary
                        details.rents = level_1_data?.lead_annual_income_data?.rents
                        details.freelance = level_1_data?.lead_annual_income_data?.freelance
                        details.average_growth_rate = level_1_data?.lead_annual_income_data?.average_growth_rate

                        let temp = { ...level_1_data?.lead_annual_income_data };
                        temp['isEdit_income'] = false;
                        dispatch(all_level_1_data({ lead_annual_income_data: temp }))

                        saveDetails("lead-annual-income", details, (success) => {
                            if (success.data.code === 200) {
                                // handleNextClick(1)
                                // setDetails(false)
                                toast.success(success.data.status_message)
                             
                            } else {
                                toast.warn(success.data.message)
                                // alert(success.data.message)
                            }
                        }, (error) => {
                            console.log(error)
                            // alert(error.response.message)
                            // toast.error("something went wrong")
                        })
                    } else {
                        // alert("please fill all inputs")
                        toast.warn("Please fill all inputs")
                    }

                }

                if (level_1_data?.expenses_data?.is_lumsum == false) {
                    if (level_1_data?.expenses_data?.fixed_expenses_per_year > 0 && level_1_data?.expenses_data?.variable_expenses_per_year > 0 && level_1_data?.expenses_data?.average_inflation > 0) {
                        let obj = {};
                        // obj.yearly_expenses = null,
                        obj.average_inflation = level_1_data?.expenses_data?.average_inflation,
                            obj.fixed_expenses_per_year = level_1_data?.expenses_data?.fixed_expenses_per_year,
                            obj.variable_expenses_per_year = level_1_data?.expenses_data?.variable_expenses_per_year
                        saveDetails("expenses", obj, (success) => {
                            if (success.data.code == 200) {
                                let temp = { ...level_1_data?.expenses_data };
                                temp['isEdit_expense'] = false;
                                dispatch(all_level_1_data({ expenses_data: temp }))
                                toast.success(success.data.status_message)
                                // handleNextClick(4)
                            }
                        }, (error) => {
                            console.log(error)
                            toast.error("something went wrong")
                        })
                    } else {
                        // alert("please fill all the fields")
                        toast.warn("Please fill all the fields")
                    }
                } else {
                    if (level_1_data?.expenses_data?.average_inflation != null && level_1_data?.expenses_data?.yearly_expenses != null) {
                        let obj = {};
                        // obj.yearly_expenses = level_1_data?.expenses_data?.yearly_expenses,
                        obj.average_inflation = level_1_data?.expenses_data?.average_inflation,
                            obj.fixed_expenses_per_year = level_1_data?.expenses_data?.fixed_expenses_per_year,
                            obj.variable_expenses_per_year = level_1_data?.expenses_data?.variable_expenses_per_year
                        saveDetails("expenses", obj, (success) => {
                            if (success.data.code == 200) {
                                let temp = { ...level_1_data?.expenses_data };
                                temp['isEdit_expense'] = false;
                                dispatch(all_level_1_data({ expenses_data: temp }))
                                toast.success(success.data.status_message)
                                // handleNextClick(4)
                            }
                        }, (error) => {
                            console.log(error)
                            toast.error("Something went wrong")
                        })
                    } else {
                        // alert("please fill all the fields")
                        toast.warn("Please fill all the fields")
                    }
                }

            } else {
                toast.warn('Please update the fields to save the changes!')
            }
           
        }

        const saveNetworth = () => {
            let isEditFound = null;
            if(level_1_data?.loan_data){
                 isEditFound = level_1_data?.loan_data.some(list => list.isEdit_loan == true)
            }
            if (level_1_data?.lead_invested_value_data['isEdit_investment'] 
            || isEditFound
            ){
              
                if (level_1_data?.lead_invested_value_data?.is_lumsum == true) {
                    let data = {};
                    data.expected_average_annual_ror = level_1_data?.lead_invested_value_data?.expected_average_annual_ror;
                    // data.total_invested_value = level_1_data?.lead_invested_value_data?.total_invested_value;
                    data.detailsValue = {
                        bond_amount: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["bond_amount"])["bond_amount"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["bond_amount"])["bond_amount"] : null,
                        cash_amount: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["cash_amount"])["cash_amount"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["cash_amount"])["cash_amount"] : null,
                        equity_amount: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["equity_amount"])["equity_amount"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["equity_amount"])["equity_amount"] : null,
                        equity_ror: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["equity_ror"])["equity_ror"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["equity_ror"])["equity_ror"] : null,
                        bonds_ror: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["bonds_ror"])["bonds_ror"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["bonds_ror"])["bonds_ror"] : null,
                        cash_ror: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["cash_ror"])["cash_ror"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["cash_ror"])["cash_ror"] : null,
                    };
    
                    if (level_1_data?.lead_invested_value_data["expected_average_annual_ror"] > 0 && level_1_data?.lead_invested_value_data["total_invested_value"] > 0) {
                        saveDetails("lead-invested-value", data, (success) => {
                            if (success.data.code === 200) {
                                // handleNextClick(2)
                                let temp = { ...level_1_data?.lead_invested_value_data };
                                temp['isEdit_investment'] = false;
                                dispatch(all_level_1_data({ lead_invested_value_data: temp }))
                                toast.success(success.data.status_message)
                            } else {
                                // alert("something went wrong")
                                toast.error("something went wrong")
                            }
                        }, (error) => {
                            console.log(error)
                        })
                    } else {
                        // alert("please fill all the fields")
                        toast.warn("Please fill all the fields")
                    }
                } else {
                    if ((level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["bond_amount"])["bond_amount"] > 0)
                        || level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["cash_amount"])["cash_amount"] > 0
                        || level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["equity_amount"])["equity_amount"] > 0) {
                        let detailsValue = {
                            bond_amount: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["bond_amount"])["bond_amount"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["bond_amount"])["bond_amount"] : null,
                            cash_amount: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["cash_amount"])["cash_amount"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["cash_amount"])["cash_amount"] : null,
                            equity_amount: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["equity_amount"])["equity_amount"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["equity_amount"])["equity_amount"] : null,
                            equity_ror: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["equity_ror"])["equity_ror"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["equity_ror"])["equity_ror"] : null,
                            bonds_ror: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["bonds_ror"])["bonds_ror"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["bonds_ror"])["bonds_ror"] : null,
                            cash_ror: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["cash_ror"])["cash_ror"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["cash_ror"])["cash_ror"] : null,
                        };
    
    
                        saveDetails("lead-invested-value", detailsValue, (success) => {
                            if (success.data.code === 200) {
                                // handleNextClick(2)
                                let temp = { ...level_1_data?.lead_invested_value_data };
                                temp['isEdit_investment'] = false;
                                dispatch(all_level_1_data({ lead_invested_value_data: temp }))
                                toast.success(success.data.status_message)
                            } else {
                                // alert("something went wrong")
                                toast.error("Something went wrong")
                            }
                        }, (error) => {
                            console.log(error)
                        })
                    } else {
                        // alert("please fill all the inputs");
                        toast.warn("Please fill all the inputs")
                    }
                }
    
                if(level_1_data?.loan_data.length > 0){
                    let temp = [ ...level_1_data?.loan_data ];
                    const updated = temp.map((list) => {
                        return (list['isEdit_loan'] && list['isEdit_loan'] === true) ? { ...list, isEdit_loan: false } : list;
                    });
                    dispatch(all_level_1_data({ loan_data: updated }))
                    toast.success('Loans updated sucessfully')
                }
            }else{
                toast.warn('Please update the fields to save the changes!')
            }

        }
        const saveGoals = () => {
            //---------------------> need to be completed----------------------------//
            const isEditFound = level_1_data?.user_goal_data.some((list) => list.isEdit_goal === true);
            if(isEditFound){
                let temp = [ ...level_1_data?.user_goal_data ];
                const updated = temp.map((list) => {
                    return (list['isEdit_goal'] && list['isEdit_goal'] === true) ? { ...list, isEdit_goal: false } : list;
                });
                dispatch(all_level_1_data({ user_goal_data: updated }))
                toast.success('Goal Updated Sucessfully')
            }else{
                toast.warn('Please update the fields to save the changes!')
            }
        }
        
        return (
            isMobile ==true?
                (
                    sidebar_mobile_list?.map((menu) => {
                        console.log('mobile view');
                        if (menu.active) {
                           
                            if (menu.text === 'Assumptions') {
                                return (
                                    <CardConatiner key={menu.text} className='bg-green-200' updateData={saveAssumption} disable={page_data?.is_expired}>
                                        <PersonalAssumption />
                                    </CardConatiner>
                                );
                            }
                            if (menu.text === 'Rates') {
                                return (
                                    <CardConatiner key={menu.text} className='bg-green-200' updateData={saveAssumption} disable={page_data?.is_expired}>
                                        <Rates />
                                    </CardConatiner>
                                );
                            }
                            if (menu.text === 'Money In') {
                                return (
                                    <CardConatiner key={menu.text} className='bg-aqua' updateData={saveCashFlow} disable={page_data?.is_expired}>
                                        <MoneyIn />
                                    </CardConatiner>
                                );
                            }
                            if (menu.text === 'Money Out') {
                                return (
                                    <CardConatiner key={menu.text} className='bg-aqua' updateData={saveCashFlow} disable={page_data?.is_expired}>
                                        <MoneyOut />
                                    </CardConatiner>
                                );
                            }
                            if (menu.text === 'What you OWN') {
                                return (
                                    <CardConatiner key={menu.text} className='bg-desk-light-blue-2' updateData={saveNetworth} disable={page_data?.is_expired}>
                                        <WhatYouOwn />
                                    </CardConatiner>
                                );
                            }
                            if (menu.text === 'What you OWE') {
                                return (
                                    <CardConatiner key={menu.text} className='bg-desk-light-blue-2' updateData={saveNetworth} disable={page_data?.is_expired}>
                                        <WhatYouOwe />
                                    </CardConatiner>
                                );
                            }
                            if (menu.text === 'Goals') {
                                return (
                                    <CardConatiner key={menu.text} className='bg-desk-purple' updateData={saveGoals} disable={page_data?.is_expired}>
                                        <MoneyToDoForYou />
                                    </CardConatiner>
                                );
                            }
                            if (menu.text === 'Premium') {
                                return (
                                    <CardConatiner key={menu.text} className='bg-desk-purple' disable={page_data?.is_expired}>
                                        <ComingSoonSection />
                                    </CardConatiner>
                                );
                            }
                        }
        
                        return null;
                    })
                )
                :
                (
                    sidebar_bottom_list?.map((menu) => {
                        
                        if (menu.active) {
                            if (menu.text === 'Assumptions') {
                                return (
                                    <CardConatiner key={menu.text} className='bg-green-200' updateData={saveAssumption} disable={page_data?.is_expired}>
                                        <PersonalAssumption />
                                        <Rates />
                                    </CardConatiner>
                                );
                            }
                            if (menu.text === 'Cashflow') {
                                return (
                                    <CardConatiner key={menu.text} className='bg-aqua' updateData={saveCashFlow} disable={page_data?.is_expired}>
                                        <MoneyIn />
                                        <MoneyOut />
                                    </CardConatiner>
                                );
                            }
                            if (menu.text === 'Networth') {
                                return (
                                    <CardConatiner key={menu.text} className='bg-desk-light-blue-2' updateData={saveNetworth} disable={page_data?.is_expired}>
                                        <WhatYouOwn />
                                        <WhatYouOwe />
                                    </CardConatiner>
                                );
                            }
                            if (menu.text === 'Goals') {
                                return (
                                    <CardConatiner key={menu.text} className='bg-desk-purple' updateData={saveGoals} disable={page_data?.is_expired}>
                                        <MoneyToDoForYou />
                                    </CardConatiner>
                                );
                            }
                            if (menu.text === 'Premium') {
                                return (
                                    <CardConatiner key={menu.text} className='bg-desk-purple' disable={page_data?.is_expired}>
                                        <ComingSoonSection />
                                    </CardConatiner>
                                );
                            }
                        }
        
                        return null;
                    })
                )
        );
        
    }

    const handleAlertClick=(message,type)=>{
        if(type === 'success'){
            toast.success(message);
        }else if(type === 'warn'){
            toast.warn(message);
        }else if(type === 'error'){
            toast.error(message);
        }else{
            toast(message);
        }
    }

    const showLessHandler = () => {
        const updatedTopList = sidebar_top_list.map(list => list.id === 1 ? { ...list, active: true } : { ...list, active: false })
        dispatch(updateMy_powersidebar({ sidebar_top_list: updatedTopList, currentSection: 1 }))
    }

    let InsightsSection = () => {
        return (
            <div className="InsightsSection-Container">
                <Insides_cards data={financialDetails} />
                <div className='flex justify-center'>
                    {page_data?.is_expired === true && <MyPowerButton className={''} handleAlertClick={handleAlertClick} />}
                </div>
               
                <InsightesCharts />
                <InsideLineChart />

                <div className='flex justify-center gap-7 max-md:items-center max-md:m-auto max-md:flex-col max-md:gap-4 max-md:mb-16'>
                    <button onClick={showLessHandler} className=" flex items-center justify-around md:justify-center shadow level1-btn">
                        Show Less <MdKeyboardArrowUp />
                    </button>
                    {page_data?.is_expired === true && <MyPowerButton className={''} handleAlertClick={handleAlertClick} />}
                    <button className="level1-btn">Upgrade to Level 2</button>
                </div>
            </div>
        )
    }

    let ComingSoonSection = () => {
        return (
            <div className="w-full max-md:max-w-[90%] max-md:mb-24 max-w-[1288px] h-96 mx-auto flex gap-16 flex-col mt-12 ring-2 ring-zinc-600 rounded-3xl ">
                <div className="flex flex-col text-xl justify-center items-center h-96 rounded-3xl shadow-highlight-card bg-coming-soon-bg">
                    <img src={lock} alt="lock_img" width={30} height={30} />
                    <h2 className="text-slate-200 shadow-orange max-md:text-sm">
                        Coming Soon..
                    </h2>
                </div>
            </div>
        )
    }

    const isBottomSideClick= sidebar_bottom_list?.some((list) => list.active);
  
    return (
        <div className='min-h-screen relative flex flex-col  '
        style={{
            background: currentSection === 5 ? '#232E41' : 'radial-gradient(ellipse at 210.67% 129.74%, #9891AD 0%, #538096 22.18%, #3C566E 2.79%, #131529 61.23%)'
        }}>
            <div style={{ boxShadow: "2px 0px 20px 0px rgba(8, 10, 48, 0.8)" }}>
            <Menubar redirected={"mypower"} refferalDetails={userReferral} />
            </div>           
            <div className="flex flex-1 max-md:mx-3">
                <div className="absolute z-20 hidden md:block">
                    <My_power_sidebar />
                </div>
                <div className="w-full max-xl:w-[80%] flex flex-col flex-1 max-h-screen overflow-y-scroll hide-scrollbar min-h-screen  max-md:mb-10">
                    <div className="mt-14">
                        {(currentSection !== 5 && currentSection !== 4) &&  
                        <Result_chart
                            moneyPathIndex={3}
                            data={isBottomSideClick?null:financialCashFlowDetails}
                            x_axis_dataKey='age'
                            y_axis_dataKey='closingAssets'
                            Freedom_age={financialDetails?.financialfreedom?.financialFreedomAge}
                            className="md:ms-20 lg:m-auto"
                        />}
                        
                        {currentSection == 5 && <div className="w-full max-2xl:w-[85%] mb-4 max-w-[1291px] mx-auto">
                            <img src={whatifGraph}/>
                        </div> }
                        
                    </div>

                    {/* Render current section based on screen size */}
                    {isMobile ? (
                        <>
                            {currentSection === 1 && <MoneyMatterSection changeBottomSection={changeBottomSection} ChangeSection={ChangeSection} backgroundImage={backgroundImage} boderColor={boderColor}/>}
                            {currentSection === 2 && <MoneyPathList disable={page_data?.is_expired} />}
                            {currentSection === 3 && <InsightsSection />}
                            {currentSection === 4 && <Myrewards/>}
                            {currentSection === 5 && <ComingSoonSection />}
                        </>
                    ) : (
                        <>
                            {currentSection === 1 && <MoneyMatterSection changeBottomSection={changeBottomSection} ChangeSection={ChangeSection} backgroundImage={backgroundImage} boderColor={boderColor}/>}
                            {currentSection === 2 && <MyPowerSection />}
                            {currentSection === 3 && <InsightsSection />}
                            {currentSection === 4 && <Myrewards/>}
                            {currentSection === 5 && <Summit/>}
                        </>
                    )}
                </div>
                {isMobile && (
                    <div className="absolute z-10  md:hidden ">
                        <MobileNavigation ChangeSection={ChangeSection} />
                    </div>
                )}

                {/* <div className="w-full h-[50px] absolute bottom-0 px-8 py-1 bg-gradient-to-l from-red-500 to-amber-300 justify-start items-center gap-2 inline-flex md:hidden">
                    <div className="grow shrink basis-0 text-center text-dark-blue">
                        <span className="text-lg font-semibold leading-snug">my</span>
                        <span className="text-xl font-extrabold capitalize">Powers</span>
                    </div>
                </div> */}
            <ToastContainer  hideProgressBar autoClose={1000} toastStyle={{ width: 'fit-content', background: "#BCFBE4", color: "#0F3A4D", fontFamily: "Montserrat" }} />
            </div>
        </div >
    )
}

export default My_power


    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsMobile(window.innerWidth < 768); 
    //     };
    //     handleResize();
    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);