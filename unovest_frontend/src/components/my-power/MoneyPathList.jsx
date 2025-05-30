import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PersonalAssumption from '../../pages/dashboardL1Cards/PersonalAssumption';
import Rates from '../../pages/dashboardL1Cards/Rates';
import MoneyIn from '../../pages/dashboardL1Cards/MoneyIn';
import MoneyOut from '../../pages/dashboardL1Cards/MoneyOut';
import WhatYouOwn from '../../pages/dashboardL1Cards/WhatYouOwn';
import WhatYouOwe from '../../pages/dashboardL1Cards/WhatYouOwe';
import MoneyToDoForYou from '../../pages/dashboardL1Cards/MoneyToDoForYou';
import { updateMy_powersidebar } from '../../redux/slices/My_powersidebar';
import { RxCross2 } from "react-icons/rx";
import { lock } from '../../assets/Icons';
import { IoLockClosed } from 'react-icons/io5';
import { getData, getallmodelsfields, saveDetails } from '../../pages/destop_L1/server';
import { all_level_1_data } from '../../redux/slices/Level_1_all_data';
import { all_financial_freedom_data } from '../../redux/slices/FinancialFreedomData';
import { toast } from 'react-toastify';

const MoneyPathList = ({disable}) => {
  const dispatch = useDispatch();
  const [showMoneyPath, setShowMoneyPath] = useState(false);
  const [saveDetailsConfirmation, setSaveDetailsConfirmation] = useState('false');
  // const userdetails = JSON.parse(localStorage.getItem('userdetails'));
  const page_data = useSelector((state) => state.Page_Data);
  const sidebar_mobile_list = useSelector((state) => state?.My_powersidebar?.sidebar_mobile_list);
  const currentSection = useSelector((state) => state?.My_powersidebar?.currentSection);
  
  const handleClick = (id) => {
    const activeMobileList = sidebar_mobile_list.map((item) => {
      return item.id == id ? {...item, active: true}: {...item, active: false}
    })
    setShowMoneyPath(true);
    dispatch(updateMy_powersidebar({ sidebar_mobile_list: activeMobileList, currentSection: 2 }));
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
    getGoalCalculations();
    // ChangeSection(1);
}, []);

const getGoalCalculations = () => {
  saveDetails("goalcalculation", {}, (success) => {
      dispatch(all_financial_freedom_data(success.data.message))
  }, (error) => {
      console.log(error)
      // dispatch(all_financial_freedom_data({}))
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

  let ComingSoonSection = () => {
    return (
        <div className="w-full max-md:w-[80vw] max-md:mb-10 mx-auto ring-2 ring-zinc-600 rounded-3xl">
            <div className="flex flex-col text-xl justify-center items-center h-96 rounded-3xl shadow-highlight-card bg-coming-soon-bg">
                <img src={lock} alt="lock_img" width={30} height={30} />
                <h2 className="text-slate-200 shadow-orange max-md:text-sm">
                    Coming Soon..
                </h2>
            </div>
        </div>
    )
}


  const cancelConfirmation=()=>{
    setSaveDetailsConfirmation('false');
  }

  let CardContainerMobile = ({updateData, style = {}, backgroundColor, children, className, disable, sectionName }) => {
    const level_1_data = useSelector((state) => state.level_1_data);
    
    const CancelMoneyPathHandler=(sectionName)=>{
      switch (sectionName) {
        case 'Assumptions':
          if (level_1_data?.profile_data['isEdit_profile']) {
            setSaveDetailsConfirmation('true');
          } else {
            setSaveDetailsConfirmation('false');
            setShowMoneyPath(false);
          }
          break;
        case 'Rates':
          if (level_1_data?.lead_annual_income_data['isEdit_rate']
            || level_1_data?.expenses_data["isEdit_rate"]
            || level_1_data?.lead_invested_value_data['isEdit_rate']) {
            setSaveDetailsConfirmation('true');
          } else {
            setSaveDetailsConfirmation('false');
            setShowMoneyPath(false);
          }
        break;
        case 'Money In':
          if (level_1_data?.lead_annual_income_data['isEdit_income']){
            setSaveDetailsConfirmation('true');
          }else{
            setSaveDetailsConfirmation('false');
            setShowMoneyPath(false);
          }
        break;
        case 'Money Out':
          if (level_1_data?.expenses_data['isEdit_expense']){
            setSaveDetailsConfirmation('true');
          }else{
            setSaveDetailsConfirmation('false');
            setShowMoneyPath(false);
          }
          
        break;
        case 'What you OWN':
          if (level_1_data?.lead_invested_value_data['isEdit_investment']){
            setSaveDetailsConfirmation('true');
          }else{
            setSaveDetailsConfirmation('false');
            setShowMoneyPath(false);
          }
        break;
        case 'What you OWE':
          let isLoanEditFound = null;
          if(level_1_data?.loan_data){
            isLoanEditFound = level_1_data?.loan_data.some(list => list.isEdit_loan == true)
          }
          if (isLoanEditFound){
            setSaveDetailsConfirmation('true');
          }else{
            setSaveDetailsConfirmation('false');
            setShowMoneyPath(false);
          }
          
        break;
        case 'Goals':
          const isGoalEditFound = level_1_data?.user_goal_data.some((list) => list.isEdit_goal === true);
          if (isGoalEditFound) {
            setSaveDetailsConfirmation('true');
          } else {
            setSaveDetailsConfirmation('false');
            setShowMoneyPath(false);
          }
        break;
        case 'Premium':
          
        break;
      
        default:
          break;
      }
        
    }

    const DetailsConfirmation=({backgroundColor, updateData})=>{
      return(
        <div className={`${backgroundColor} rounded-2xl w-full h-full`}>
            <div className='flex flex-col justify-around h-full'>
              <div className='w-full text-sm px-2'>
                Do You want to Save the Changes?
              </div>
              <div className='flex justify-end px-2 py-1 gap-1'>
                <button onClick={() => cancelConfirmation()} className='p-2 rounded-2xl min-w-24 bg-transparent ring-1 ring-slate-800 text-slate-800 text-base font-semibold  cursor-pointer'>Cancel</button>
                <button onClick={() => {updateData(); setSaveDetailsConfirmation('false')}}  className='p-2 rounded-2xl min-w-24 text-base font-semibold bg-slate-800  text-accent-green cursor-pointer'>Save</button>
              </div>
            </div>
        </div>
      )
  }
   
    return (
      <div className={`mt-5 w-full ${className} bg-opacity-50 relative py-[43px] md:hidden `} style={style}>
        <div className={`${saveDetailsConfirmation == 'true' ? 'opacity-100 absolute z-50 left-11 w-72 h-32' : 'opacity-0 absolute left-11 -z-10 scale-0'} transition-all duration-300 ease-in-out`}>
           <DetailsConfirmation backgroundColor={backgroundColor} updateData={updateData}/>  
        </div>
        <div className="max-w-[1288px] mx-auto h-full flex items-center">
          <div className='max-w-[300px] mx-auto cross-btn-shadow '>
          {disable && <div className="bg-slate-800 opacity-35 absolute inset-0 z-40 rounded-2xl"></div>}
          {sectionName !== 'Premium' && <div onClick={() =>CancelMoneyPathHandler(sectionName)} className={`${backgroundColor} absolute z-30  rounded-3xl shadow-icon-flip -right-2 -top-3 p-2 border border-1 border-solid border-slate-500`}><RxCross2 size={18} /></div>}
            {children}
          </div>
        </div>
      </div >
    )
  }

  

  let MyPowerSection = () => {

    const level_1_data = useSelector((state) => state.level_1_data)
    
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
                      setShowMoneyPath(false);
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
                      setShowMoneyPath(false);
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
                      setShowMoneyPath(false);
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
                      setShowMoneyPath(false);
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

          if(level_1_data?.lead_annual_income_data['isEdit_income']){
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
                    setShowMoneyPath(false);
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
                    setShowMoneyPath(false);
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
          }

          if(level_1_data?.expenses_data['isEdit_expense']){
            if (level_1_data?.expenses_data?.is_lumsum == false) {
                if (level_1_data?.expenses_data?.fixed_expenses_per_year >= 0 && level_1_data?.expenses_data?.variable_expenses_per_year >= 0 && level_1_data?.expenses_data?.average_inflation > 0) {
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
                            setShowMoneyPath(false);
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
                            setShowMoneyPath(false);
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
        if (level_1_data?.lead_invested_value_data['isEdit_investment'] || isEditFound ){
            
          if(level_1_data?.lead_invested_value_data['isEdit_investment']){
              if (level_1_data?.lead_invested_value_data?.is_lumsum == true) {
                  let data = {};
                  data.expected_average_annual_ror = level_1_data?.lead_invested_value_data?.expected_average_annual_ror;
                  // data.total_invested_value = level_1_data?.lead_invested_value_data?.total_invested_value;
                  data.detailsValue = {
                      bond_amount: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["bond_amount"] >=0)["bond_amount"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["bond_amount"])["bond_amount"] : null,
                      cash_amount: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["cash_amount"] >=0)["cash_amount"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["cash_amount"])["cash_amount"] : null,
                      equity_amount: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["equity_amount"] >=0)["equity_amount"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["equity_amount"])["equity_amount"] : null,
                      equity_ror: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["equity_ror"] >=0)["equity_ror"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["equity_ror"])["equity_ror"] : null,
                      bonds_ror: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["bonds_ror"] >=0)["bonds_ror"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["bonds_ror"])["bonds_ror"] : null,
                      cash_ror: level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["cash_ror"] >=0)["cash_ror"] ? level_1_data?.lead_invested_value_data?.investmentdata.find(ele => ele["cash_ror"])["cash_ror"] : null,
                  };
  
                  if (level_1_data?.lead_invested_value_data["expected_average_annual_ror"] > 0 && level_1_data?.lead_invested_value_data["total_invested_value"] > 0) {
                      saveDetails("lead-invested-value", data, (success) => {
                          if (success.data.code === 200) {
                              // handleNextClick(2)
                              let temp = { ...level_1_data?.lead_invested_value_data };
                              temp['isEdit_investment'] = false;
                              dispatch(all_level_1_data({ lead_invested_value_data: temp }))
                              toast.success(success.data.status_message)
                              setShowMoneyPath(false);
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
                              setShowMoneyPath(false);
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
            }

          if(isEditFound){
            if(level_1_data?.loan_data.length > 0){
                let temp = [ ...level_1_data?.loan_data ];
                const updated = temp.map((list) => {
                    return (list['isEdit_loan'] && list['isEdit_loan'] === true) ? { ...list, isEdit_loan: false } : list;
                });
                toast.success('Loans updated sucessfully')
                dispatch(all_level_1_data({ loan_data: updated }))
                setShowMoneyPath(false);
            }
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
            setShowMoneyPath(false);
        }else{
            toast.warn('Please update the fields to save the changes!')
        }
    }

    return (
      sidebar_mobile_list?.map((menu) => {
        if (menu.active) {
          if (menu.text === 'Assumptions') {
            return (
              <CardContainerMobile  key={menu.text} sectionName={menu.text} updateData={saveAssumption} backgroundColor={menu.backgroundColor} className='bg-accent-green' disable={page_data?.is_expired}>
                <PersonalAssumption />
              </CardContainerMobile>
            );
          }
          if (menu.text === 'Rates') {
            return (
              <CardContainerMobile key={menu.text} sectionName={menu.text} updateData={saveAssumption} backgroundColor={menu.backgroundColor} className='bg-accent-green' disable={page_data?.is_expired}>
                <Rates />
              </CardContainerMobile>
            );
          }
          if (menu.text === 'Money In') {
            return (
              <CardContainerMobile key={menu.text} sectionName={menu.text} updateData={saveCashFlow} backgroundColor={menu.backgroundColor}  className='bg-aqua' disable={page_data?.is_expired}>
                <MoneyIn />
              </CardContainerMobile>
            );
          }
          if (menu.text === 'Money Out') {
            return (
              <CardContainerMobile key={menu.text} sectionName={menu.text} updateData={saveCashFlow} backgroundColor={menu.backgroundColor} className='bg-aqua'  disable={page_data?.is_expired}>
                <MoneyOut />
              </CardContainerMobile>
            );
          }
          if (menu.text === 'What you OWN') {
            return (
              <CardContainerMobile key={menu.text} sectionName={menu.text} updateData={saveNetworth} backgroundColor={menu.backgroundColor} className='bg-desk-light-blue-2'  disable={page_data?.is_expired}>
                <WhatYouOwn />
              </CardContainerMobile>
            );
          }
          if (menu.text === 'What you OWE') {
            return (
              <CardContainerMobile key={menu.text} sectionName={menu.text} updateData={saveNetworth} backgroundColor={menu.backgroundColor} className='bg-desk-light-blue-2'  disable={page_data?.is_expired}>
                <WhatYouOwe />
              </CardContainerMobile>
            );
          }
          if (menu.text === 'Goals') {
            return (
              <CardContainerMobile key={menu.text} sectionName={menu.text} updateData={saveGoals} backgroundColor={menu.backgroundColor} className='bg-desk-purple'  disable={page_data?.is_expired}>
                <MoneyToDoForYou />
              </CardContainerMobile>
            );
          }
          if (menu.text === 'Premium') {
            return (
              <CardContainerMobile key={menu.text} sectionName={menu.text} updateData={saveGoals} backgroundColor={menu.backgroundColor} className='bg-desk-purple' disable={page_data?.is_expired}>
                <ComingSoonSection />
              </CardContainerMobile>
            );
          }
        }
        return null;
      })
    )
  }

  return (
    <div className='md:hidden  max-md:mb-16'>
      {showMoneyPath && currentSection === 2 ?(
        <MyPowerSection />
      ):(
          <div>
            <h2 className='text-sm font-normal text-light-blue-1 font-Montserrat italic max-w-[65%] mx-auto py-5'>
              Tap each Power to make Adjustments to your Money Path
            </h2>
            <div className='mx-10 max-md:pb-5'>
              {sidebar_mobile_list.length > 0 && sidebar_mobile_list.map((item, index) => {
                const { Icon, active, backgroundColor, id, text, textColor, iconColor } = item;
                return (
                  <div className='relative'>
                    {disable && <div className="bg-slate-800 opacity-35 absolute inset-0"></div>}
                    <div key={index} onClick={() => handleClick(id)} className={`px-3 h-10 rounded-[10px] flex justify-between items-center mb-1 ${backgroundColor} ${active ? 'bg-transparent border-[1px] border-red-400' : ''}`}>
                      <div className='flex gap-2'>
                        {<Icon stroke={active ? iconColor : 'black'} />}
                        <h3 className={`text-base font-extrabold font-Montserrat ${active ? textColor : 'text-[#2E4E5D]'}`}>{text}</h3>
                      </div>
                      {disable && (
                        <div className='bg-slate-700 rounded-3xl p-1'>
                          <span className='items-center'><IoLockClosed color='#B5B5B5' fontSize={15} /></span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
      )}
    </div>
  );
};
export default MoneyPathList;
