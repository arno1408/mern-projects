import React, { useEffect, useState } from "react";
import QuestionCard from "../../QuestionCard";
import Card_input from "../Card_input";
import Gray_btn from "../Gray_btn";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";
import Card_footer from "../Card_footer";
import Card_OR from "../Card_OR";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCradInputs } from "../../../redux/slices/Card_Inputs";
import {
  getallmodelsfields,
  saveDetails,
} from "../../../pages/destop_L1/server";
import NumberInput from "../NumberInput";
import { formatNumberWithCommas } from "../../../Variable";
import { diamond } from "../../../assets/Icons";
import { CurrencyData } from "../../../constants";

const First_card = ({ handleNextClick, handleAlertClick }) => {
  const details = useSelector(
    (state) => state?.Card_inputs?.lead_annual_income_is_lumsum
  );
  const detailExpense = useSelector(
    (state) => state?.Card_inputs?.lead_annual_income
  );
  const [error, setError] = useState({
    enterAnnualIncome: false,
    growsYearlyBy: false,
    salary: false,
    freelance: false,
    rents: false,
  });
  // const [details, setDetails] = useState(!useSelector(state => state?.Card_inputs?.lead_annual_income_is_lumsum))
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allmodels = useSelector((state) => state?.Card_inputs);

  // const [detailsValue, changeDetailsValue] = useState({})
  const [allincomeAmt, setallincomeAmt] = useState();

  const changeDetails = (status, total) => {
    dispatch(
      updateCradInputs({
        lead_annual_income_is_lumsum: status,
        total_annual_income: total ? total : allincomeAmt,
      })
    );
  };

  const UpdateInput = (e) => {
    if (e.target.name === "total_annual_income") {
      if (e.target.value.trim().length > 0) {
        setError({
          ...error,
          enterAnnualIncome: false,
        });
      }
      setallincomeAmt(+e.target.value.replace(/,/g, ""));
    } else {
      console.log(e.target.name, "name");
      if (
        e.target.name == "salary" ||
        e.target.name == "freelance" ||
        e.target.name == "rents"
      ) {
        console.log("here");
        setError({
          ...error,
          salary: false,
          freelance: false,
          rents: false,
          enterAnnualIncome: false,
        });
      }

      if (e.target.name === "average_growth_rate") {
        if (e.target.value.trim().length > 0) {
          setError({
            ...error,
            growsYearlyBy: false,
          });
        }
      }
    }

    dispatch(
      updateCradInputs({ [e.target.name]: +e.target.value.replace(/,/g, "") })
    );
  };

  const gellAllModels = () => {
    getallmodelsfields(
      (success) => {
        if (success.data.code === 200) {
          dispatch(updateCradInputs(success.data.message));
        } else {
          dispatch(updateCradInputs({}));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    gellAllModels();
  }, []);

  function isBlankObject(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return true; // The object has at least one own property
      } else {
        return false;
      }
    }
  }

  //------------------------------Income Toast for Congratulations------------------------------//
  const ToastCongratulate = () => {
    const userdetails = JSON.parse(localStorage.getItem("userdetails"));
    const IncomeActivity = userdetails?.coinmaster?.filter(
      (list) => list.activity == 2
    );
    return (
      <div>
        <div className="h-11 p-2 bg-slate-300 rounded-[26px] shadow justify-start items-start gap-2 flex w-max mx-auto mt-[19px] ">
          <img src={diamond} alt="" className=" max-w-[30px] lg:max-w-[38px]" />
          <p className="text-cyan-950 text-xl lg:text-2xl font-extrabold font-['Work Sans'] shadow">{`+${IncomeActivity[0]?.coins}`}</p>
        </div>
        <div className="bg-blue-100 rounded-xl mt-2 p-2 w-fit mx-auto">
          <h3 className="font-bold text-sm lg:text-lg  text-slate-700 text-center">
            Congratulations!
          </h3>
          <div className="text-slate-700 text-center text-xs lg:text-base">
            You have earned {`+${IncomeActivity[0]?.coins}`} coins.
            <br /> More power to you. Keep Going!{" "}
          </div>
        </div>
      </div>
    );
  };

  const saveFirstCard = () => {
    if (details == false || details == undefined) {
      let data = {};
      if (
        allmodels?.total_annual_income > 0 &&
        allmodels.average_growth_rate > 0
      ) {
        data.total_annual_income = parseInt(allmodels.total_annual_income);
        data.average_growth_rate = parseInt(allmodels.average_growth_rate);
        data.login_form_number = 1;
        saveDetails(
          "lead-annual-income",
          data,
          (success) => {
            if (success.data.code === 200) {
              handleNextClick(1);
              if (success.data.message?.coins_added?.is_coin_added) {
                handleAlertClick(<ToastCongratulate />, "message");
              }

              changeDetails(false);
            } else {
              handleAlertClick(success.data.status_message);
              // setAlert(success.data.message)
            }
          },
          (error) => {
            console.log(error);
            handleAlertClick("Please enter income", "error");
          }
        );
      } else {
        setError({
          ...error,
          enterAnnualIncome: true,
        });

        if (allmodels?.average_growth_rate <= 0) {
          setError({
            ...error,
            growsYearlyBy: true,
          });
        }
        // handleAlertClick('please Enter incomes')
        // setAlert("please Enter income")
      }
    } else {
      if (
        isBlankObject(allmodels) &&
        (allmodels["salary"] > 0 ||
          allmodels["freelance"] > 0 ||
          allmodels["rents"] > 0)
      ) {
        let details = {};
        details.salary = allmodels?.salary ? allmodels?.salary : 0;
        details.rents = allmodels?.rents ? allmodels?.rents : 0;
        details.freelance = allmodels?.freelance ? allmodels?.freelance : 0;
        details.average_growth_rate = allmodels?.average_growth_rate;
        details.login_form_number = 1;

        saveDetails(
          "lead-annual-income",
          details,
          (success) => {
            if (success.data.code === 200) {
              handleNextClick(1);
              if (success.data.message?.coins_added?.is_coin_added) {
                handleAlertClick(<ToastCongratulate />, "message");
              }
              if (allmodels?.lead_annual_income_is_lumsum) {
                changeDetails(true);
              } else {
                changeDetails(false);
              }
            } else {
              // setAlert(success.data.message)
              handleAlertClick(success.data.status_message);
            }
          },
          (error) => {
            console.log(error);
            // setAlert(error.response.message)
            handleAlertClick(error.response.message, "error");
          }
        );
      } else {
        let salary = false;
        let freelance = false;
        let rents = false;
        if (allmodels["salary"] <= 0 || isNaN(allmodels["salary"])) {
          salary = true;
        }
        if (allmodels["freelance"] <= 0 || isNaN(allmodels["freelance"])) {
          freelance = true;
        }
        if (allmodels["rents"] <= 0 || isNaN(allmodels["rents"])) {
          rents = true;
        }
        setError({
          ...error,
          salary: salary,
          freelance: freelance,
          rents: rents,
        });
        // setAlert("please fill all inputs")
        // handleAlertClick('please fill all inputs')
      }
    }
  };
  console.log(error);

  const DisplayTotalAmount = () => {
    if (allmodels?.salary)
      setallincomeAmt(
        allmodels?.salary + allmodels?.rents + allmodels?.freelance
      );
    let calculatedAmt = formatNumberWithCommas(
      (allmodels?.salary > 0 ? allmodels?.salary : 0) +
        (allmodels?.rents > 0 ? allmodels?.rents : 0) +
        (allmodels?.freelance > 0 ? allmodels?.freelance : 0)
    );
    return calculatedAmt;
  };

  const CurrencyFinder = () => {
    if (allmodels?.preferred_currency) {
      const selectedCurrency = CurrencyData?.find(
        (currency) => currency.currencyIndex == allmodels?.preferred_currency
      ).symbol;
      return selectedCurrency;
    } else {
      return "₹";
    }
  };
  // console.log(details,'details');

  const handleToggleDetails = (type) => {
    const total =
      (allmodels["freelance"] > 0 ? allmodels["freelance"] : 0) +
      (allmodels["salary"] > 0 ? allmodels["salary"] : 0) +
      (allmodels["rents"] > 0 ? allmodels["rents"] : 0);
    setallincomeAmt(total);
    changeDetails(type, total);
    if (type !== false) {
      setError({
        ...error,
        salary: false,
        freelance: false,
        rents: false,
      });
    } else {
      setError({
        ...error,
        enterAnnualIncome: false,
        growsYearlyBy: false,
      });
    }

    // setCongratulate(true);
  };

  const onHanleRestErrorState = () => {
    setError({
      ...error,
      enterAnnualIncome: false,
      growsYearlyBy: false,
      salary: false,
      freelance: false,
      rents: false,
    });
  };

  // console.log(details,'details');
  // const {rents,freelance,salary,total_annual_income} = detailExpense;
  return (
    <>
      <div className=" card card-1 ">
        <QuestionCard
          number="1"
          label="Your Family's Annual Take-Home Income"
        />
        {console.log(
          "allmodels?.salary",
          allmodels?.salary,
          error.enterAnnualIncome,
          allmodels?.total_annual_income
        )}
        <div className="first-card-py cards-scroll hide-scrollbar card-body">
          {details === false || details === undefined ? (
            <div className="w-full flex flex-col justify-between lg:justify-start max-w-[78%]  lg:px-0 lg:max-w-[65%] mx-auto flex-1">
              <div className=" flex flex-col 2xl:gap-5 lg:gap-4 gap-6 px-2">
                <div className=" ">
                  <div className="flex gap-2">
                    <p className="card-label currencyfinder-1 invisible">
                      <CurrencyFinder />
                    </p>
                    <p className="card-label">
                      Enter Annual Income
                      <br />
                      <span className="">(After Tax)</span>
                    </p>
                  </div>
                  <div className=" flex gap-2 items-center">
                    <p className="text-grey-2 currencyfinder-1">
                      <CurrencyFinder />
                    </p>
                    <div className=" flex-1">
                      <NumberInput
                        type="number"
                        className="number-input-feild-h"
                        placeholder=""
                        error={error.enterAnnualIncome}
                        name="total_annual_income"
                        onChange={UpdateInput}
                        value={
                          allmodels?.total_annual_income
                            ? allmodels?.total_annual_income.toString()
                            : ""
                        }
                      />
                      {error.enterAnnualIncome && (
                        <div className="please-feild-text">
                          * Please fill in this field
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" ">
                  <div className="flex gap-2">
                    <p className="card-label currencyfinder-1 leading-none invisible">
                      %
                    </p>
                    <p className="card-label  leading-none">Grows Yearly by</p>
                  </div>

                  <div className=" flex gap-2 items-center">
                    <p className="text-grey-2 currencyfinder-1 pb-5">%</p>
                    <div className=" flex-1">
                      <NumberInput
                        type="number"
                        className="number-input-feild-h"
                        name="average_growth_rate"
                        error={error.growsYearlyBy}
                        step={"0.02"}
                        onChange={UpdateInput}
                        value={
                          allmodels?.average_growth_rate
                            ? allmodels?.average_growth_rate.toString()
                            : ""
                        }
                      />
                      {error.growsYearlyBy && (
                        <div className="please-feild-text">
                          * Please fill in this field
                        </div>
                      )}
                      <p className="enter-details-p mt-3 lg:mt-1 2xl:mt-2 pl-0 lg:pl-1">
                        Doubles the value in{" "}
                        {allmodels?.average_growth_rate > 0
                          ? (72 / +allmodels?.average_growth_rate).toFixed(1)
                          : "X"}{" "}
                        years
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:block flex flex-col lg:flex-row mb-4 lg:mb-0 lg:px-0 ">
                <div className="flex flex-row lg:flex-col items-center md:mx-5 lg:mx-0 justify-between gap-2">
                  <Card_OR className="lg:mt-1 2xl:mt-2.5 " />
                  <Gray_btn
                    className="w-fit lg:mx-auto min-w-[12.5rem] lg:min-w-[9.5rem] 2xl:min-w-[12.5rem] 2xl:mt-5 flex-1 hidden md:flex"
                    onClick={() => handleToggleDetails(true)}
                    PreIcon={!details && diamond}
                    label={"Enter Details"}
                    Icon={FaChevronDown}
                  />
                  <Gray_btn
                    className="w-fit lg:mx-auto min-w-[12.5rem] lg:mt-8 flex-1 md:hidden flex"
                    onClick={() => handleToggleDetails(true)}
                    PreIcon={!details && diamond}
                    label={"Enter Details"}
                    Icon={FaChevronRight}
                  />
                </div>
                <p className="enter-details-p ms-9 2xl:mt-2 lg:mt-1 mt-2  md:pl-8 lg:pl-1 2xl:pl-6 pl-0 ">
                  Enter details to earn coins
                </p>
              </div>
            </div>
          ) : null}
          {details === true ? (
            <div className="flex gap-6 lg:gap-1 2xl:gap-5  flex-col flex-1 justify-between md:justify-normal">
              <div className="w-fit mx-auto min-w-[15.5rem] hidden lg:flex lg:mb-2 2xl:mb-4">
                <Gray_btn
                  className="w-fit mx-auto min-w-[15.5rem] lg:hidden hidden"
                  PreIcon={!details && diamond}
                  // onClick={() =>{handleToggleDetails(false)}}
                  label={"Enter Lumpsum"}
                  Icon={FaChevronUp}
                />
                <Gray_btn
                  className="w-fit mx-auto min-w-[15.5rem] lg:min-w-[12.5rem] 2xl:min-w-[15.5rem] md:flex"
                  PreIcon={!details && diamond}
                  onClick={() => {
                    handleToggleDetails(false);
                  }}
                  label={"Enter Lumpsum"}
                  Icon={FaChevronUp}
                />
              </div>

              <div className=" flex flex-col gap-2 2xl:gap-3 w-full  px-2 lg:px-0 2xl:max-w-[80%] xl:max-w-[85%] lg:max-w-[83%] max-w-[78%]  mx-auto">
                <div className=" flex justify-between items-center">
                  <div className=" first-card-label tracking-[-0.32px]">
                    Salary
                  </div>
                  <div className="flex items-center gap-2 2xl:gap-3">
                    <span className="text-grey-3 lg:text-grey-2 currencyfinder-1">
                      <CurrencyFinder />
                    </span>
                    <div className="number-input-div">
                      <NumberInput
                        type="number"
                        error={error.salary}
                        className="number-input-height"
                        name="salary"
                        onChange={UpdateInput}
                        value={
                          allmodels?.salary ? allmodels?.salary.toString() : ""
                        }
                      />
                      {error.salary && (
                        <div className="please-feild-text">
                          * Please fill in this field
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" flex justify-between items-center">
                  <div className=" first-card-label tracking-[-0.32px]">
                    Freelance/ <br className="block lg:inline-block" />
                    Business
                  </div>
                  <div className="flex items-center gap-2 2xl:gap-3">
                    <span className="text-grey-3 lg:text-grey-2 currencyfinder-1">
                      <CurrencyFinder />
                    </span>

                    <div className="number-input-div">
                      <NumberInput
                        type="number"
                        error={error.freelance}
                        className="number-input-height"
                        name="freelance"
                        onChange={UpdateInput}
                        value={
                          allmodels?.freelance
                            ? allmodels?.freelance.toString()
                            : ""
                        }
                      />
                      {error.freelance && (
                        <div className="please-feild-text">
                          * Please fill in this field
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" flex justify-between items-center">
                  <div className=" first-card-label tracking-[-0.32px]">
                    Rents
                  </div>
                  <div className="flex items-center gap-2 2xl:gap-3">
                    <span className="text-grey-3 lg:text-grey-2 currencyfinder-1">
                      <CurrencyFinder />
                    </span>
                    <div className="number-input-div">
                      <NumberInput
                        type="number"
                        error={error.rents}
                        className="number-input-height"
                        name="rents"
                        onChange={UpdateInput}
                        value={
                          allmodels?.rents ? allmodels?.rents?.toString() : ""
                        }
                      />
                      {error.rents && (
                        <div className="please-feild-text">
                          * Please fill in this field
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" flex justify-between items-center border-t border-slate-600 pt-3">
                  <p className="text-blue-grey lg:text-grey-4 text-base lg:text-sm 2xl:text-lg tracking-[-0.32px] leading-5 lg:uppercase font-semibold ">
                    Total
                  </p>

                  <div className="flex items-center gap-2 2xl:gap-3">
                    <span className="text-blue-grey lg:text-grey-4 currencyfinder-1">
                      <CurrencyFinder />
                    </span>
                    <div className=" max-sm:pl-4 p-0 lg:py-1  text-blue-grey  font-medium lg:font-semibold  display-total-amount-div ">
                      <p className="">
                        <DisplayTotalAmount />
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" flex justify-between items-baseline mt-3 lg:mt-0">
                  <div className="">
                    <div className=" first-card-label tracking-[-0.32px]">
                      Grows Yearly by
                    </div>
                    <p className="block lg:hidden text-[#8792A6] lg:text-accent-bright-green text-opacity-60 text-[11px] font-medium leading-[13px] italic mt-1  ">
                      Doubles the value in{" "}
                      {(72 / +allmodels?.average_growth_rate).toFixed(1)} years
                    </p>
                  </div>

                  <div className="flex items-center gap-2 2xl:gap-3">
                    <p className="text-grey-3 lg:text-grey-2 currencyfinder-1 lg:pb-3 font-normal font-Montserrat">
                      %
                    </p>
                    <div className=" 2xl:min-w-[11rem] xl:min-w-[9rem] lg:min-w-[8rem] max-w-[3.5rem]">
                      <NumberInput
                        type="number"
                        className="py-2 px-2 lg:px-6 text-center lg:text-start 2xl:h-[40] lg:h-[30px] h-[43px]"
                        name="average_growth_rate"
                        onChange={UpdateInput}
                        value={
                          allmodels?.average_growth_rate
                            ? allmodels?.average_growth_rate?.toString()
                            : ""
                        }
                      />
                      <p className="hidden lg:block text-accent-bright-green text-opacity-60 text-[11px] lg:text-[9px] 2xl:text-[11px] font-medium leading-[13px] italic mt-2 lg:mt-1 2xl:mt-2 pl-1">
                        Doubles the value in{" "}
                        {(72 / +allmodels?.average_growth_rate).toFixed(1)}{" "}
                        years
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-fit mx-auto max-sm:min-w-[68vw] flex items-center justify-between gap-2  lg:hidden mt-10 md:mt-12 mb-4">
                <Card_OR className=" " />
                <Gray_btn
                  className="w-fit mx-auto min-w-[68vw] lg:hidden hidden"
                  // onCgit lick={() =>{handleToggleDetails(false)}}
                  label={"Enter Lumpsum"}
                  Icon={FaChevronUp}
                />
                <Gray_btn
                  className="w-fit mx-auto max-sm:min-w-[68vw] min-w-[16.5rem] md:flex"
                  onClick={() => {
                    handleToggleDetails(false);
                  }}
                  label={"Enter Lumpsum"}
                  Icon={FaChevronRight}
                />
              </div>
              {/* <div className=" lg:hidden flex  items-center justify-between gap-2 w-full max-w-[78%] mx-auto mb-4">
                <Card_OR className=' ' />
                <Gray_btn className=' flex-1'
                  onClick={() => { changeDetails(true); setallincomeAmt(0) }}
                  label={'Enter Details'}
                  Icon={FaChevronDown}
                />
              </div> */}
            </div>
          ) : null}

          <Card_footer
            className="card-footer-w lg:mt-2 2xl:mt-5"
            title="Next"
            BackonClick={() => {
              onHanleRestErrorState();

              navigate("/level-1");
              setError({
                ...error,
                enterAnnualIncome: false,
                growsYearlyBy: false,
                salary: false,
                freelance: false,
                rents: false,
              });
            }}
            NextonClick={() => {
              onHanleRestErrorState();
              saveFirstCard();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(First_card);
