import React, { useEffect, useState } from "react";
import QuestionCard from "../../QuestionCard";
import Card_input from "../Card_input";
import Card_OR from "../Card_OR";
import Gray_btn from "../Gray_btn";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";
import Card_footer from "../Card_footer";
import { updateCradInputs } from "../../../redux/slices/Card_Inputs";
import { useDispatch, useSelector } from "react-redux";
import { saveDetails } from "../../../pages/destop_L1/server";
import I_btn from "../I_btn";
import NumberInput from "../NumberInput";
import { CurrencyData } from "../../../constants";
import { diamond } from "../../../assets/Icons";

let Row_input = ({
  onChange,
  title,
  error,
  amtName,
  rorName,
  input_label,
  percentValue,
  name,
  value,
  className,
  CurrencyFinder,
  maxWidth,
}) => {
  return (
    <div className="w-full justify-between items-center flex gap-2 md:gap-4">
      <div className="flex gap-2 items-center">
        <p className="text-sm  card-label  2xl:min-w-[180px] xl:min-w-[165px] lg:min-w-[57px] max-w-[162px]">
          {input_label}
        </p>
      </div>
      <div className=" flex gap-2 items-baseline">
        <p className=" text-grey-4 md:text-grey-2 currencyfinder-1 pr-1">
          {CurrencyFinder}
        </p>
        <div>
          <div className="w-full  2xl:min-w-[190px] xl:min-w-[170px] md:min-w-[165px] md:max-w-[165px] max-w-[174px] ">
            <NumberInput
              error={error}
              type="number"
              className={`py-[10px] px-4 md:px-6 ${className}`}
              name={name}
              onChange={onChange}
              value={value ? value.toString() : ""}
            />
          </div>
          {error && (
            <div className="please-feild-text">* Please fill in this field</div>
          )}
        </div>
      </div>
    </div>
  );
};

const Fourth_card = ({ handleNextClick, handleAlertClick }) => {
  // const [details, changeDetails] = useState(!useSelector(state => state?.Card_inputs?.expenses_table_is_lumsum))

  const [onLoad, setOnLoad] = useState(false);
  const [error, setError] = useState({
    yearly_expenses: false,
    fixed_expenses_per_year: false,
    variable_expenses_per_year: false,
  });
  const dispatch = useDispatch();
  let totalAmt = 0;
  const allmodels = useSelector((state) => state.Card_inputs);

  const UpdateInput = (e) => {
    if (
      e.target.name == "fixed_expenses_per_year" ||
      e.target.name == "variable_expenses_per_year"
    ) {
      setError({
        ...error,
        fixed_expenses_per_year: false,
        variable_expenses_per_year: false,
        yearly_expenses: false,
      });
    } else {
      setError({
        ...error,
        [e.target.name]: false,
      });
    }
    dispatch(
      updateCradInputs({ [e.target.name]: +e.target.value.replace(/,/g, "") })
    );
    totalAmt = allmodels?.fixed_expenses_per_year
      ? allmodels?.fixed_expenses_per_year
      : 0 + allmodels?.variable_expenses_per_year
        ? allmodels?.variable_expenses_per_year
        : 0;
  };

  const details = onLoad
    ? !!useSelector((state) => state?.Card_inputs?.expenses_table_is_lumsum)
    : !useSelector((state) => state?.Card_inputs?.expenses_table_is_lumsum);
  // console.log(details,"details");
  useEffect(() => {
    setOnLoad(true);
  }, []);

  // const clearDetails = () => {
  //     let alldata = { ...allmodels }
  //     alldata.average_inflation = null;
  //     alldata.yearly_expenses = null;
  //     dispatch(updateCradInputs(alldata))
  // }
  const clearLumpsum = () => {
    // let alldata = { ...allmodels }
    // alldata["fixed_expenses"] = null;
    // alldata["variable_expenses"] = null;
    // dispatch(updateCradInputs(alldata))
  };

  const changeDetails = (type) => {
    if (type !== false) {
      setError({
        ...error,
        fixed_expenses_per_year: false,
        variable_expenses_per_year: false,
      });
    } else {
      setError({
        ...error,
        yearly_expenses: false,
      });
    }
    setOnLoad(false);
    const yearlyTotalExpenses =
      (allmodels["fixed_expenses_per_year"] > 0
        ? allmodels["fixed_expenses_per_year"]
        : 0) +
      (allmodels["variable_expenses_per_year"] > 0
        ? allmodels["variable_expenses_per_year"]
        : 0);
    dispatch(
      updateCradInputs({
        expenses_table_is_lumsum: details,
        yearly_expenses: yearlyTotalExpenses,
      })
    );
  };

  //------------------------------Loan Toast for Congratulations------------------------------//
  const ToastCongratulate = () => {
    const userdetails = JSON.parse(localStorage.getItem("userdetails"));
    const expenseActivity = userdetails?.coinmaster?.filter(
      (list) => list.activity == 5
    );
    return (
      <div>
        <div className="h-11 p-2 bg-slate-300 rounded-[26px] shadow justify-start items-start gap-2 flex w-max mx-auto mt-[19px]">
          <img src={diamond} alt="" className=" max-w-[30px] lg:max-w-[38px]" />
          <p className="text-cyan-950 text-xl lg:text-2xl font-extrabold font-['Work Sans'] shadow">{`+${expenseActivity[0]?.coins}`}</p>
        </div>
        <div className="bg-blue-100 rounded-xl mt-2 p-2 w-fit mx-auto">
          <h3 className="font-bold text-sm lg:text-lg text-slate-700 text-center">
            Congratulations!
          </h3>
          <div className="text-slate-700 text-center text-xs lg:text-base">
            You have earned {`+${expenseActivity[0]?.coins}`} coins.
            <br /> More power to you. Keep Going!{" "}
          </div>
        </div>
      </div>
    );
  };

  const saveFourthCard = () => {
    if (details == true) {
      if (
        (allmodels?.fixed_expenses_per_year > 0 ||
          allmodels?.variable_expenses_per_year > 0) &&
        allmodels?.average_inflation > 0
      ) {
        let obj = {};
        (obj.yearly_expenses = null),
          (obj.average_inflation = allmodels?.average_inflation),
          (obj.fixed_expenses_per_year = allmodels?.fixed_expenses_per_year),
          (obj.variable_expenses_per_year =
            allmodels?.variable_expenses_per_year);
        obj.login_form_number = 4;
        saveDetails(
          "expenses",
          obj,
          (success) => {
            if (success.data.code == 200) {
              dispatch(updateCradInputs({ expenses_table_is_lumsum: false }));
              // handleAlertClick(success.data.status_message,'success')
              handleNextClick(4);
              if (success.data.message?.coins_added?.is_coin_added) {
                handleAlertClick(<ToastCongratulate />, "message");
              }
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        // alert("please fill all the fields")

        let fixed_expenses_per_year = false;
        let variable_expenses_per_year = false;

        if (
          allmodels["fixed_expenses_per_year"] <= 0 ||
          isNaN(allmodels["fixed_expenses_per_year"])
        ) {
          fixed_expenses_per_year = true;
        }
        if (
          allmodels["variable_expenses_per_year"] <= 0 ||
          isNaN(allmodels["variable_expenses_per_year"])
        ) {
          variable_expenses_per_year = true;
        }
        setError({
          ...error,
          fixed_expenses_per_year: fixed_expenses_per_year,
          variable_expenses_per_year: variable_expenses_per_year,
        });
        // handleAlertClick('please fill all the fields')
      }
    } else {
      if (
        allmodels?.yearly_expenses > 0 &&
        allmodels?.average_inflation != null &&
        allmodels?.yearly_expenses != null
      ) {
        let obj = {};
        (obj.yearly_expenses = allmodels?.yearly_expenses),
          (obj.average_inflation = allmodels?.average_inflation),
          (obj.fixed_expenses_per_year = null),
          (obj.variable_expenses_per_year = null);
        obj.login_form_number = 4;
        saveDetails(
          "expenses",
          obj,
          (success) => {
            if (success.data.code == 200) {
              // handleAlertClick(success.data.status_message,'success')
              dispatch(updateCradInputs({ expenses_table_is_lumsum: true }));
              handleNextClick(4);
              if (success.data.message?.coins_added?.is_coin_added) {
                handleAlertClick(<ToastCongratulate />, "message");
              }
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        setError({
          ...error,
          yearly_expenses: true,
        });
        // alert("please fill all the fields")
        // handleAlertClick('please fill all the fields')
      }
    }
  };

  const onHanleRestErrorState = () => {
    setError({
      ...error,
      yearly_expenses: false,
      fixed_expenses_per_year: false,
      variable_expenses_per_year: false,
    });
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
  return (
    <div className="card card-4">
      <QuestionCard
        number="4"
        label="Your family’s Annual Expenses"
        subtitle="Don’t include EMIs"
      />
      <div
        className={`card-body  flex flex-col justify-normal overflow-y-scroll hide-scrollbar gap-0 md:gap-2 lg:gap-5 lg:justify-between lg:pt-[30px] lg:pb-[40px] xl:pt-[40px] xl:pb-[45px] 2xl:pt-[45px] 2xl:pb-[65px] ${Object.values(error).every((value) => !value) ? "md:pt-6 md:pb-[20%] pt-8 pb-[26%] " : "pt-4 pb-[18%] "}`}
      >
        {/* over all input show if Lumpsum Amount not selected  */}
        {details == false ? (
          <div className="max-w-[353px] mx-auto  ">
            <div className="max-w-[280px] mx-auto  ">
              <>
                <div className=" flex flex-col gap-10 max-md:mb-10 mb-0">
                  <div className=" ">
                    <div className="flex gap-2 ">
                      <p className="card-label invisible">
                        <CurrencyFinder />
                      </p>
                      <p className="card-label">
                        Yearly Expenses <br />
                        (non-EMI)
                      </p>
                    </div>
                    <div
                      className={`flex gap-2 ${error.yearly_expenses ? "items-start" : "items-center"}`}
                    >
                      <p className="text-grey-4 md:text-grey-2 currencyfinder-1">
                        <CurrencyFinder />
                      </p>
                      <div className="md:w-full">
                        <NumberInput
                          type="number"
                          error={error.yearly_expenses}
                          className="py-3 lg:py-[9px] lg:w-[90%] 2xl:py-2 px-4 mt-[2px]"
                          placeholder=""
                          name="yearly_expenses"
                          onChange={UpdateInput}
                          value={
                            allmodels?.yearly_expenses
                              ? allmodels?.yearly_expenses.toString()
                              : ""
                          }
                        />
                        {error.yearly_expenses && (
                          <div className="please-feild-text">
                            * Please fill in this field
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" ">
                    <div className="flex gap-2">
                      <p className="card-label invisible ">
                        <CurrencyFinder />
                      </p>
                      <p className="card-label 2xl:ml-1 ml-2">Inflation</p>
                    </div>
                    <div className=" flex gap-2 items-center">
                      <p className="fourth-card-label pb-3 w-4 ">%</p>
                      <div className="md:w-full">
                        <Card_input
                          type="number"
                          className="py-3 lg:py-[9.5px] lg:w-[90%] 2xl:py-[11px] px-4 mt-[2px] "
                          placeholder="5"
                          name="average_inflation"
                          onChange={UpdateInput}
                          value={
                            allmodels?.average_inflation
                              ? allmodels?.average_inflation.toString()
                              : ""
                          }
                          // value={allmodels?.average_growth_rate}
                        />
                        <p className="text-[#8792A6] lg:text-accent-bright-green text-opacity-60 text-[11px] font-medium leading-[13px] italic mt-1">
                          Doubles the value in{" "}
                          {(72 / allmodels?.average_inflation).toFixed(1)} years
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-2 lg:block max-md:mt-16 max-md:mb-4 items-center">
                  <Card_OR className="mb-5 md:mb-0 md:pt-2 lg:pt-0 lg:mt-5 " />
                  <div>
                    <Gray_btn
                      className=" mx-auto min-w-[235px] md:min-w-[16.5rem] lg:min-w-fit md:mt-[37px] hidden md:flex"
                      PreIcon={!details && diamond}
                      onClick={() => {
                        changeDetails(true);

                        // clearDetails()
                      }}
                      label={"Enter Details"}
                      Icon={FaChevronDown}
                    />
                    <Gray_btn
                      className="w-fit mx-auto min-w-[68vw] md:min-w-[200px]   md:mt-[37px] flex md:hidden"
                      PreIcon={!details && diamond}
                      onClick={() => {
                        changeDetails(true);

                        // clearDetails()
                      }}
                      label={"Enter Details"}
                      Icon={FaChevronRight}
                    />
                    <p className=" ms-0 lg:ms-8 enter-details-p mt-1 md:mt-3 lg:mt-2 pl-0 lg:pl-1">
                      Enter details to earn coins
                    </p>
                  </div>
                </div>
              </>
            </div>
          </div>
        ) : null}

        {/* Lumpsum input show if Lumpsum Amount is selected  */}
        {details ? (
          <div className="flex flex-col 2xl:gap-12 xl:gap-10 lg:gap-8 md:gap-2 gap-6 ">
            <div className="flex mx-auto items-center">
              <Gray_btn
                className="w-fit mx-auto min-w-[248px] hidden"
                // onClick={() => {
                //     changeDetails(false)
                //     clearLumpsum();
                // }}
                label={"Enter Lumpsum"}
                Icon={FaChevronUp}
              />
              <Gray_btn
                className="w-fit mx-auto min-w-[248px] hidden lg:flex "
                onClick={() => {
                  changeDetails(false);
                  clearLumpsum();
                }}
                label={"Enter Lumpsum"}
                Icon={FaChevronUp}
              />
            </div>

            <div className=" 2xl:w-[85%] xl:w-[86%] lg:w-[88%] w-[81%] mx-auto">
              <div className="flex gap-4 md:gap-3 lg:gap-4 flex-col">
                <Row_input
                  title="Fixed Expenses per year"
                  input_label="Fixed Expenses per year"
                  name={"fixed_expenses_per_year"}
                  onChange={UpdateInput}
                  error={error.fixed_expenses_per_year}
                  value={
                    allmodels?.fixed_expenses_per_year
                      ? allmodels?.fixed_expenses_per_year.toString()
                      : ""
                  }
                  className="leading-6 "
                  CurrencyFinder={<CurrencyFinder />}
                />
                <Row_input
                  title="Fixed Expenses per year"
                  input_label="Variable Expenses per year"
                  name={"variable_expenses_per_year"}
                  onChange={UpdateInput}
                  error={error.variable_expenses_per_year}
                  value={
                    allmodels?.variable_expenses_per_year
                      ? allmodels?.variable_expenses_per_year.toString()
                      : ""
                  }
                  className="leading-6"
                  maxWidth="max-w-[174px]"
                  CurrencyFinder={<CurrencyFinder />}
                />
                <div className="bg-zinc-400 h-[1px]" />
                <div className=" flex justify-between items-center">
                  {/* <p className="text-grey-2 text-lg tracking-[-0.32px] leading-5 uppercase font-semibold ">Total Annual <br /> Income</p> */}
                  <p className="text-grey-4 text-sm md:text-base tracking-[-0.32px] leading-5 uppercase font-semibold ">
                    Total
                  </p>
                  <div className="flex items-center gap-3 ">
                    <span className="text-grey-4 currencyfinder-1">
                      <CurrencyFinder />
                    </span>
                    <div className="small-w-4 max-sm:w-[155px] max-sm:overflow-x-hidden 2xl:min-w-[190px] xl:min-w-[168px] lg:min-w-[165px] md:min-w-[166px] py-4 px-3 md:px-5 lg:px-6 lg:py-2 lg:border lg:border-grey-4 lg:rounded-2xl text-grey-4 md:text-grey-3 text-lg lg:text-base leading-3">
                      <p className="">
                        {(allmodels?.fixed_expenses_per_year
                          ? allmodels?.fixed_expenses_per_year
                          : 0) +
                          (allmodels?.variable_expenses_per_year > 0
                            ? allmodels?.variable_expenses_per_year
                            : 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block">
                  <Row_input
                    title="Fixed Expenses per year"
                    input_label="Inflation"
                    name={"average_inflation"}
                    value={
                      allmodels?.average_inflation
                        ? allmodels?.average_inflation.toString()
                        : ""
                    }
                    onChange={UpdateInput}
                    className="leading-6"
                    CurrencyFinder={"%"}
                  />
                </div>
              </div>
              <span className="md:flex justify-end 2xl:mr-8 xl:mr-3 lg:mr-2 md:mr-4 mr-9 mt-1 text-[#8792A6] lg:text-accent-bright-green text-opacity-60 text-[10px] font-medium italic hidden ">
                Doubles the value in{" "}
                {(72 / allmodels?.average_inflation).toFixed(1)} years
              </span>

              {/* ----- visible in mobile  ----- */}
              <div className="flex items-baseline justify-between md:hidden">
                <div className="flex flex-col min-w-[210px] small-min-w-4 ">
                  <p className="text-sm md:text-base card-label ">Inflation</p>
                  <p className="flex justify-start mt-0  md:mt-1 text-[#8792A6] lg:text-accent-bright-green text-opacity-60 text-[11px] font-medium italic">
                    Doubles the value in{" "}
                    {(72 / allmodels?.average_inflation).toFixed(1)} years
                  </p>
                </div>
                <Row_input
                  title="Fixed Expenses per year"
                  name={"average_inflation"}
                  value={
                    allmodels?.average_inflation
                      ? allmodels?.average_inflation.toString()
                      : ""
                  }
                  onChange={UpdateInput}
                  className="leading-6"
                  CurrencyFinder={"%"}
                />
              </div>
              {/* <p className="flex justify-start  mt-1 text-[#8792A6] md:text-accent-bright-green text-opacity-60 text-[11px] font-medium italic">Doubles the value in {(72 / allmodels?.average_inflation).toFixed(1)} years</p> */}
            </div>

            {/* <div className=" flex max-w-[480px] justify-between mx-auto gap-6">
                            <div className="flex flex-col gap-8 flex-1">
                                <div className="">
                                    <div className=" flex gap-2 items-end">
                                        <p className="card-label pb-2 ">₹</p>
                                        <div className=" flex-1">
                                            <p className="card-label">Fixed Expenses / year</p>
                                            <Card_input value={allmodels?.fixed_expenses} type='number' className='py-3 px-4' placeholder='12345678' name={"fixed_expenses"} onChange={UpdateInput} />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-accent-bright-green text-opacity-60 text-center font-semibold text-lg leading-[22px]">
                                    Rent <br /> Phone <br /> Other bills <br /> Electricity <br /> School fee <br /> Transportation <br /> Insurance
                                </p>
                            </div>
 
                            <div className=" w-[0.5px] rounded-sm bg-slate-400" />
 
                            <div className="flex flex-col gap-8 flex-1">
                                <div className="">
                                    <div className=" flex gap-2 items-end">
                                        <p className="card-label pb-2 ">₹</p>
                                        <div className=" flex-1">
                                            <p className="card-label">Variable Expenses / year</p>
                                            <Card_input type='number' className='py-3 px-4' value={allmodels?.variable_expenses} placeholder='12345678' name={"variable_expenses"} onChange={UpdateInput} />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-accent-bright-green text-opacity-60 text-center font-semibold text-lg leading-[22px]">
                                    Travel <br />
                                    Lifestyle <br />
                                    Shopping <br />
                                    Entertainment <br />
                                    Medical <br />
                                    Entertainment <br />
                                </p>
                            </div>
                        </div> */}
            <div className="flex gap-2 mx-auto items-center mt-16 mb-4 md:mt-2 lg:hidden">
              <Card_OR className="" />
              <Gray_btn
                className="w-fit mx-auto min-w-[68vw] md:min-w-[16.5rem] "
                onClick={() => {
                  changeDetails(false);
                  clearLumpsum();
                }}
                label={"Enter Lumpsum"}
                Icon={FaChevronRight}
              />
            </div>
          </div>
        ) : null}

        <Card_footer
          className="card-footer-w"
          title="Next"
          BackonClick={() => {
            onHanleRestErrorState();
            handleNextClick(2);
          }}
          NextonClick={() => {
            onHanleRestErrorState();
            // handleNextClick(4)
            saveFourthCard();
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(Fourth_card);
